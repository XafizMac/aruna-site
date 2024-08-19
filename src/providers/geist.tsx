"use client";

import React from "react";
import { GeistProvider } from "@geist-ui/core";

export default function CustomGeistProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeistProvider>{children}</GeistProvider>;
}
