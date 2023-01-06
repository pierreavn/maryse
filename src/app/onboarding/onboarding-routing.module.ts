import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Step1LangComponent } from './step1-lang/step1-lang.component';
import { Step2RepoComponent } from './step2-repo/step2-repo.component';
import { Step3PreferencesComponent } from './step3-preferences/step3-preferences.component';

const routes: Routes = [
  {
    path: '',
    component: Step1LangComponent,
  },
  {
    path: 'repository',
    component: Step2RepoComponent,
  },
  {
    path: 'preferences',
    component: Step3PreferencesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
