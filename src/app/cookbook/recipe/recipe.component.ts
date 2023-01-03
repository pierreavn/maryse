import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent extends BaseAppComponent implements OnInit {
  recipeSlug?: string;

  constructor(private route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
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
  public loadRecipe(slug: string): void {
    this.recipeSlug = slug;
  }
}
