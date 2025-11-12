import Design from "@/src/landing/components/design";
import Gallery from "@/src/landing/components/gallery";
import Hero from "@/src/landing/components/hero";
import Steps from "@/src/landing/components/steps";
import Testimonials from "@/src/landing/components/testimonials";

export default function Home() {
  return (
    <section className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
      <Hero />
      <Steps />
      <Design />
      <Gallery />
      <Testimonials />
    </section>
  );
}
