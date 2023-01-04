import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RecipeHeaderComponent } from './header/header.component';
import { RecipeIngredientsComponent } from './ingredients/ingredients.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeHeaderComponent,
    RecipeIngredientsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: RecipeComponent,
      },
    ]),
  ],
  exports: [
    RouterModule,
  ],
})
export class RecipeModule { }
