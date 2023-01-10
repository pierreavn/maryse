import { Injectable } from "@angular/core";
import { RepositoryProvider } from "../repository.interfaces";

/**
 * GitHub Repository Provider
 */
@Injectable({ providedIn: 'root' })
export class GithubRepoProvider implements RepositoryProvider {
  readonly key = 'github';
  readonly name = 'GitHub';

  readonly repoRegex = /^((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)github\.com\/([\w\.@\:\-~]+)\/([\w\.@\:\-~]+)(\.git)?(\/)?$/;

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
   * Generate repo URL from repo Slug parts
   * @param slugParts
   * @returns
   */
  public getUrlFromSlugParts(slugParts: string[]): string {
    return `https://github.com/${slugParts[0]}/${slugParts[1]}`;
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
   * Get repository file url from path
   * @param slugParts
   * @param path
   */
  public getFileUrl(slugParts: string[], path: string): string {
    return `https://raw.githubusercontent.com/${slugParts[0]}/${slugParts[1]}/main/${path}`;
  }
}
