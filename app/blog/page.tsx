"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  XCircle,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@heroui/button";

import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { authText } from "@/src/auth/auth.text";
import { Link } from "@heroui/link";
import { authRoutes } from "@/src/auth/auth.routes";
import { AuthMessage } from "@/src/auth/components/shared/authMessage";

export default function BlogPage() {
  return (
    <AuthMessage
      variant="error"
      title="Bağlantı Geçersiz"
      message="Sıfırlama bağlantısı süresi dolmuş veya hatalı."
      backHref="/forgot-password"
      backText="Tekrar Dene"
    />
  );
}

interface SuccessMessageProps {
  title: string;
  message: string;
  email?: string;
  backHref: string;
  backText: string;
  extraNote?: string;
}

export function SuccessMessage({
  title,
  message,
  email,
  backHref,
  backText,
  extraNote,
}: SuccessMessageProps) {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-default-500">
            {message}
            {email && (
              <>
                {" "}
                <span className="font-medium text-foreground">{email}</span>.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {extraNote && (
          <div className="p-4 bg-default-50 border border-default-200 rounded-lg">
            <p className="text-sm text-default-600">{extraNote}</p>
          </div>
        )}

        <Button variant="ghost" color="primary" className="w-full">
          <Link href={backHref}>{backText}</Link>
        </Button>
      </div>
    </div>
  );
}

interface ErrorMessageProps {
  title: string;
  message: string;
  backHref: string;
  backText: string;
  extraNote?: string;
}

export function ErrorMessage({
  title,
  message,
  backHref,
  backText,
  extraNote,
}: ErrorMessageProps) {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {title}
          </h1>
          <p className="text-default-500">{message}</p>
        </div>
      </div>

      <div className="space-y-4">
        {extraNote && (
          <div className="p-4 bg-default-50 border border-default-200 rounded-lg">
            <p className="text-sm text-default-600">{extraNote}</p>
          </div>
        )}

        <Button variant="ghost" color="danger" className="w-full">
          <Link href={backHref}>{backText}</Link>
        </Button>
      </div>
    </div>
  );
}
