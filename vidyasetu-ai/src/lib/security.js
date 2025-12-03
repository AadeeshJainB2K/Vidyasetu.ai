// Security utilities for the application

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>\"']/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate password strength
 * Requires: 8+ chars, uppercase, lowercase, number, special character
 */
export function isStrongPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Generate password strength feedback
 */
export function getPasswordStrengthFeedback(password) {
  const feedback = [];

  if (password.length < 8) {
    feedback.push("At least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("One uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    feedback.push("One lowercase letter");
  }
  if (!/\d/.test(password)) {
    feedback.push("One number");
  }
  if (!/[@$!%*?&]/.test(password)) {
    feedback.push("One special character (@$!%*?&)");
  }

  return feedback;
}

/**
 * Check if URL is safe for redirect
 */
export function isSafeRedirectUrl(url) {
  if (!url) return false;

  // Only allow relative URLs (starting with /)
  if (!url.startsWith("/")) return false;

  // Block dangerous paths
  const dangerousPaths = ["/api/", "/admin/", "/system/"];
  for (const path of dangerousPaths) {
    if (url.includes(path)) return false;
  }

  return true;
}

/**
 * Hash a string (for client-side usage, server should use bcrypt)
 */
export function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}
