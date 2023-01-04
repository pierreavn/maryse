import Ajv from "ajv";
import { Injectable } from "@angular/core";
import { RepoFileLoader } from "../../repo-providers/repo-providers.interfaces";
import { Cookbook, CookbookSchema } from "./cookbook.interfaces";
import { CookbookSchema_1_0 } from "./schemas/1.0.cookbook-schema";
import { BehaviorSubject } from "rxjs";

/**
 * Cookbook Service
 */
@Injectable({ providedIn: 'root' })
export class CookbookService {
  /**
   * List of available schemas
   * (latest to oldest version)
   */
  static readonly SCHEMAS: CookbookSchema[] = [
    new CookbookSchema_1_0,
  ];

  public readonly cookbook$ = new BehaviorSubject<Cookbook | null>(null);

  public repoFileLoader?: RepoFileLoader;

  /**
   * Initialize cookbook
   * @param href
   * @param repoFileLoader
   */
  public async init(href: string, repoFileLoader: RepoFileLoader): Promise<void> {
    this.reset();
    this.repoFileLoader = repoFileLoader;

    // Load cookbook data
    const cookbookData = await this.repoFileLoader('cookbook.yml');

    // Find latest schema
    const ajv = new Ajv();
    const schema = CookbookService.SCHEMAS
      .find(schema => ajv.validate(schema.schema, cookbookData));

    if (schema) {
      const cookbook = schema.parse(cookbookData, href);
      this.cookbook$.next(cookbook);
    } else {
      throw new Error("Invalid cookbook");
    }
  }

  /**
   * Reset cookbook
   */
  public reset(): void {
    this.repoFileLoader = undefined;
    this.cookbook$.next(null);
  }
}
