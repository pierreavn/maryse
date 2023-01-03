export type RepoFileLoader = (path: string) => Promise<string | undefined>;

export interface RepoProvider {
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
   * Check if given slug parts is valid for this provider
   * @param url
   */
  isValidSlugParts(slugParts: string[]): boolean;

  /**
   * Get repository file loader from slugParts
   *  eg. ["foo", "bar"]
   *  --> GET "https://github.com/foo/bar/blob/master/<path>"
   * @param slugParts
   */
  getFileLoader(slugParts: string[]): RepoFileLoader;
}
