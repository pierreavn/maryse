import { NgModule } from '@angular/core';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { Step1LangComponent } from './step1-lang/step1-lang.component';
import { Step2RepoComponent } from './step2-repo/step2-repo.component';
import { Step3PreferencesComponent } from './step3-preferences/step3-preferences.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    Step1LangComponent,
    Step2RepoComponent,
    Step3PreferencesComponent
  ],
  imports: [
    SharedModule,
    OnboardingRoutingModule
  ]
})
export class OnboardingModule { }
