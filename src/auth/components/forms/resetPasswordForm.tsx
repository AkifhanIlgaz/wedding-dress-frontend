"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@heroui/button";

import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";

import { authRoutes } from "../../auth.routes";
import { authText } from "../../auth.text";
import {
  ForgotPasswordRequest,
  forgotPasswordSchema,
  LoginRequest,
  loginSchema,
  ResetPasswordRequest,
  resetPasswordSchema,
} from "../../schemas";
import { Link } from "@heroui/link";
import AuthHeader from "../shared/header";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (req: ResetPasswordRequest) => {
    setIsLoading(true);

    new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSubmitted(true);
    // try {
    //   setIsLoading(true);
    //   const { error } = await createClient().auth.signInWithPassword(req);
    //   if (error) {
    //     form.setError("email", {
    //       type: "manual",
    //       message: "Giriş başarısız: " + error.message,
    //     });
    //     return;
    //   }
    //   router.push(routes.dashboard.home);
    // } catch (err) {
    //   form.setError("email", {
    //     type: "manual",
    //     message: "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.",
    //   });
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (isSubmitted) return <Submitted />;

  return (
    <>
      <AuthHeader
        title={authText.createNewPassword}
        subtitle={authText.createNewPasswordSubtitle}
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={authText.placeholders.password}
          label={authText.labels.password}
          labelPlacement="outside-top"
          errorMessage={form.formState.errors.password?.message}
          isInvalid={!!form.formState.errors.password}
          endContent={
            <Button
              onPress={() => setShowPassword(!showPassword)}
              isIconOnly
              className="bg-transparent"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          }
          {...form.register("password")}
        />

        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder={authText.placeholders.confirmPassword}
          label={authText.labels.confirmPassword}
          labelPlacement="outside-top"
          errorMessage={form.formState.errors.confirmPassword?.message}
          isInvalid={!!form.formState.errors.confirmPassword}
          endContent={
            <Button
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              isIconOnly
              className="bg-transparent"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          }
          {...form.register("confirmPassword")}
        />

        <div className="space-y-4">
          <Button type="submit" className="w-full " color="primary">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {authText.updatingPassword}
              </>
            ) : (
              authText.buttons.updatePassword
            )}
          </Button>

          <Button
            as={Link}
            variant="ghost"
            startContent={<ArrowLeft className="w-4 h-4 mr-2" />}
            className="w-full"
            href={authRoutes.login}
          >
            {authText.buttons.returnLogin}
          </Button>
        </div>
      </form>
    </>
  );
}

function Submitted() {
  return (
    <>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {authText.passwordUpdated}
          </h1>
          <p className="text-default-500">{authText.passwordUpdatedSubtitle}</p>
        </div>
      </div>

      <Button
        as={Link}
        variant="ghost"
        startContent={<ArrowLeft className="w-4 h-4 mr-2" />}
        className="w-full"
        href={authRoutes.login}
      >
        {authText.buttons.returnLogin}
      </Button>
    </>
  );
}
