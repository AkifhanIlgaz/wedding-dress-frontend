"use client";

import { Select, SelectItem } from "@heroui/select";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import {
  cuttingStyles,
  embellishments,
  fabrics,
  lowCuts,
  necklines,
  silhouettes,
  skirtLengths,
  sleeves,
  styles,
} from "@/types/silhouettes";
import { useEffect, useState } from "react";

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

export default function Design() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
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
    console.log("Seçilen gelinlik özellikleri:", data);

    console.log();
    // data'yi AI prompt'una veya backend'e gönderebilirsin
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

  const renderSelect = (name: keyof FormValues, info: SelectInfo) => (
    <Select
      label={info.label}
      placeholder={info.placeholder}
      variant="bordered"
      labelPlacement="outside"
      items={info.items}
      classNames={{
        label: "text-sm font-semibold text-foreground block",
      }}
      isRequired
      {...register(name, { required: true })}
    >
      {(item) => <SelectItem>{item.label}</SelectItem>}
    </Select>
  );

  return (
    <section id="demo" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-foreground">
            Kendi Tarzını Oluştur
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Özelliklerini seç ve içindeki tasarımcıyı açığa çıkar.
          </p>
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
              {renderSelect("lowCut", lowCuts)}
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
              Hayalindeki Gelinliği Tasarla
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
                Tasarladığınız gelinlik burada görünecek.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
