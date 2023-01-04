import { Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from 'src/app/core/base.component';
import { Recipe, RecipeIngredient } from 'src/app/core/services/recipes/recipe.interfaces';
import { RecipeService } from 'src/app/core/services/recipes/recipe.service';

@Component({
  selector: 'app-step-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent extends BaseAppComponent implements OnInit {
  @Input() recipe!: Recipe;

  @Input() options!: string[];

  @Input() label?: string;

  displayName!: string;

  ingredient?: RecipeIngredient;

  constructor(private recipeService: RecipeService) {
    super();
  }

  ngOnInit(): void {
    this.displayName = this.label ?? this.options[0];

    // First char to lowercase
    this.displayName = this.displayName.charAt(0).toLowerCase() + this.displayName.slice(1);

    // Find associated recipe ingredient
    this.recipeService.ingredients$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(ingredients => {
        this.ingredient = ingredients.find(ingredient => ingredient.name === this.options[0]);
      })
  }
}
