import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';

@Component({
  selector: 'app-recipe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class RecipeHeaderComponent implements OnChanges {
  @Input() recipe!: Recipe;

  pictures: string[] = [];

  pictureIndex = 0;

  notes?: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipe']) {
      this.pictures = this.recipe.pictures ?? [];
      this.notes = this.recipe.notes
        ? this.recipe.notes.replaceAll('\n', '  \n')
        : undefined;
    }
  }
}
