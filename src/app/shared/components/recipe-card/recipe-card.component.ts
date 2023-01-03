import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeService;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openRecipe(): void {
    this.router.navigate(['/xx']);
  }

}
