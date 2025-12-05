import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ayşe Yılmaz",
      role: "Bride",
      content:
        "AI created exactly the gown I dreamed of. When I tried it on I felt incredibly special. I recommend it to everyone!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayseyilmaz",
    },
    {
      name: "Elif Demir",
      role: "Bride",
      content:
        "The design process was so easy and fun. I experimented with many styles and finally found exactly what I wanted. Amazing platform!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elifdemir",
    },
    {
      name: "Zeynep Kaya",
      role: "Bride",
      content:
        "Wedding dress shopping has never been this easy. I brought my dreams to life without leaving home. I'm over the moon!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynepkaya",
    },
  ];

  return (
    <section className="py-20 lg:py-28 " id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl  font-bold text-foreground">
            Real Bride Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the stories of thousands of happy brides.
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
