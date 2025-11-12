"use client";
import { authText } from "@/src/auth/auth.text";
import {
  AuthHeader,
  SignInWithGoogle,
  AuthDivider,
} from "@/src/auth/components";
import RegisterForm from "@/src/auth/components/forms/registerForm";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <AuthHeader
        title={authText.registerTitle}
        subtitle={authText.registerSubtitle}
      />
      <SignInWithGoogle />
      <AuthDivider />
      <RegisterForm />
    </div>
  );
}
