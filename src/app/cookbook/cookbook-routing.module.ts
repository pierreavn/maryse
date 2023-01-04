import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { CookbookComponent } from './cookbook.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: CookbookComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        matcher: (url) => {
          if (url.length >= 2 && url[0].path === 'recipe') {
            return {
              consumed: url,
              posParams: {
                recipe: new UrlSegment(
                  url.slice(1).map(segment => segment.path).join('/'),
                  {}
                )
              }
            };
          }

          return null;
        },
        loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookbookRoutingModule { }
