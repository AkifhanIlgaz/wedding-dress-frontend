import { Sparkles, Wand2, Camera, LucideIcon } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";

export default function Steps() {
  const steps = [
    {
      icon: Wand2,
      number: "01",
      title: "Özellikleri Seç",
      description:
        "Silüet, kumaş, yaka ve detayları birkaç tıklamayla seç. Tarzını sen belirle.",
    },
    {
      icon: Sparkles,
      number: "02",
      title: "AI Oluşturur",
      description:
        "Yapay zeka, senin için profesyonel detaylarla kişisel tasarımını oluşturur.",
    },
    {
      icon: Camera,
      number: "03",
      title: "Üzerinde Deneyin",
      description:
        "Fotoğrafınızı yükleyin veya mankenle görün. Hayaliniz gerçek oluyor.",
    },
  ];

  return (
    <section className="mb-60 " id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-foreground">
            Nasıl Çalışır?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hayalinizdeki gelinliğe üç basit adımda kavuşun
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
