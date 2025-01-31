"use client";
import RegisterForm from "@/app/components/Auth/RegisterFormStore";

import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<h1>Loading UI...</h1>}>
      <RegisterForm />
    </Suspense>
  );
}
