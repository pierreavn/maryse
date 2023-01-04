import { Recipe } from "src/app/core/services/recipes/recipe.interfaces";

export interface GizmoComponent {
  recipe?: Recipe;
  step?: string;
  options?: string[];
};
