import { Injectable, inject } from "@angular/core";
import * as yaml from "js-yaml";

import { RepoFileLoader, RepoProvider } from "./repo-providers.interfaces";
import { GithubRepoProvider } from "./providers/github.repo-provider";


/**
 * Repository Providers Service
 */
@Injectable({ providedIn: 'root' })
export class RepoProvidersService {
  readonly slugDelimiter = ':';

  /**
   * List of available Repo Providers
   */
  readonly providers: RepoProvider[] = [
    inject(GithubRepoProvider),
  ];

  /**
   * Generate repo Slug from repo URL
   *  eg. "https://github.com/foo/bar" --> "github/foo/bar"
   * @param url
   */
  public getSlugFromUrl(url: string): string | null {
    let provider: RepoProvider | null = null;

    // Find provider for given URL
    for (const p of this.providers) {
      if (p.isValidUrl(url)) {
        provider = p;
      }
    }

    if (provider) {
      const slugParts = provider.getSlugPartsFromUrl(url);
      let slug = `${provider.key}/${slugParts[0]}`;
      if (slugParts.length > 1) {
        slug += `/${slugParts.slice(1).join(this.slugDelimiter)}`;
      }
      return slug;
    } else {
      return null;
    }
  }

  /**
   * Get repository file loader from slugParts
   *  eg. "github", ["foo", "bar"]
   *  --> GET "https://github.com/foo/bar/blob/master/<path>"
   * @param providerKey
   * @param slugParts
   */
  public getFileLoader(providerKey: string, slugParts: string[]): RepoFileLoader | null {
    const provider = this.getProviderFromKey(providerKey);
    if (provider) {
      return async (path: string): Promise<string | object | undefined> => {
        const data = await provider.getFileLoader(slugParts)(path);

        // Parse YML to JSON
        if (data && (path.endsWith('.yml') || path.endsWith('.yaml'))) {
          return yaml.load(data as string) as object;
        } else {
          return data;
        }
      };
    } else {
      return null;
    }
  }

  /**
   * Get Repo Provider from key
   * @param key
   */
  protected getProviderFromKey(key: string): RepoProvider | null {
    return this.providers.find(provider => provider.key === key) ?? null;
  }
}
