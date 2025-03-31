"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign-up");
  }, []);

  return null;
}
