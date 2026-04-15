import Hero from "@/components/Hero";
import PawsSection from "@/components/PawsSection";
import HowItWorksColumns from "@/features/how-it-works/components/HowItWorksColumns";
import { howItWorksCards } from "@/features/how-it-works/data/howItWorksData";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col">
      <main className="flex-1 flex flex-col">
        <PawsSection className="py-12 md:py-20 lg:py-28">
          <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-center px-4 lg:px-8">
            <Hero
              badgeText="Cómo funciona"
              variant="page"
              title="¿Cómo funciona PatitasUp?"
              subtitle="Nuestra misión es conectar gatos rescatados con familias responsables. El proceso es simple, transparente y seguro para todos."
            />
          </div>
        </PawsSection>

        <section className="relative z-10 mx-auto w-full max-w-6xl -mt-10 md:-mt-14 lg:-mt-20 pb-12 md:pb-20 lg:pb-28 px-4">
          <HowItWorksColumns cards={howItWorksCards} />
        </section>
      </main>
    </div>
  );
}