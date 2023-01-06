import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepoProvidersService } from 'src/app/core/repo-providers/repo-providers.service';
import { PreferencesService } from 'src/app/core/services/preferences/preferences.service';

@Component({
  selector: 'app-step2-repo',
  templateUrl: './step2-repo.component.html',
  styleUrls: ['./step2-repo.component.scss']
})
export class Step2RepoComponent {
  form: FormGroup = new FormGroup({
    repoUrl: new FormControl('', [Validators.required]),
  });

  isInvalid = false;

  demoCookbook = 'https://github.com/pierreavn/recipes';

  constructor(private repoProvidersService: RepoProvidersService,
    private preferences: PreferencesService,
    private router: Router) {}

  /**
   * Go to the repository cookbook
   */
  public async submit() {
    this.isInvalid = false;
    const repoUrl = this.form.get('repoUrl')?.value;

    const slug = this.repoProvidersService.getSlugFromUrl(repoUrl);
    if (slug) {
      this.preferences.savePreferences({
        repos: [
          { url: repoUrl, slug },
        ]
      });

      this.router.navigateByUrl(`/${slug}`);
      return;
    } else {
      setTimeout(() => {
        this.isInvalid = true;
      }, 200);
    }
  }

  /**
   * Open demonstration cookbook
   */
  public openDemo() {
    this.form.get('repoUrl')?.setValue(this.demoCookbook);
    this.submit();
  }
}
