import { Injectable } from "@angular/core";
import Ajv from "ajv";
import { BehaviorSubject } from "rxjs";
import { CookbookService } from "../cookbook/cookbook.service";

import { Recipe, RecipeInitError, RecipeSchema } from "./recipe.interfaces";
import { RecipeSchema_1_0 } from "./schemas/1.0.recipe-schema";

@Injectable({ providedIn: 'root' })
export class RecipeService {
  /**
   * List of available parsers
   * (latest to oldest version)
   */
  static readonly SCHEMAS: RecipeSchema[] = [
    new RecipeSchema_1_0,
  ]

  public readonly recipe$ = new BehaviorSubject<Recipe | null>(null);

  constructor(private cookbookService: CookbookService) {}

  /**
   * Initialize recipe
   * @param repoFileLoader
   */
  public async init(slug: string): Promise<RecipeInitError | null> {
    this.reset();

    if (!this.cookbookService.repoFileLoader) {
      throw new Error("Cannot load recipe without repoFileLoader");
    }

    // Load recipe data
    const recipeData = await this.cookbookService.repoFileLoader(`recipes/${slug}.yml`);
    if (!recipeData) {
      return {
        reason: 'not-found',
        version: '',
        errors: []
      }
    }

    // Find latest schema
    const ajv = new Ajv();
    const schema = RecipeService.SCHEMAS
      .find(schema => ajv.validate(schema.schema, recipeData));

    if (schema) {
      const recipe = schema.parse(recipeData);
      this.recipe$.next(recipe);
      return null;
    } else {
      // Find latest schema errors
      const latestSchema = RecipeService.SCHEMAS[0];
      ajv.validate(latestSchema.schema, recipeData);

      return {
        reason: 'errors',
        version: latestSchema.version,
        errors: ajv.errors ? ajv.errors.filter(error => !!error).map(error => error.message!) : [],
      }
    }
  }

  /**
   * Reset recipe
   */
  public reset(): void {
    this.recipe$.next(null);
  }
}
