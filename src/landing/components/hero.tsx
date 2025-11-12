import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/src/shared/config/site";
import { title, subtitle } from "@/src/shared/components/primitives";
import { GithubIcon } from "@/src/shared/components/icons";
import { Button } from "@heroui/button";
import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="mb-60 " id="hero">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-4 ">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
            Hayalindeki Gelinliği <span className="text-primary">Tasarla</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Kişisel zevkine göre AI destekli tasarla ve fotoğrafında anında
            dene. Unutulmaz gününe özel, benzersiz gelinliğini şimdi oluştur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="shadow" color="primary" size="lg" className="">
              Hemen Tasarlamaya Başla
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>1000+ Mutlu Kullanıcı</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Güvenli Ödeme</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Gizlilik Garantili</span>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative ">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant hover:shadow-xl transition-all duration-500">
            <img
              src={"/hero-dress.jpg"}
              alt="Zarif gelinlik tasarımı"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
