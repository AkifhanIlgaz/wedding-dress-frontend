import Design from "@/src/features/landing/components/design";
import Hero from "@/src/features/landing/components/hero";
import Steps from "@/src/features/landing/components/steps";
import Testimonials from "@/src/features/landing/components/testimonials";

export default function Home() {
  return (
    <section className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      <Hero />
      <Steps />
      <Design />
      <Testimonials />
    </section>
  );
}
