import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PreferencesService } from './core/services/preferences/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'maryse';

  constructor(private translate: TranslateService,
    private preferencesService: PreferencesService,
    private router: Router) {
    this.translate.setDefaultLang('fr');

    const preferences = this.preferencesService.getPreferences();
    this.translate.use(preferences.lang);

    if (!preferences.repos
      || !Array.isArray(preferences.repos)
      || preferences.repos.length === 0) {
        this.router.navigate(['/onboarding']);
    }
  }
}
