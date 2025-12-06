import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { StudioProvider } from "@/src/context/studio-context";
import { StudioShell } from "@/src/features/studio/components/studio-shell";
import { createClient } from "@/src/lib/supabase/server";

export default async function StudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <StudioProvider>
      <StudioShell>{children}</StudioShell>
    </StudioProvider>
  );
}
