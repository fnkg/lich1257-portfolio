import { getPageBySlug } from "@/data/loaders";
import Slider from "@/components/projects/Slider";
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
  const { slug } = await params;
  const cards = await loader(slug);
  return (
    <main className="relative w-full m-auto">
      <Slider projects={cards} />
    </main>
  );
}
