"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";

import { useAuth } from "@/src/context/auth-context";
import { createClient } from "@/src/lib/supabase/client";

const formatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

type ProfileFormState = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  weddingDate: string;
  preferredSilhouette: string;
  favoriteFabric: string;
  stylistNotes: string;
};

const defaultState: ProfileFormState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  weddingDate: "",
  preferredSilhouette: "",
  favoriteFabric: "",
  stylistNotes: "",
};

export default function StudioProfilePage() {
  const { user, loading } = useAuth();
  const [formState, setFormState] = useState<ProfileFormState>(defaultState);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    setFormState({
      firstName: (user.user_metadata?.firstName as string) ?? "",
      lastName: (user.user_metadata?.lastName as string) ?? "",
      phoneNumber: (user.user_metadata?.phoneNumber as string) ?? "",
      weddingDate: (user.user_metadata?.weddingDate as string) ?? "",
      preferredSilhouette:
        (user.user_metadata?.preferredSilhouette as string) ?? "",
      favoriteFabric: (user.user_metadata?.favoriteFabric as string) ?? "",
      stylistNotes: (user.user_metadata?.stylistNotes as string) ?? "",
    });
  }, [user]);

  const initials = useMemo(() => {
    const first =
      formState.firstName || user?.email?.split("@")[0] || "Bridal Lover";
    return `${first.split(" ")[0]?.[0] ?? ""}${formState.lastName?.[0] ?? ""}`;
  }, [formState.firstName, formState.lastName, user?.email]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <Spinner label="Loading profile information..." color="primary" />
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          phoneNumber: formState.phoneNumber,
          weddingDate: formState.weddingDate,
          preferredSilhouette: formState.preferredSilhouette,
          favoriteFabric: formState.favoriteFabric,
          stylistNotes: formState.stylistNotes,
        },
      });

      if (error) throw error;
      setFeedback({
        variant: "success",
        message: "Profile information updated successfully.",
      });
    } catch {
      setFeedback({
        variant: "error",
        message: "Something went wrong while saving your profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.7fr,1fr]">
      <Card className="border border-content3/60 bg-content1/80 shadow-lg">
        <CardBody className="space-y-4">
          <div className="flex flex-col items-start gap-4">
            <Avatar
              name={initials}
              size="lg"
              className="h-16 w-16 bg-primary/20 text-2xl text-primary"
            />
            <div>
              <p className="text-sm uppercase tracking-widest text-foreground/60">
                Account snapshot
              </p>
              <h2 className="text-2xl font-semibold">
                {formState.firstName || "Studio Member"} {formState.lastName}
              </h2>
              <p className="text-sm text-foreground/70">{user.email}</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-foreground/50">
                Last login
              </p>
              <p className="text-base font-medium">
                {user.last_sign_in_at
                  ? formatter.format(new Date(user.last_sign_in_at))
                  : "Unknown"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-foreground/50">
                Studio Plan
              </p>
              <Chip color="primary" variant="flat">
                Designer
              </Chip>
            </div>
          </div>
        </CardBody>
      </Card>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-content3/60 bg-content1/80 p-6 shadow-xl"
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-foreground/60">
            Profile
          </p>
          <h2 className="text-3xl font-semibold">
            Manage your personal details
          </h2>
          <p className="text-sm text-foreground/70">
            These fields are stored in Supabase user metadata and shared during
            stylist consultations on your behalf.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="First name"
            labelPlacement="outside-top"
            value={formState.firstName}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                firstName: event.target.value,
              }))
            }
          />
          <Input
            label="Last name"
            labelPlacement="outside-top"
            value={formState.lastName}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                lastName: event.target.value,
              }))
            }
          />
        </div>
        <Input
          type="tel"
          label="Phone number"
          labelPlacement="outside-top"
          placeholder="+90..."
          value={formState.phoneNumber}
          onChange={(event) =>
            setFormState((prev) => ({
              ...prev,
              phoneNumber: event.target.value,
            }))
          }
        />
        <Input
          type="date"
          label="Wedding date"
          labelPlacement="outside-top"
          value={formState.weddingDate}
          onChange={(event) =>
            setFormState((prev) => ({
              ...prev,
              weddingDate: event.target.value,
            }))
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Favorite silhouette"
            labelPlacement="outside-top"
            placeholder="A-line, Princess..."
            value={formState.preferredSilhouette}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                preferredSilhouette: event.target.value,
              }))
            }
          />
          <Input
            label="Favorite fabric"
            labelPlacement="outside-top"
            placeholder="French lace..."
            value={formState.favoriteFabric}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                favoriteFabric: event.target.value,
              }))
            }
          />
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
          Stylist notes
          <textarea
            className="rounded-2xl border border-content3/40 bg-transparent p-4 outline-none transition focus:border-primary"
            rows={4}
            value={formState.stylistNotes}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                stylistNotes: event.target.value,
              }))
            }
          />
        </label>

        {feedback && (
          <p
            className={`rounded-2xl px-4 py-3 text-sm ${
              feedback.variant === "success"
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}
          >
            {feedback.message}
          </p>
        )}

        <Button type="submit" color="primary" isLoading={isSaving}>
          Save changes
        </Button>
      </form>
    </div>
  );
}
