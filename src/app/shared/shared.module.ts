import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiBadgeModule, TuiCarouselModule, TuiInputModule, TuiIslandModule, TuiStepperModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiAlertModule } from '@taiga-ui/core';
import { TuiRootModule } from '@taiga-ui/core';
import { TuiNotificationModule } from '@taiga-ui/core';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { IconsModule } from './icons.module';
import { RecipeSectionComponent } from './components/recipe-section/recipe-section.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

/**
 * List of shared components across the app
 */
const SharedComponents: any[] = [
  RecipeCardComponent,
  RecipeSectionComponent,
];

/**
 * List of shared modules across the app
 */
const SharedModules: any[] = [
  // Angular Core
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,

  // Tauga UI
  TuiRootModule,
  TuiInputModule,
  TuiButtonModule,
  TuiAlertModule,
  TuiNotificationModule,
  TuiLoaderModule,
  TuiCarouselModule,
  TuiBadgeModule,
  TuiStepperModule,
  TuiIslandModule,

  // Others
  TranslateModule,
  IconsModule,
  MarkdownModule.forChild(),
];

@NgModule({
  declarations: [
    ...SharedComponents,
  ],
  imports: [
    ...SharedModules,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    ...SharedComponents,
    ...SharedModules,
    LottieModule,
  ]
})
export class SharedModule { }
