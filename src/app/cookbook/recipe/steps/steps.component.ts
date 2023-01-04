import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';

@Component({
  selector: 'app-recipe-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class RecipeStepsComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
