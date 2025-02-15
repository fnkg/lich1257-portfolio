import { notFound } from "next/navigation";
import { getPageBySlug, getGalleryBySlug } from "@/data/loaders";
import Slider from "@/components/category/Slider";
import { ProjectCard, ProjectGallery } from "@/types";

async function loader(
  slug: string
): Promise<{ cards: ProjectCard[]; galleryData: ProjectGallery[] }> {
  const page = await getPageBySlug(slug);
  const gallery = await getGalleryBySlug(slug);

  if (!page.data.length) {
    notFound();
  }

  return {
    cards: page.data[0]?.cards || [],
    galleryData: gallery.data || [],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const { cards, galleryData } = await loader(slug);

  return (
    <main className="relative w-full m-auto">
      <Slider cards={cards} galleryData={galleryData} />
    </main>
  );
}
