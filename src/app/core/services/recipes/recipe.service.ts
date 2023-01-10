import { Injectable } from "@angular/core";
import Ajv from "ajv";
import { BehaviorSubject } from "rxjs";
import { CookbookService } from "../cookbook/cookbook.service";

import { Recipe, RecipeIngredient, RecipeInitError, RecipeSchema } from "./recipe.interfaces";
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

  public readonly quantity$ = new BehaviorSubject<number>(1);

  public readonly ingredients$ = new BehaviorSubject<RecipeIngredient[]>([]);

  constructor(private cookbookService: CookbookService) {}

  /**
   * Initialize recipe
   * @param repoFileLoader
   */
  public async init(slug: string): Promise<RecipeInitError | null> {
    this.reset();

    if (!this.cookbookService.repository) {
      throw new Error("Cannot load recipe without repository");
    }

    // Load recipe data
    const recipeData = await this.cookbookService.repository.loadFile(`recipes/${slug}.yml`);
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

      // Set quantity
      this.quantity$.next(recipe.yields?.amount ?? 1);

      // Set ingredients
      this.ingredients$.next(
        (recipe.ingredients ?? []).map(ingredient => ({
          name: ingredient.name,
          initialAmount: ingredient.amount,
          amount: ingredient.amount,
          unit: ingredient.unit,
        }))
      );

      return null;
    } else {
      // Find latest schema errors
      const latestSchema = RecipeService.SCHEMAS[0];
      ajv.validate(latestSchema.schema, recipeData);

      return {
        reason: 'errors',
        version: latestSchema.version,
        errors: ajv.errors
          ? ajv.errors
              .filter(error => !!error)
              .map(error => `${error.instancePath} ${error.message}`)
          : [],
      }
    }
  }

  /**
   * Set yields quantity
   * @param newQuantity
   */
  public setQuantity(newQuantity: number): void {
    const recipe = this.recipe$.value;
    if (recipe && newQuantity >= 1) {
      this.quantity$.next(newQuantity);

      // Update ingredients amounts
      this.ingredients$.next([
        ...this.ingredients$.value.map(ingredient => {
          if (ingredient.initialAmount === undefined) {
            return ingredient;
          }

          let newAmount = ingredient.initialAmount * (newQuantity / (recipe.yields?.amount ?? 1));
          if (newAmount >= 10) {
            newAmount = Math.round(newAmount);
          } else {
            newAmount = Math.round(newAmount * 10) / 10;
          }

          return {
            ...ingredient,
            amount: newAmount,
          };
        })
      ]);
    }
  }

  /**
   * Reset recipe
   */
  public reset(): void {
    this.recipe$.next(null);
    this.quantity$.next(1);
    this.ingredients$.next([]);
  }
}
