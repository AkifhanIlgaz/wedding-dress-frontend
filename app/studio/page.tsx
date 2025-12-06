"use client";

import { useState } from "react";

import { useStudio } from "@/src/context/studio-context";
import Design, {
  DesignerFormValues,
} from "@/src/features/landing/components/design";

export default function StudioPage() {
  const { addDress } = useStudio();
  const [message, setMessage] = useState<string | null>(null);

  const handleDesignComplete = (
    values: DesignerFormValues,
    meta: { presetTitle: string | null },
  ) => {
    const readableSilhouette = values.silhouette.replace(/-/g, " ");
    const readableStyle = values.style.replace(/-/g, " ");
    const name = meta.presetTitle ?? `${readableStyle} ${readableSilhouette}`;
    const description = `${values.fabric} ${readableSilhouette} with ${values.neckline} neckline and ${values.sleeve} sleeves.`;

    addDress({
      name,
      description,
      presetTitle: meta.presetTitle,
      selections: values,
    });
    setMessage(`Saved "${name}" into My Dresses and queued a render.`);
  };

  return (
    <div className="space-y-6">
      {message && (
        <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-success">
          {message}
        </p>
      )}
      <Design onAfterGenerate={handleDesignComplete} />
    </div>
  );
}
