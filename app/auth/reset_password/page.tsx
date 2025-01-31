"use client";

import ResetHandler from "@/app/components/Auth/ResetHandler";
import { ResetPaswordForm } from "@/app/components/Auth/ResetPasswordForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  return (
    <>
      {token && email ? (
        <ResetHandler email={email} token={token} />
      ) : (
        <ResetPaswordForm />
      )}
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
