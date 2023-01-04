import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from 'src/app/core/base.component';
import { Recipe, RecipeIngredient } from 'src/app/core/services/recipes/recipe.interfaces';
import { RecipeService } from 'src/app/core/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class RecipeIngredientsComponent extends BaseAppComponent implements OnInit, OnChanges {
  @Input() recipe!: Recipe;

  hasYields = false;

  quantity = 1;

  yieldsUnitSingular = '';

  yieldsUnitPlural = '';

  ingredients: RecipeIngredient[] = [];

  constructor(private recipeService: RecipeService) {
    super();
  }

  public ngOnInit(): void {
    this.recipeService.quantity$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(quantity => this.quantity = quantity);

    this.recipeService.ingredients$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(ingredients => this.ingredients = ingredients);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipe']) {
      if (this.recipe.yields) {
        this.hasYields = true;
        this.yieldsUnitSingular = this.recipe.yields.unit;
        this.yieldsUnitPlural = this.recipe.yields.unit_plural ?? `${this.recipe.yields.unit}s`;
      } else {
        this.hasYields = false;
      }
    }
  }

  /**
   * +1 on quantity
   */
  public increaseQuantity(): void {
    this.recipeService.setQuantity(this.quantity + 1);
  }

  /**
   * -1 on quantity
   */
  public decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.recipeService.setQuantity(this.quantity - 1);
    }
  }
}
