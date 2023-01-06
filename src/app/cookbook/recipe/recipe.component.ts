import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { CookbookService } from '../../core/services/cookbook/cookbook.service';
import { BaseAppComponent } from '../../core/base.component';
import { Recipe, RecipeInitError } from '../../core/services/recipes/recipe.interfaces';
import { RecipeService } from '../../core/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent extends BaseAppComponent implements OnInit, OnDestroy {
  loading = true;

  recipe: Recipe | null = null;

  initError: RecipeInitError | null = null;

  constructor(private route: ActivatedRoute,
    private cookbookService: CookbookService,
    private recipeService: RecipeService,
    private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.recipeService.recipe$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(recipe => {
        if (recipe) {
          this.recipe = recipe;
          console.log('Loaded recipe:', recipe);
        } else {
          this.recipe = null;
        }
      });

    this.route.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        this.loadRecipe(params['recipe']);
      });
  }

  /**
   * Load recipe data
   * @param slug
   */
  public async loadRecipe(slug: string): Promise<void> {
    this.loading = true;

    try {
      this.initError = await this.recipeService.init(slug);
    } catch (error) {
      this.recipe = null;
      console.error(error);
    }

    this.loading = false;
  }

  /**
   * Go back to recipes list
   */
  public backToRecipes(): void {
    this.router.navigate([this.cookbookService.cookbook$.value?._href]);
  }

  public override ngOnDestroy(): void {
    this.recipeService.reset();
    super.ngOnDestroy();
  }
}
