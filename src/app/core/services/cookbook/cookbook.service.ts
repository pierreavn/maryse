import { Injectable } from "@angular/core";
import { RepoFileLoader } from "../../repo-providers/repo-providers.interfaces";
import { RecipeService } from "../recipes/recipe.service";
import { RecipesListFile } from "./cookbook.interfaces";

/**
 * Cookbook Service
 */
@Injectable({ providedIn: 'root' })
export class CookbookService {
  public recipes: RecipeService[] = [];

  public failedRecipes: Record<string, string> = {};

  protected repoFileLoader?: RepoFileLoader;

  /**
   * Initialize cookbook
   * @param repoFileLoader
   */
  public async init(repoFileLoader: RepoFileLoader): Promise<void> {
    this.reset();
    this.repoFileLoader = repoFileLoader;

    // Load recipes listing
    const recipesList = await this.repoFileLoader('recipes/recipes.yml') as RecipesListFile;
    if (!recipesList?.recipes
      || !Array.isArray(recipesList.recipes)
      || !recipesList.recipes.every(recipe => typeof recipe === "string")) {
        throw new Error("Invalid recipes list");
    }

    // Load all recipes
    const recipes = await Promise.all(
      recipesList.recipes
        .map(recipe => this.repoFileLoader?.(`recipes/${recipe}`))
    );

    // Register each recipe
    recipesList.recipes
      .forEach((recipePath, index) => {
        const recipe = recipes[index];
        if (recipe) {
          try {
            const recipeService = new RecipeService(recipe, recipePath);
            this.recipes.push(recipeService);
          } catch (error) {
            this.failedRecipes[recipePath] = 'fail to parse';
          }
        } else {
          this.failedRecipes[recipePath] = 'fail to load';
        }
      });
  }

  /**
   * Reset cookbook
   */
  public reset(): void {
    this.repoFileLoader = undefined;
    this.recipes = [];
    this.failedRecipes = {};
  }
}
