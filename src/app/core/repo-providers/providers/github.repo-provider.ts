import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RepoFileLoader, RepoProvider } from "../repo-providers.interfaces";

/**
 * GitHub Repository Provider
 */
@Injectable({ providedIn: 'root' })
export class GithubRepoProvider implements RepoProvider {
  readonly key = 'github';
  readonly name = 'GitHub';

  protected repoRegex = /^((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)github\.com\/([\w\.@\:\-~]+)\/([\w\.@\:\-~]+)(\.git)?(\/)?$/;

  constructor(private readonly http: HttpClient) {}

  /**
   * Check if given URL is valid for GitHub
   * @param url
   * @returns
   */
  public isValidUrl(url: string): boolean {
    return this.repoRegex.test(url);
  }

  /**
   * Generate repo Slug parts from repo URL
   * @param url
   * @returns
   */
  public getSlugPartsFromUrl(url: string): string[] {
    const parts = url.match(this.repoRegex)!;
    return parts.slice(7, 9);
  }

  /**
   * Check if given slug parts is valid for this provider
   * @param slugParts
   * @returns
   */
  public isValidSlugParts(slugParts: string[]): boolean {
    return slugParts.length === 2 && slugParts.every(part => !!part);
  }

  /**
   * Get repository file loader from slugParts
   * @param slugParts
   */
  public getFileLoader(slugParts: string[]): RepoFileLoader {
    return async (path: string) => {
      try {
        const url = `https://raw.githubusercontent.com/${slugParts[0]}/${slugParts[1]}/master/${path}`;
        return await this.http.get<string>(url, {responseType: 'text' as any}).toPromise();
      } catch (error) {
        return undefined;
      }
    };
  }
}
