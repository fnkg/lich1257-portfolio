const YT_REGEX =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

export function getStrapiURL() {
  return process.env.STRAPI_API_URL ?? "http://localhost:1337";
}

export function getBaseUrl(url: string): string {
  const baseUrl = process.env.STRAPI_API_URL ?? "http://localhost:1337";
  return `${baseUrl}${url}`;
}

export function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(YT_REGEX);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export function getYouTubeEmbedUrl(url: string) {
  const match = url.match(YT_REGEX);
  return match
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&vq=hd1080`
    : url;
}

export default {
  getStrapiURL,
  getBaseUrl,
  getYouTubeThumbnail,
  getYouTubeEmbedUrl,
};
