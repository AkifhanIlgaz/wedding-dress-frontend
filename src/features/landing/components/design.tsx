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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
    image: "preset-2.png",
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

export default function Design() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
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

    console.log();
    // you can send the data to an AI prompt or backend
    //
    const res = await fetch(`http://localhost:8080/generate`, {
      method: "POST",
      body: JSON.stringify({
        prompt: generateCustomWeddingDressPrompt(data),
      }),
    });

    const result = await res.json();

    setImageUrl(result.output || null);
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

  const renderSelect = (name: keyof FormValues, info: SelectInfo) => (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
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
          isRequired
        >
          {(item) => (
            <SelectItem key={item.key} description={item.description}>
              {item.key}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );

  return (
    <section id="demo" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-foreground">
            Create Your Own Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose every detail and unleash your inner designer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
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
                className={`relative group overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 aspect-[3/4] cursor-pointer border ${
                  isActive
                    ? "border-primary shadow-elegant scale-[1.01]"
                    : "border-border/60 hover:-translate-y-1"
                }`}
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
                    <div>
                      <p className="text-xs">{preset.availability}</p>
                      <p className="text-xs text-white/80">{preset.footnote}</p>
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
        <div className=" rounded-3xl p-8 lg:p-12 border border-border/50 shadow-elegant">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col justify-center gap-4"
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
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
            <Button
              type="submit"
              variant="shadow"
              color="primary"
              className="w-1/2"
            >
              Design Your Dream Dress
            </Button>
          </form>
          <div className="flex-1 flex justify-center items-center bg-white border border-border/20 rounded-xl p-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated Wedding Dress"
                className="max-h-[600px] object-contain rounded-lg shadow-lg"
              />
            ) : (
              <p className="text-muted-foreground">
                The dress you design will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
