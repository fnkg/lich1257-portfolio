import { notFound } from "next/navigation";
import { getPageBySlug } from "@/data/loaders";
import Slider from "@/components/category/Slider";

interface PageProps {
  params: {
    slug: string;
  };
}

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (!data.length) notFound();
  const cards = data[0]?.cards || [];
  return cards;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;
  const cards = await loader(slug);
  return (
    <main className="relative w-full m-auto">
      <Slider cards={cards} />
    </main>
  );
}
