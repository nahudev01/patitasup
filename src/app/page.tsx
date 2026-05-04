import CatsView from "@/features/cats/components/CatsView";
import { mockCats } from "@/features/cats/data/mockCats";
import { listPublishedPublicationCats } from "@/features/publications/lib/publicationsRepository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const publicationCats = await listPublishedPublicationCats();
  const cats = [...publicationCats, ...mockCats];

  return <CatsView cats={cats} />;
}
