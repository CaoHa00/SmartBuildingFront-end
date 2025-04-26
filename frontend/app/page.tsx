"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/block/a57883f5-ca73-4120-b915-e7d97bec470e');
  }, [router]);

  return null;
}
