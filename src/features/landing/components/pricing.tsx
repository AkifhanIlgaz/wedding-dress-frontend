import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free Muse",
    price: "$0",
    cadence: "always",
    description: "Perfect for brides exploring AI-assisted gown inspiration.",
    cta: "Start for Free",
    highlighted: false,
    features: [
      "40 AI couture generations per month",
      "Access to curated silhouette presets",
      "Downloadable front-view dress mockups",
      "Email styling support within 48 hours",
    ],
  },
  {
    name: "Pro Atelier",
    price: "$79",
    cadence: "per month",
    description: "Full creative control, premium renders, and try-on credits.",
    cta: "Go Pro",
    highlighted: true,
    features: [
      "Unlimited AI dress generations",
      "20 virtual try-on credits per month",
      "Custom fabric + embellishment prompts",
      "Priority styling concierge",
      "Commercial usage rights",
    ],
  },
  {
    name: "Enterprise Couture",
    price: "Let’s talk",
    cadence: "custom plan",
    description: "For bridal houses and ateliers designing at scale.",
    cta: "Contact Sales",
    highlighted: false,
    features: [
      "Team workspaces & shared gown libraries",
      "API access for production pipelines",
      "Dedicated couture success manager",
      "Bespoke onboarding + model training",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Choose the atelier suite that fits your journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you&apos;re imagining a one-of-a-kind gown or outfitting an
            entire boutique, pick a plan that aligns with your couture
            ambitions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`h-full border ${
                plan.highlighted
                  ? "border-primary shadow-elegant bg-primary/5"
                  : "border-border/40 bg-card"
              }`}
            >
              <CardHeader className="flex flex-col items-start space-y-2">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>
              <CardBody>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 mt-1 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  variant={plan.highlighted ? "shadow" : "bordered"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
