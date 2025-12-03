import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate password strength
function isStrongPassword(password) {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Sanitize input to prevent XSS
function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .substring(0, 255)
    .replace(/[<>\"']/g, "")
    .replace(/javascript:/gi, "");
}

// Rate limiting map (simple in-memory, use Redis in production)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = 5; // 5 attempts
  const windowMs = 15 * 60 * 1000; // 15 minutes

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const attempts = rateLimitMap.get(ip).filter((time) => now - time < windowMs);

  if (attempts.length >= limit) {
    return false;
  }

  attempts.push(now);
  rateLimitMap.set(ip, attempts);
  return true;
}

export async function POST(req) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  try {
    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Too many signup attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, password } = await req.json();

    // Input validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters long" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const client = await pool.connect();

    try {
      // Check if email already exists
      const result = await client.query(
        "SELECT id FROM users WHERE LOWER(email) = $1",
        [sanitizedEmail]
      );

      if (result.rows.length > 0) {
        return NextResponse.json(
          { message: "Email already registered" },
          { status: 409 }
        );
      }

      // Insert new user
      await client.query(
        "INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())",
        [sanitizedName, sanitizedEmail, hashedPassword]
      );

      return NextResponse.json(
        { message: "Account created successfully. Please login." },
        { status: 201 }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Signup error:", error);

    // Don't expose internal errors to client
    return NextResponse.json(
      { message: "An error occurred during signup. Please try again." },
      { status: 500 }
    );
  }
}
