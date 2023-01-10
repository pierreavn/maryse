export interface RepositoryProvider {
  readonly key: string;
  readonly name: string;

  /**
   * Check if given URL is valid for this provider
   * @param url
   */
  isValidUrl(url: string): boolean;

  /**
   * Generate repo Slug parts from repo URL
   *  eg. "https://github.com/foo/bar" --> ["foo", "bar"]
   * @param url
   */
  getSlugPartsFromUrl(url: string): string[];

  /**
   * Generate repo URL from repo Slug parts
   * @param slugParts
   * @returns
   */
  getUrlFromSlugParts(slugParts: string[]): string;

  /**
   * Check if given slug parts are valid for this provider
   * @param slugParts
   */
  isValidSlugParts(slugParts: string[]): boolean;

  /**
   * Get repository file URL from path
   *  eg. ["a", "b"], "foo/bar.yml"
   *  --> GET "https://raw.githubusercontent.com/a/b/master/foo/bar.yml"
   * @param path
   */
  getFileUrl(slugParts: string[], path: string): string;
}
