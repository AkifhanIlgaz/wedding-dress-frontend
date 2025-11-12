import Design from "@/components/design";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import Steps from "@/components/steps";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <section>
      <Hero />
      <Steps />
      <Design />
      <Gallery />
      <Testimonials />
    </section>
  );
}
