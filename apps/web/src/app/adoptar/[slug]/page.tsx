import AdoptionPage from "@/modules/cats/pages/AdoptionPage";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <AdoptionPage slug={slug} />;
}