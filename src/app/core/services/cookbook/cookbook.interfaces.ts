import { SchemaObject } from "ajv";

export type Cookbook = {
  _href: string;
  all: CookbookRecipe[];
  byCategory: Record<string, CookbookRecipe[]>;
  byType: Record<string, CookbookRecipe[]>;
  byDifficulty: Record<string, CookbookRecipe[]>;
  byIngredients: Record<string, CookbookRecipe[]>;
};

export type CookbookRecipe = {
  _file: string;
  _slug: string;
  _href: string;
  _version: string;
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

export interface CookbookSchema {
  readonly version: string;
  readonly schema: SchemaObject;
  parse: (data: any, cookbookHref: string) => Cookbook;
};
