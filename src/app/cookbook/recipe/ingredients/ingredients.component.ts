import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class RecipeIngredientsComponent implements OnChanges {
  @Input() recipe!: Recipe;

  hasYields = false;

  yieldsAmount = 1;

  yieldsUnitSingular = '';

  yieldsUnitPlural = '';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipe']) {
      if (this.recipe.yields) {
        this.hasYields = true;
        this.yieldsAmount = this.recipe.yields.amount ?? 1;
        this.yieldsUnitSingular = this.recipe.yields.unit;
        this.yieldsUnitPlural = this.recipe.yields.unit_plural ?? `${this.recipe.yields.unit}s`;
      } else {
        this.hasYields = false;
      }
    }
  }

  /**
   * +1 on yields amount
   */
  public addYieldsAmount(): void {
    this.yieldsAmount++;
  }

  /**
   * -1 on yields amount
   */
  public removeYieldsAmount(): void {
    if (this.yieldsAmount > 1) {
      this.yieldsAmount--;
    }
  }
}
