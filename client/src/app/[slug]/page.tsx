import { getPageBySlug } from "@/data/loaders";
import ProjectSlider from "@/components/ProjectSlider";
import { notFound } from "next/navigation";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (!data.length) notFound();
  const cards = data[0]?.cards || [];
  return cards;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const cards = await loader(params.slug);
  return (
    <main className="relative w-full m-auto">
      {/* Pass the Strapi “cards” array to your Swiper slider */}
      <ProjectSlider projects={cards} />
    </main>
  );
}
