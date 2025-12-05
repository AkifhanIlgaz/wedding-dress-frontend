"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dresses = [
    {
      image: "/dress-princess.jpg",
      title: "Modern Minimalist",
      style: "modern",
    },
    {
      image: "/dress-princess.jpg",
      title: "Vintage Romance",
      style: "vintage",
    },
    {
      image: "/dress-princess.jpg",
      title: "Princess Ballgown",
      style: "princess",
    },
  ];
  return (
    <section id="gallery" className="mb-60  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Designs to Inspire You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore wedding dress designs across different styles and discover
            your own signature look.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dresses.map((dress, index) => (
            <div
              key={dress.style}
              className="relative group animate-scale-in overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500"
              style={{ animationDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-card">
                <img
                  src={dress.image}
                  alt={dress.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content overlay */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-end p-6 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-2xl font-serif font-semibold text-white mb-3">
                    {dress.title}
                  </h3>
                  <Button
                    size="sm"
                    className="bg-white/90 text-foreground dark:text-background hover:bg-white hover:scale-105"
                  >
                    Try This Style
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
