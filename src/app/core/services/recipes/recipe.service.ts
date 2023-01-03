import Ajv from "ajv";

import { RecipeParser_1_0 } from "./parsers/1.0.parser";
import { RecipeData, RecipeParser } from "./recipe.interfaces";

export class RecipeService {
  /**
   * List of available parsers
   * (latest to oldest version)
   */
  static readonly PARSERS: RecipeParser[] = [
    new RecipeParser_1_0,
  ]

  public readonly data: RecipeData;

  protected parser: RecipeParser;

  get version(): string { return this.parser.version; }

  constructor(rawRecipe: any, protected path: string) {
    // Try to find valid parser version
    const ajv = new Ajv();
    this.parser = RecipeService.PARSERS
      .find(parser => ajv.validate(parser.schema, rawRecipe))!;

    if (this.parser) {
      this.data = this.parser.parse(rawRecipe);
    } else {
      throw new Error("Invalid raw recipe");
    }
  }
}
