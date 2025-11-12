"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@heroui/button";

import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";

import { authRoutes } from "../../auth.routes";
import { authText } from "../../auth.text";
import {
  LoginRequest,
  loginSchema,
  RegisterRequest,
  registerSchema,
} from "../../schemas";
import { Link } from "@heroui/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (req: RegisterRequest) => {
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder={authText.placeholders.firstName}
          labelPlacement="outside-top"
          label={authText.labels.firstName}
          errorMessage={form.formState.errors.firstName?.message}
          isInvalid={!!form.formState.errors.firstName}
          {...form.register("firstName")}
        />

        <Input
          type="text"
          placeholder={authText.placeholders.lastName}
          labelPlacement="outside-top"
          label={authText.labels.lastName}
          errorMessage={form.formState.errors.lastName?.message}
          isInvalid={!!form.formState.errors.lastName}
          {...form.register("lastName")}
        />
      </div>

      <Input
        type="email"
        placeholder={authText.placeholders.email}
        labelPlacement="outside-top"
        label={authText.labels.email}
        errorMessage={form.formState.errors.email?.message}
        isInvalid={!!form.formState.errors.email}
        {...form.register("email")}
      />

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

      <Button
        type="submit"
        className="w-full "
        disabled={isLoading}
        color="primary"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
            <span>{authText.creatingAccount}</span>
          </div>
        ) : (
          authText.buttons.register
        )}
      </Button>

      <p className="text-center text-sm text-default-500">
        {authText.alreadyHaveAccount}
        <Link
          href={authRoutes.login}
          className="ml-2 text-primary text-sm hover:text-primary/80 font-medium"
        >
          {authText.buttons.login}
        </Link>
      </p>
    </form>
  );
}
