import Ajv from "ajv";
import { Injectable } from "@angular/core";
import { Cookbook, CookbookSchema } from "./cookbook.interfaces";
import { CookbookSchema_1_0 } from "./schemas/1.0.cookbook-schema";
import { BehaviorSubject } from "rxjs";
import { Repository } from "../repository/repository";

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

  public get repository(): Repository | null {
    return this.cookbook$.value?.repository ?? null;
  }

  /**
   * Initialize cookbook
   * @param href
   * @param repoFileLoader
   */
  public async init(href: string, repository: Repository): Promise<void> {
    this.reset();

    // Load cookbook data
    const cookbookData = await repository.loadFile('cookbook.yml');

    // Find latest schema
    const ajv = new Ajv();
    const schema = CookbookService.SCHEMAS
      .find(schema => ajv.validate(schema.schema, cookbookData));

    if (schema) {
      const cookbook = schema.parse(cookbookData, href, repository);
      this.cookbook$.next(cookbook);
    } else {
      throw new Error("Invalid cookbook");
    }
  }

  /**
   * Reset cookbook
   */
  public reset(): void {
    this.cookbook$.next(null);
  }
}
