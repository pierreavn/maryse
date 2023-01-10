import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { GithubRepoProvider } from "./providers/github.provider";
import { Repository } from "./repository";
import { RepositoryProvider } from "./repository.interfaces";

/**
 * Repository Service
 */
@Injectable({ providedIn: 'root' })
export class RepositoryService {
  readonly slugDelimiter = ':';

  /**
   * List of available repository providers
   */
  readonly providers: RepositoryProvider[] = [
    inject(GithubRepoProvider),
  ];

  constructor(protected http: HttpClient) {}

  /**
   * Generate repo Slug from repo URL
   *  eg. "https://github.com/foo/bar" --> "github/foo/bar"
   * @param url
   */
  public getSlugFromUrl(url: string): string | null {
    let provider: RepositoryProvider | null = null;

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
   * Get repository url from slug
   *  eg. "github/foo/bar" --> "https://github.com/foo/bar"
   * @param slug
   */
  public getUrlFromSlug(slug: string): string | null {
    let slugParts = slug.split('/');
    slugParts = [
      slugParts[0],
      slugParts[1],
      ...slugParts[2].split(this.slugDelimiter),
    ];

    const provider = this.providers.find(provider => provider.key === slugParts[0]);
    if (!provider) {
      return null;
    }

    return provider.getUrlFromSlugParts(slugParts.slice(1));
  }

  /**
   * Get repository instance
   */
  public getRepository(url: string, providerKey: string): Repository | null {
    const provider = this.providers.find(provider => provider.key === providerKey);
    if (!provider || !provider.isValidUrl(url)) {
      return null;
    }

    return new Repository(url, provider, this.http);
  }
}
