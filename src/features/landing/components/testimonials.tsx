import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ayşe Yılmaz",
      role: "Gelin",
      content:
        "AI tam olarak hayalimdeki gelinliği oluşturdu. Üzerimde denediğimde kendimi çok özel hissettim. Herkese tavsiye ederim!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayseyilmaz",
    },
    {
      name: "Elif Demir",
      role: "Gelin",
      content:
        "Tasarım süreci çok kolay ve eğlenceliydi. Birçok farklı stil denedim ve en sonunda tam istediğimi buldum. Harika bir platform!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elifdemir",
    },
    {
      name: "Zeynep Kaya",
      role: "Gelin",
      content:
        "Gelinlik alışverişi hiç bu kadar kolay olmamıştı. Evimden çıkmadan hayallerimi gerçeğe dönüştürdüm. Çok mutluyum!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynepkaya",
    },
  ];

  return (
    <section className="py-20 lg:py-28 " id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-foreground">
            Gerçek Kullanıcı Deneyimleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Binlerce mutlu gelinin hikayesine katılın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard testimonial={testimonial} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Testimonial = {
  name: string;
  content: string;
  image: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="relative p-6 h-full bg-card group animate-slide-up hover-lift">
      <CardHeader>
        <div className="flex gap-1 ">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
          ))}
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-muted-foreground leading-relaxed  italic">
          "{testimonial.content}"
        </p>
      </CardBody>
      <CardFooter>
        <div className="flex items-center gap-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full bg-secondary"
          />
          <p className="font-semibold text-foreground">{testimonial.name}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
