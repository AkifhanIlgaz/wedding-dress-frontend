import { Button } from "@heroui/button";
import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="mb-60 " id="hero">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-4 ">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
            Design Your Dream Dress <span className="text-primary">Now</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Craft an AI-powered design that fits your personal taste and preview
            it instantly on your photo. Create a unique gown for your
            unforgettable day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="shadow" color="primary" size="lg" className="">
              Start Designing Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>1000+ Happy Users</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Privacy Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative ">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant hover:shadow-xl transition-all duration-500">
            <img
              src={"/hero-dress.jpg"}
              alt="Elegant wedding dress design"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
