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
