import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from 'src/app/core/base.component';
import { Cookbook } from 'src/app/core/services/cookbook/cookbook.interfaces';
import { CookbookService } from 'src/app/core/services/cookbook/cookbook.service';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';
import { RecipeService } from 'src/app/core/services/recipes/recipe.service';

@Component({
  selector: 'app-cookbook-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseAppComponent implements OnInit {
  cookbook: Cookbook | null = null;

  recipe: Recipe | null = null;

  constructor(private cookbookService: CookbookService,
    private recipeService: RecipeService,
    private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.cookbookService.cookbook$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(cookbook => this.cookbook = cookbook);

    this.recipeService.recipe$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(recipe => this.recipe = recipe);
  }

  /**
   * Go back to previous screen
   */
  public goBack(): void {
    this.router.navigate([this.cookbookService.cookbook$.value?._href]);
  }
}
