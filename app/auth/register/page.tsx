"use client";
import RegisterForm from "@/app/components/Auth/RegisterForm";

import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<h1>Loading UI...</h1>}>
      <RegisterForm />
    </Suspense>
  );
}
