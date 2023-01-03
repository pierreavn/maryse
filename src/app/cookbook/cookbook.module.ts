import { NgModule } from '@angular/core';

import { CookbookRoutingModule } from './cookbook-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CookbookComponent } from './cookbook.component';


@NgModule({
  declarations: [
    CookbookComponent
  ],
  imports: [
    SharedModule,
    CookbookRoutingModule
  ]
})
export class CookbookModule { }
