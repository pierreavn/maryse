import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RecipeHeaderComponent } from './header/header.component';
import { RecipeIngredientsComponent } from './ingredients/ingredients.component';
import { RecipeStepsComponent } from './steps/steps.component';
import { RecipeStepComponent } from './steps/step/step.component';
import { IngredientComponent } from './steps/ingredient/ingredient.component';
import { PreheatComponent } from './steps/gizmos/preheat/preheat.component';

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeHeaderComponent,
    RecipeIngredientsComponent,
    RecipeStepsComponent,
    RecipeStepComponent,
    IngredientComponent,
    PreheatComponent,
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
