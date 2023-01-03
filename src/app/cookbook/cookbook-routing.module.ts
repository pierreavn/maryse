import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookbookComponent } from './cookbook.component';

const routes: Routes = [
  {
    path: '',
    component: CookbookComponent,
    children: [
      // TODO
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookbookRoutingModule { }
