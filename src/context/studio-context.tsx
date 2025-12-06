"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/src/context/auth-context";

export type DressSelections = {
  silhouette: string;
  cuttingStyle: string;
  style: string;
  neckline: string;
  sleeve: string;
  lowCut: string;
  skirtLength: string;
  fabric: string;
  embellishment: string;
};

export type DressDesign = {
  id: string;
  name: string;
  description: string;
  presetTitle?: string | null;
  selections: DressSelections;
  createdAt: string;
  status: "draft" | "rendering" | "ready";
  previewUrl: string;
};

type CreateDressPayload = Omit<
  DressDesign,
  "id" | "createdAt" | "status" | "previewUrl"
>;

type StudioContextValue = {
  dresses: DressDesign[];
  addDress: (payload: CreateDressPayload) => DressDesign;
  clearDresses: () => void;
};

const StudioContext = createContext<StudioContextValue | undefined>(undefined);

const DEFAULT_PREVIEW =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80";

const normalizeDressEntry = (entry: any): DressDesign => {
  if (entry && typeof entry === "object" && "selections" in entry) {
    return entry as DressDesign;
  }

  const selections: DressSelections = {
    silhouette: entry?.silhouette ?? "",
    cuttingStyle: entry?.cuttingStyle ?? "",
    style: entry?.style ?? "",
    neckline: entry?.neckline ?? "",
    sleeve: entry?.sleeve ?? "",
    lowCut: entry?.lowCut ?? "",
    skirtLength: entry?.skirtLength ?? "",
    fabric: entry?.fabric ?? "",
    embellishment: entry?.embellishment ?? "",
  };

  const generatedId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 9);

  return {
    id: entry?.id ?? generatedId,
    name: entry?.name ?? "Custom Couture",
    description:
      entry?.description ??
      entry?.inspiration ??
      "Tailored couture combination.",
    presetTitle: entry?.presetTitle ?? null,
    selections,
    createdAt: entry?.createdAt ?? new Date().toISOString(),
    status: entry?.status ?? "ready",
    previewUrl: entry?.previewUrl ?? DEFAULT_PREVIEW,
  };
};

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const storageKey = useMemo(
    () => `studio-dresses-${user?.id ?? "guest"}`,
    [user?.id],
  );
  const [dresses, setDresses] = useState<DressDesign[]>([]);
  const [hydratedKey, setHydratedKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(storageKey);
    const parsed = saved ? (JSON.parse(saved) as unknown[]) : [];
    const normalized = Array.isArray(parsed)
      ? parsed.map((entry) => normalizeDressEntry(entry))
      : [];
    setDresses(normalized);
    setHydratedKey(storageKey);
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hydratedKey !== storageKey) return;
    window.localStorage.setItem(storageKey, JSON.stringify(dresses));
  }, [dresses, storageKey, hydratedKey]);

  const addDress = (payload: CreateDressPayload) => {
    const createdAt = new Date().toISOString();
    const saturationSeed = Math.floor(Math.random() * 100);
    const newDress: DressDesign = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt,
      status: "rendering",
      previewUrl: `${DEFAULT_PREVIEW}&sat=${saturationSeed}`,
    };
    setDresses((prev) => [newDress, ...prev]);
    setTimeout(() => {
      setDresses((prev) =>
        prev.map((dress) =>
          dress.id === newDress.id ? { ...dress, status: "ready" } : dress,
        ),
      );
    }, 1500);
    return newDress;
  };

  const clearDresses = () => setDresses([]);

  return (
    <StudioContext.Provider value={{ dresses, addDress, clearDresses }}>
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return ctx;
}
