import { Recipe, RecipeSchema } from "../recipe.interfaces";

type RecipeData_1_0 = {
  name: string;
  category?: string;
  type?: string;
  difficulty?: string;
  pictures?: string[];
  durations?: {
    preparation?: string;
    baking?: string;
    rest?: string;
  };
  yields?: {
    amount?: number;
    unit_singular: string;
    unit_plural?: string;
  }[];
  ingredients?: {
    name: string;
    amount?: number;
    unit?: string;
  }[];
  steps?: string[];
  references?: string[];
};

/**
 * Recipe Schema - v1.0
 */
export class RecipeSchema_1_0 implements RecipeSchema {
  public readonly version = '1.0';

  /**
   * Schema
   */
  public readonly schema = {
    type: "object",
    properties: {
      name: {type: "string"},
      category: {type: "string"},
      type: {type: "string"},
      difficulty: {type: "string"},
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
      yields: {
        type: "array",
        items: {
          type: "object",
          properties: {
            amount: { type: "number" },
            unit_singular: { type: "string" },
            unit_plural: { type: "string" },
          },
          required: ["unit_singular"],
        },
      },
      ingredients: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            amount: { type: "number" },
            unit: { type: "string" },
          },
          required: ["name"],
        },
      },
      steps: {
        type: "array",
        items: { type: "string" },
      },
      references: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["name"]
  };

  /**
   * Parse raw recipe data
   * @param data
   */
  public parse = (data: RecipeData_1_0): Recipe => {
    return {
      ...data,
    };
  }
}
