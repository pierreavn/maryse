import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PreferencesService } from 'src/app/core/services/preferences/preferences.service';

@Component({
  selector: 'app-step1-lang',
  templateUrl: './step1-lang.component.html',
  styleUrls: ['./step1-lang.component.scss']
})
export class Step1LangComponent implements OnInit {
  availableLangs: {lang: string, flag: string}[] = [
    { lang: 'en', flag: 'uk' },
    { lang: 'fr', flag: 'fr' },
  ];

  lang = '';

  constructor(private translate: TranslateService,
    private preferences: PreferencesService,
    private router: Router) {}

  public ngOnInit(): void {
    this.lang = this.preferences.getPreferences().lang;
  }

  /**
   * Select lang
   * @param lang
   */
  public selectLang(lang: string): void {
    this.lang = lang;
    this.translate.use(lang);
    this.preferences.savePreferences({ lang });
  }

  /**
   * Go to the next step
   */
  public next(): void {
    this.router.navigate(['/onboarding/repository']);
  }
}
