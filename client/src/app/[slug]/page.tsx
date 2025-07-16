import { getPageBySlug, getGalleryBySlug } from "@/data/loaders";
import Slider from "@/components/category/slider";
import { ProjectCard, ProjectGallery } from "@/types";

async function loader(
  slug: string,
): Promise<{ cards: ProjectCard[]; galleryData: ProjectGallery[] }> {
  try {
    const page = await getPageBySlug(slug);
    const gallery = await getGalleryBySlug(slug);

    return {
      cards: page?.data?.[0]?.cards || [],
      galleryData: gallery?.data || [],
    };
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return { cards: [], galleryData: [] };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { cards, galleryData } = await loader(slug);

  return (
    <main className="relative w-full m-auto">
      <Slider cards={cards} galleryData={galleryData} />
    </main>
  );
}
