import { Component, OnInit } from '@angular/core';
import { CookbookService } from 'src/app/core/services/cookbook/cookbook.service';
import { RecipeService } from 'src/app/core/services/recipes/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: RecipeService[] = [];

  constructor(private cookbookService: CookbookService) { }

  public ngOnInit(): void {
    this.recipes = this.cookbookService.recipes;
  }
}
