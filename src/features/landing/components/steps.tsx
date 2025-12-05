import { Card, CardHeader } from "@heroui/card";
import { Camera, LucideIcon, Sparkles, Wand2 } from "lucide-react";

export default function Steps() {
  const steps = [
    {
      icon: Wand2,
      number: "01",
      title: "Choose the Details",
      description:
        "Pick the silhouette, fabric, neckline, and accents in just a few clicks. You set the tone.",
    },
    {
      icon: Sparkles,
      number: "02",
      title: "AI Designs It",
      description:
        "Our AI crafts your personalized design with professional-level detail just for you.",
    },
    {
      icon: Camera,
      number: "03",
      title: "Try It On",
      description:
        "Upload your photo or view it on the mannequin and watch your vision come to life.",
    },
  ];

  return (
    <section className="mb-60 " id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to your dream wedding dress in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map(
            (step, index) => (
              <StepCard
                key={index}
                icon={step.icon}
                description={step.description}
                title={step.title}
              />
            ),
            // return (
            //   <div
            //     key={step.number}
            //     className="relative group animate-slide-up hover-lift"
            //     style={{ animationDelay: `${index * 0.1}s` }}
            //   >
            //     <div className="bg-card rounded-2xl p-8 h-full border border-border/50 shadow-soft">
            //       {/* Number indicator */}
            //       <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-cta rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-xl shadow-elegant">
            //         {step.number}
            //       </div>

            //       {/* Icon */}
            //       <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            //         <Icon className="w-8 h-8 text-primary" />
            //       </div>

            //       {/* Content */}
            //       <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
            //         {step.title}
            //       </h3>
            //       <p className="text-muted-foreground leading-relaxed">
            //         {step.description}
            //       </p>
            //     </div>
            //   </div>
            // );
          )}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative p-8 h-full bg-card group animate-slide-up hover-lift ">
      <CardHeader className="flex flex-col items-start ">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl  font-semibold text-foreground mb-4">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardHeader>
    </Card>
  );
}
