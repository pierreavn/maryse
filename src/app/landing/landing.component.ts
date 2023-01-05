import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepoProvidersService } from '../core/repo-providers/repo-providers.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  form: FormGroup = new FormGroup({
    repoUrl: new FormControl('', [Validators.required]),
  });

  isInvalid = false;

  demoCookbook = 'https://github.com/pierreavn/recipes';

  constructor(private repoProvidersService: RepoProvidersService,
    private router: Router) {}

  /**
   * Go to the repository cookbook
   */
  public async submit() {
    this.isInvalid = false;
    const repoUrl = this.form.get('repoUrl')?.value;

    const slug = this.repoProvidersService.getSlugFromUrl(repoUrl);
    if (slug) {
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
