import qs from "qs";
import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-url";

const BASE_URL = getStrapiURL();

const homePageQuery = qs.stringify({
  title: true,
  description: true,
  populate: {
    header: {
      populate: {
        link: true,
        dropdown: {
          populate: {
            link: true,
          },
        },
      },
    },
    background: {
      fields: ["url", "alternativeText"],
    },
  },
});

export async function getGlobalSettings() {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);
  url.search = homePageQuery;
  return await fetchAPI(url.href, { method: "GET" });
}

const pageBySlugQuery = (slug: string) =>
  qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      cards: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
  });

export async function getPageBySlug(slug: string) {
  const path = "/api/categories";
  const url = new URL(path, BASE_URL);
  url.search = pageBySlugQuery(slug);
  return await fetchAPI(url.href, { method: "GET" });
}

const galleryBySlug = (slug: string) =>
  qs.stringify({
    populate: {
      content: {
        on: {
          "blocks.gallery": {
            populate: {
              images: {
                fields: ["url", "alternativeText"],
              },
              videos: {
                fields: ["url", "alternativeText"],
              },
              external: true,
            },
          },
          "blocks.text-content": {
            populate: true,
          },
        },
      },
    },
    filters: {
      categories: {
        slug: {
          $eq: slug,
        },
      },
    },
  });

export async function getGalleryBySlug(slug: string) {
  const path = "/api/projects";
  const url = new URL(path, BASE_URL);
  url.search = galleryBySlug(slug);
  return await fetchAPI(url.href, { method: "GET" });
}
