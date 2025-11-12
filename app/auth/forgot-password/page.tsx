"use client";

import { authText } from "@/src/auth/auth.text";
import { AuthHeader, ForgotPasswordForm } from "@/src/auth/components";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <ForgotPasswordForm />
    </div>
  );
}
