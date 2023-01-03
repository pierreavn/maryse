import { RecipeData, RecipeParser } from "../recipe.interfaces";

/**
 * Recipe Parser - v1.0
 */
export class RecipeParser_1_0 implements RecipeParser {
  public readonly version = '1.0';

  /**
   * Schema
   */
  public readonly schema = {
    type: "object",
    properties: {
      name: {type: "string"}
    },
    required: ["name"]
  };

  /**
   * Parse raw recipe
   * @param rawRecipe
   */
  public parse = (raw: any): RecipeData => {
    return {
      name: raw.name,
    };
  }
}
