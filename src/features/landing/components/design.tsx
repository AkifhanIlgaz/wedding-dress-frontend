"use client";

import {
  cuttingStyles,
  embellishments,
  fabrics,
  lowCut,
  necklines,
  silhouettes,
  skirtLengths,
  sleeves,
  styles,
} from "@/types/silhouettes";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = {
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

type SelectOption = {
  key: string;
  label: string;
  description?: string;
};

type SelectInfo = {
  label: string;
  placeholder: string;
  items: SelectOption[];
};

type PresetOption = {
  title: string;
  description: string;
  values: FormValues;
  image: string;
  availability: string;
  footnote: string;
};

const presetOptions: PresetOption[] = [
  {
    title: "Classic Elegance",
    description:
      "Satin A-line gown with a deep V-neck and lace bodice for graceful formality.",
    values: {
      silhouette: "A-Line",
      cuttingStyle: "Natural-Waist",
      style: "Classic",
      neckline: "Deep V-Neck",
      sleeve: "Long Sleeve",
      lowCut: "V-Back",
      skirtLength: "Floor-Length",
      fabric: "Satin",
      embellishment: "Lace",
    },
    image: "/preset-1.png",
    availability: "Polished satin & heirloom lace.",
    footnote: "Romantic, formal silhouettes.",
  },
  {
    title: "Romantic Sparkle",
    description:
      "Flowy chiffon dress with beaded embroidery and airy bishop sleeves.",
    values: {
      silhouette: "A-Line",
      cuttingStyle: "Empire-Waist",
      style: "Romantic",
      neckline: "V-Neck",
      sleeve: "Bishop Sleeve",
      lowCut: "Illusion Back",
      skirtLength: "Floor-Length",
      fabric: "Chiffon",
      embellishment: "Beading",
    },
    image: "/preset-2.png",
    availability: "Soft chiffon layers with sparkling beadwork.",
    footnote: "Effortless movement & shimmer.",
  },
  {
    title: "Royal Ball Gown",
    description:
      "Voluminous tulle skirt paired with a crystal-embellished corset bodice.",
    values: {
      silhouette: "Ball-Gown",
      cuttingStyle: "Princess-Cut",
      style: "Glamorous",
      neckline: "Off-Shoulder",
      sleeve: "Cap Sleeve",
      lowCut: "Corset Back",
      skirtLength: "Cathedral Train",
      fabric: "Tulle",
      embellishment: "Crystals",
    },
    image: "/hero-dress.jpg",
    availability: "Statement corset with crystal florals.",
    footnote: "Perfect for grand entrances.",
  },
];

const optionsMap: Record<keyof FormValues, SelectInfo> = {
  silhouette: silhouettes,
  cuttingStyle: cuttingStyles,
  style: styles,
  neckline: necklines,
  sleeve: sleeves,
  lowCut: lowCut,
  skirtLength: skirtLengths,
  fabric: fabrics,
  embellishment: embellishments,
};

const randomizeFields: (keyof FormValues)[] = [
  "silhouette",
  "cuttingStyle",
  "style",
  "neckline",
  "sleeve",
  "lowCut",
  "skirtLength",
  "fabric",
  "embellishment",
];

const designerSchema = z.object({
  silhouette: z.string().min(1, "Please select a silhouette."),
  cuttingStyle: z.string().min(1, "Please select a cutting style."),
  style: z.string().min(1, "Please select a style."),
  neckline: z.string().min(1, "Please select a neckline."),
  sleeve: z.string().min(1, "Please select a sleeve type."),
  lowCut: z.string().min(1, "Please select a cutout preference."),
  skirtLength: z.string().min(1, "Please select a skirt length."),
  fabric: z.string().min(1, "Please select a fabric."),
  embellishment: z.string().min(1, "Please select embellishments."),
});

export default function Design() {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(designerSchema),
    defaultValues: {
      silhouette: "",
      cuttingStyle: "",
      style: "",
      neckline: "",
      sleeve: "",
      lowCut: "",
      skirtLength: "",
      fabric: "",
      embellishment: "",
    },
  });

  function generateCustomWeddingDressPrompt(values: FormValues): string {
    return `
  A hyper-realistic, studio-quality full-body image of a wedding dress displayed on an elegant, headless mannequin, shown from the front.
  The dress has a ${values.silhouette} silhouette with a ${values.neckline} neckline and ${values.sleeve} sleeves, featuring a ${values.lowCut} low cut.
  Made of ${values.fabric} fabric, the skirt flows elegantly with ${values.skirtLength} length and subtle volume.
  The bodice features ${values.cuttingStyle} cut details and ${values.embellishment} embellishments.
  The dress style is ${values.style}. The dress color is Soft Ivory, with subtle variations in fabric folds, texture, lace patterns, or minor details to make each generated dress unique while keeping all user-selected features intact.
  The mannequin is slender, stylish, and designed to showcase wedding dresses elegantly.
  Focus entirely on the dress with intricate fabric textures, lace patterns, folds, and embellishments.
  No other objects or scenery, keeping the dress fully in focus.
  Pure studio lighting with soft shadows, photorealistic rendering.
  `.trim();
  }

  const onSubmit = async (data: FormValues) => {
    console.log("Selected wedding dress features:", data);

    const res = await fetch(`http://localhost:8080/generate`, {
      method: "POST",
      body: JSON.stringify({
        prompt: generateCustomWeddingDressPrompt(data),
      }),
    });

    await res.json();
  };

  const handlePresetSelect = (preset: PresetOption) => {
    Object.entries(preset.values).forEach(([field, value]) => {
      setValue(field as keyof FormValues, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
    setActivePreset(preset.title);
  };

  const handleRandomize = () => {
    randomizeFields.forEach((field) => {
      const fieldOptions = optionsMap[field].items;
      const randomOption =
        fieldOptions[Math.floor(Math.random() * fieldOptions.length)];
      setValue(field, randomOption.key, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
    setActivePreset(null);
  };

  const renderSelect = (name: keyof FormValues, info: SelectInfo) => {
    const errorMessage = errors[name]?.message as string | undefined;
    return (
      <div className="flex flex-col gap-1">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              label={info.label}
              placeholder={info.placeholder}
              variant="bordered"
              labelPlacement="outside"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0] as string;
                field.onChange(value);
                setActivePreset(null);
              }}
              items={info.items}
              classNames={{
                label: "text-sm font-semibold text-foreground block",
              }}
              isInvalid={!!errorMessage}
            >
              {(item) => (
                <SelectItem key={item.key} description={item.description}>
                  {item.key}
                </SelectItem>
              )}
            </Select>
          )}
        />
      </div>
    );
  };

  const missingFields = randomizeFields
    .filter((field) => errors[field])
    .map((field) => field.replace(/([A-Z])/g, " $1").toLowerCase());

  const shouldShowError = missingFields.length > 0;

  return (
    <section
      id="demo"
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Create Your Own Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose every detail, apply curated presets, and let AI bring your
            dream silhouette to life.
          </p>
        </div>

        <div className=" p-6 mb-12 shadow-soft space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {presetOptions.map((preset) => {
              const isActive = activePreset === preset.title;
              return (
                <div
                  key={preset.title}
                  role="button"
                  aria-pressed={isActive}
                  onClick={() => handlePresetSelect(preset)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handlePresetSelect(preset);
                    }
                  }}
                  tabIndex={0}
                  className={`relative group overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 aspect-[3/4] cursor-pointer border ${"border-border/60 hover:-translate-y-1"}`}
                >
                  <img
                    src={preset.image}
                    alt={`${preset.title} inspiration`}
                    className="z-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "group-hover:opacity-100 opacity-0"
                    }`}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{preset.title}</h3>
                      <p className="text-sm text-white/80 max-w-sm">
                        {preset.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1 text-xs text-white/80">
                        <p>{preset.availability}</p>
                        <p>{preset.footnote}</p>
                      </div>
                      <Button
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={isActive ? "shadow" : "bordered"}
                      >
                        {isActive ? "Preset Applied" : "Use This Style"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 bg-background/80 border border-border/40 rounded-2xl p-6 shadow-soft"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Custom Couture Builder
              </p>
              <p className="text-xs text-muted-foreground">
                Adjust every detail or let AI pick a fresh combination.
              </p>
            </div>
            <Button
              size="sm"
              color="primary"
              variant="ghost"
              onPress={handleRandomize}
            >
              Surprise Me
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderSelect("silhouette", silhouettes)}
            {renderSelect("cuttingStyle", cuttingStyles)}
            {renderSelect("style", styles)}
            {renderSelect("neckline", necklines)}
            {renderSelect("sleeve", sleeves)}
            {renderSelect("lowCut", lowCut)}
            {renderSelect("skirtLength", skirtLengths)}
            {renderSelect("fabric", fabrics)}
            {renderSelect("embellishment", embellishments)}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {shouldShowError ? (
              <p className="text-sm text-danger">
                Please choose{" "}
                {missingFields.map((field, index) => (
                  <span key={field} className="font-semibold">
                    {field}
                    {index < missingFields.length - 1 ? ", " : ""}
                  </span>
                ))}
                .
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Make sure you have selected all options.
              </p>
            )}
            <Button
              type="submit"
              variant="shadow"
              color="primary"
              className="sm:w-auto w-full"
            >
              Design Your Dream Dress
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
