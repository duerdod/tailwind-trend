/**
 * Constructs the image url by combining the passed-in url with the selected channel
 * @param url The image url
 * @param baseUrl The baseUrl from the currently-selected channel
 */
export const getFullUrl = (url: string, baseUrl: string) => {
  if (!baseUrl || !url) {
    return url;
  }
  url = url.trim();
  if (
    url.indexOf('/') === 0 &&
    url.indexOf('//:') === -1 &&
    url.indexOf('static/media') === -1
  ) {
    return baseUrl + url;
  }
  return url;
};
