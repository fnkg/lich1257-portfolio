import qs from "qs";
import { fetchAPI } from "@/utils/fetchApi";
import { getStrapiURL } from "@/utils/get-strapi-url";

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

export async function getHomePage() {
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
