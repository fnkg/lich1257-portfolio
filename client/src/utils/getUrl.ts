export function getStrapiURL() {
  return process.env.STRAPI_API_URL ?? "http://localhost:1337";
}

export function getBaseUrl(url: string): string {
  const baseUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
  return `${baseUrl}${url}`;
}

export default {
  getStrapiURL,
  getBaseUrl,
};
