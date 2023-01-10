import { HttpClient } from '@angular/common/http';
import * as yaml from "js-yaml";

import { RepositoryProvider } from "./repository.interfaces";

export class Repository {
  protected slugParts: string[];

  constructor(public readonly url: string,
    protected readonly provider: RepositoryProvider,
    protected readonly http: HttpClient) {
      this.slugParts = this.provider.getSlugPartsFromUrl(url);
    }

  /**
   * Get repository file url from path
   * @param path
   */
  public getFileUrl(path: string): string {
    return this.provider.getFileUrl(this.slugParts, path);
  }

  /**
   * Load repository file from path
   * @param path
   */
  public async loadFile(path: string): Promise<string | object | undefined> {
    try {
      const url = this.getFileUrl(path);
      const data = await this.http.get<string>(url, {responseType: 'text' as any}).toPromise();

      // Parse YML to JSON
      if (data && (path.endsWith('.yml') || path.endsWith('.yaml'))) {
        return yaml.load(data as string) as object;
      } else {
        return data;
      }
    } catch (error) {
      return undefined;
    }
  }
}
