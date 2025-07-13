const YT_REGEX =
  /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_API_URL ?? "https://admin.lich1257.com";
}

export function getBaseUrl(url: string): string {
  if (!url) return "/fallback.jpg";
  if (url.startsWith("http")) return url;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://admin.lich1257.com";
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
