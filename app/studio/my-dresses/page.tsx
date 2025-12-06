"use client";

import Link from "next/link";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

import { useStudio } from "@/src/context/studio-context";

const statusCopy: Record<
  string,
  { label: string; color: "default" | "success" | "warning" }
> = {
  draft: { label: "Draft", color: "default" },
  rendering: { label: "Rendering", color: "warning" },
  ready: { label: "Ready", color: "success" },
};

export default function MyDressesPage() {
  const { dresses, clearDresses } = useStudio();

  if (dresses.length === 0) {
    return (
      <section className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-content3/60 bg-content1/60 p-10 text-center">
        <p className="text-xl font-semibold">
          You haven&apos;t saved a design yet
        </p>
        <p className="mt-2 max-w-lg text-foreground/70">
          Generate your first gown in the Studio to start comparing silhouettes,
          fabrics and embellishments. Every variation shows up here.
        </p>
        <Button as={Link} href="/studio" color="primary" className="mt-6">
          Design your first gown
        </Button>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-foreground/60">
            Archive
          </p>
          <h2 className="text-3xl font-semibold">My Dresses</h2>
          <p className="text-foreground/70">
            You&apos;re tracking {dresses.length} unique concepts.
          </p>
        </div>
        <Button
          variant="light"
          color="danger"
          onPress={clearDresses}
          className="text-danger"
        >
          Clear designs
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {dresses.map((dress) => (
          <Card
            key={dress.id}
            className="border border-content3/60 bg-content1/80 shadow-lg"
          >
            <CardHeader className="items-start gap-3">
              <div className="flex flex-col">
                <p className="text-sm text-foreground/60">
                  {new Date(dress.createdAt).toLocaleString("en-US", {
                    day: "2-digit",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <h3 className="text-xl font-semibold">{dress.name}</h3>
                <p className="text-sm text-foreground/70">
                  {dress.description}
                </p>
              </div>
              <Chip
                color={statusCopy[dress.status].color}
                variant="flat"
                className="ml-auto"
              >
                {statusCopy[dress.status].label}
              </Chip>
            </CardHeader>
            <CardBody className="space-y-3">
              <p className="text-sm text-foreground/70">
                {dress.presetTitle
                  ? `Preset: ${dress.presetTitle}`
                  : "Custom combination"}
              </p>
              <p className="text-sm italic text-foreground/60">
                {dress.selections.silhouette} • {dress.selections.fabric} •{" "}
                {dress.selections.neckline}
              </p>
            </CardBody>
            <CardFooter className="flex flex-wrap gap-2 border-t border-content3/40 pt-4">
              <Chip variant="flat">{dress.selections.embellishment}</Chip>
              <Chip variant="flat">{dress.selections.sleeve}</Chip>
              <Chip variant="flat">{dress.selections.skirtLength}</Chip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
