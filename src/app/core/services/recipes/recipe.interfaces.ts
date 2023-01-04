import { SchemaObject } from "ajv";

export type Recipe = {
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
    unit: string;
    unit_plural?: string;
  };
  ingredients?: {
    name: string;
    amount?: number;
    unit?: RecipeIngredientUnit;
  }[];
  steps?: string[];
  references?: string[];
};

export interface RecipeSchema {
  readonly version: string;
  readonly schema: SchemaObject;
  parse: (data: any) => Recipe;
};

export type RecipeInitError = {
  reason: 'not-found' | 'errors';
  version: string;
  errors: string[];
};

export type RecipeIngredient = {
  name: string;
  initialAmount: number;
  amount: number;
  unit?: RecipeIngredientUnit;
}

export enum RecipeIngredientUnit {
  L  = "l",
  DL = "dl",
  CL = "cl",
  ML = "ml",
  KG = "kg",
  G  = "g",
}
