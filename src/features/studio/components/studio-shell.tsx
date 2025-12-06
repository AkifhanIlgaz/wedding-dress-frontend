"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";

import { useAuth } from "@/src/context/auth-context";

const studioNav = [
  { label: "Studio", href: "/studio" },
  { label: "My Dresses", href: "/studio/my-dresses" },
  { label: "Profile", href: "/studio/profile" },
];

export function StudioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const firstName = user?.user_metadata?.firstName as string | undefined;
  const lastName = user?.user_metadata?.lastName as string | undefined;
  const initials = `${firstName?.[0] ?? user?.email?.[0] ?? ""}${
    lastName?.[0] ?? ""
  }`;

  return (
    <div className="bg-content2/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 lg:px-0">
        <div className="flex flex-col gap-4 rounded-3xl border border-content3/30 bg-content1/80 p-6 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                name={initials}
                size="lg"
                className="bg-primary/20 text-primary-foreground"
              />
              <div>
                <p className="text-sm uppercase tracking-wide text-foreground/60">
                  Bridal AI Studio
                </p>
                <h1 className="text-2xl font-semibold text-foreground">
                  Welcome back {firstName ?? user?.email?.split("@")[0]}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip color="primary" variant="flat">
                Premium experience
              </Chip>
              <Chip variant="flat">Unlimited designs</Chip>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {studioNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/studio" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-content2 text-foreground/80 hover:bg-content3"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="pb-20">{children}</div>
      </div>
    </div>
  );
}
