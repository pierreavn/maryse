import { Cookbook, CookbookRecipe, CookbookSchema } from "../cookbook.interfaces";

type CookbookData_1_0 = {
  recipes: {[file: string]: CookbookRecipeData_1_0};
};

type CookbookRecipeData_1_0 = {
  name: string;
  category?: string;
  type?: string;
  difficulty?: string;
  pictures?: string[];
  durations?: {
    preparation?: string;
    backing?: string;
    rest?: string;
  };
  ingredients?: string[];
};

/**
 * Cookbook Schema - v1.0
 */
export class CookbookSchema_1_0 implements CookbookSchema {
  public readonly version = '1.0';

  /**
   * Schema
   */
  public readonly schema = {
    type: "object",
    properties: {
      recipes: {
        type: "object",
        patternProperties: {
          "^.*$": {
            type: "object",
            properties: {
              name: { type: "string" },
              category: { type: "string" },
              type: { type: "string" },
              difficulty: { type: "string" },
              pictures: {
                type: "array",
                items: { type: "string" },
              },
              durations: {
                type: "object",
                properties: {
                  preparation: { type: "string" },
                  baking: { type: "string" },
                  rest: { type: "string" },
                },
              },
              ingredients: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["name"],
          },
        }
      },
    },
    required: ["recipes"]
  };

  /**
   * Parse cookbook
   * @param data
   */
  public parse = (data: CookbookData_1_0, cookbookHref: string): Cookbook => {
    const cookbook: Cookbook = {
      _href: cookbookHref,
      all: [],
      byCategory: {},
      byType: {},
      byDifficulty: {},
      byIngredients: {},
    };

    for (const file in data.recipes) {
      const recipe = this.parseRecipe(file, data.recipes[file], cookbookHref);

      // All
      cookbook.all.push(recipe);

      // By Category
      if (recipe.category) {
        cookbook.byCategory[recipe.category] ??= [];
        cookbook.byCategory[recipe.category].push(recipe);
      }

      // By Type
      if (recipe.type) {
        cookbook.byType[recipe.type] ??= [];
        cookbook.byType[recipe.type].push(recipe);
      }

      // By Difficulty
      if (recipe.difficulty) {
        cookbook.byDifficulty[recipe.difficulty] ??= [];
        cookbook.byDifficulty[recipe.difficulty].push(recipe);
      }

      // By Ingredients
      if (recipe.ingredients) {
        recipe.ingredients.forEach(ingredient => {
          cookbook.byIngredients[ingredient] ??= [];
          cookbook.byIngredients[ingredient].push(recipe);
        });
      }
    }

    return cookbook;
  }

  /**
   * Parse recipe
   * @param data
   */
  protected parseRecipe = (file: string, data: CookbookRecipeData_1_0, cookbookHref: string): CookbookRecipe => {
    const slug = file.replace(/\.[^/.]+$/, ""); // remove yml extension
    return {
      ...data,
      _file: file,
      _slug: slug,
      _href: `${cookbookHref}/recipe/${slug}`,
      _version: this.version,
    };
  }
}
