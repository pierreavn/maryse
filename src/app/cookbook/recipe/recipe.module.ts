import { NgModule } from '@angular/core';
import { RecipeComponent } from './recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RecipeComponent
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
