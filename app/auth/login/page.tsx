"use client";
import { authText } from "@/src/auth/auth.text";
import {
  AuthHeader,
  SignInWithGoogle,
  AuthDivider,
} from "@/src/auth/components";
import LoginForm from "@/src/auth/components/forms/loginForm";

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <AuthHeader
        title={authText.welcomeBack}
        subtitle={authText.signInSubtitle}
      />
      <SignInWithGoogle />
      <AuthDivider />
      <LoginForm />
    </div>
  );
}
