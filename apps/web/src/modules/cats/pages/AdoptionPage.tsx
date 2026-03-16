import Hero from "@/shared/components/Hero";
import PawsSection from "@/shared/components/PawsSection";
import { mockCats } from "../data/mockCats";

type Props = {
  slug: string;
};

const AdoptionPage = ({ slug }: Props) => {
  const cat = mockCats.find((item) => item.slug === slug);

  if (!cat) {
    return <div>Gatito no encontrado</div>;
  }

  console.log("slug recibido:", slug);
console.log("mockCats:", mockCats);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection className="h-[472px]">
          <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
            <Hero
              badgeText="Solicitud de adopción"
              variant="page"
              title={`Estás a un paso de adoptar a ${cat.name}`}
              subtitle="Completa el formulario a continuación para que podamos conocerte mejor y encontrar el hogar perfecto para él."
            />
          </div>
        </PawsSection>

      </main>
    </div>
  );
};

export default AdoptionPage;