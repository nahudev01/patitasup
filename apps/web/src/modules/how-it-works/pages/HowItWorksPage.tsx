import Hero from "@/shared/components/Hero";
import PawsSection from "@/shared/components/PawsSection";
import HowItWorksColumns from "../components/HowItWorksColumns";
import { howItWorksCards } from "../data/howItWorksData";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection className="h-[472px] rounded-b-[72px]">
          <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 text-center sm:px-6 lg:px-8">
            <Hero
              badgeText="Cómo funciona"
              variant="page"
              title="¿Cómo funciona PatitasUp?"
              subtitle="Nuestra misión es conectar gatos rescatados con familias responsables. El proceso es simple, transparente y seguro para todos."
            />
          </div>
        </PawsSection>

        <section className="relative z-20 -mt-[130px] pb-16">
          <HowItWorksColumns cards={howItWorksCards} />
        </section>
      </main>
    </div>
  );
};

export default HowItWorksPage;
