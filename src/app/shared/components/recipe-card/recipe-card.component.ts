import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookbookRecipe } from 'src/app/core/services/cookbook/cookbook.interfaces';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: CookbookRecipe;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openRecipe(): void {
    this.router.navigate([this.recipe._href]);
  }
}
