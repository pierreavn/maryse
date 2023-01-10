import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { CookbookService } from 'src/app/core/services/cookbook/cookbook.service';
import { Recipe } from 'src/app/core/services/recipes/recipe.interfaces';

@Component({
  selector: 'app-recipe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class RecipeHeaderComponent implements OnChanges {
  @Input() recipe!: Recipe;

  pictures: GalleryItem[] = [];

  notes?: string;

  constructor(private cookbookService: CookbookService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipe']) {
      this.pictures = (this.recipe.pictures ?? [])
        .map(picture => this.getImageItem(picture));

      this.notes = this.recipe.notes
        ? this.recipe.notes.replaceAll('\n', '  \n')
        : undefined;
    }
  }

  /**
   * Build ImageItem object from picture string
   * @param picture
   */
  protected getImageItem(picture: string): ImageItem {
    let src = picture;

    // Self-hosted pictures
    if (!src.startsWith('http://') && !src.startsWith('https://') && this.cookbookService.repository) {
      src = this.cookbookService.repository.getFileUrl(src);
    }

    return new ImageItem({
      src,
    });
  }
}
