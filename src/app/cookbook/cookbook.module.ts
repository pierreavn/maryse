import { NgModule } from '@angular/core';

import { CookbookRoutingModule } from './cookbook-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CookbookComponent } from './cookbook.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    CookbookComponent,
    SearchComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    CookbookRoutingModule
  ]
})
export class CookbookModule { }
