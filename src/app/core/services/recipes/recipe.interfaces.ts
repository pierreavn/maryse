import { SchemaObject } from "ajv";

export interface RecipeParser {
  readonly version: string;
  readonly schema: SchemaObject;
  parse: (rawRecipe: any) => RecipeData;
};

export type RecipeData = {
  name: string;
}
