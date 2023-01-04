import { Component, OnInit } from '@angular/core';
import { CookbookRecipe } from 'src/app/core/services/cookbook/cookbook.interfaces';
import { CookbookService } from 'src/app/core/services/cookbook/cookbook.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes: CookbookRecipe[] = [];

  constructor(private cookbookService: CookbookService) { }

  public ngOnInit(): void {
    this.recipes = this.cookbookService.cookbook$.value!.all;
    console.log(this.cookbookService.cookbook$.value)
  }
}
