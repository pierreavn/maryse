import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiAlertModule } from '@taiga-ui/core';
import { TuiRootModule } from '@taiga-ui/core';
import { TuiNotificationModule } from '@taiga-ui/core';

/**
 * List of shared components across the app
 */
const SharedComponents: any[] = [

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

  // Others
  TranslateModule,
];

@NgModule({
  declarations: [
    ...SharedComponents,
  ],
  imports: [
    ...SharedModules,
  ],
  exports: [
    ...SharedComponents,
    ...SharedModules,
  ]
})
export class SharedModule { }
