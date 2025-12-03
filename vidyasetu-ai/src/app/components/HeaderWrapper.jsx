"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import AuthenticatedHeader from "./AuthenticatedHeader";

const HeaderWrapper = () => {
  const { data: session, status } = useSession();

  // Show authenticated header if user is logged in
  if (status === "authenticated" && session) {
    return <AuthenticatedHeader />;
  }

  // Show regular header if user is not logged in or still loading
  return <Header />;
};

export default HeaderWrapper;
