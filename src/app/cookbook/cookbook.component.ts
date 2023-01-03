import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from '../core/base.component';
import { RepoFileLoader } from '../core/repo-providers/repo-providers.interfaces';
import { RepoProvidersService } from '../core/repo-providers/repo-providers.service';
import { CookbookInvalidReasons } from './cookbook.interfaces';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent extends BaseAppComponent implements OnInit {
  constructor(private repoProvidersService: RepoProvidersService,
    private route: ActivatedRoute) {
    super();
  }

  loading = true;

  invalidReason?: CookbookInvalidReasons;

  public ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        const repoFileLoader = this.repoProvidersService.getFileLoader(
          params['repoProvider'],
          [
            params['repoOwner'],
            ...params['repoName'].split(this.repoProvidersService.slugDelimiter),
          ],
        )

        if (repoFileLoader) {
          this.loadCookbook(repoFileLoader);
        } else {
          this.invalidCookbook(CookbookInvalidReasons.REPO_SLUG);
        }
      });
  }

  /**
   * Load the cookbook
   * @param repoSlug
   */
  public async loadCookbook(repoFileLoader: RepoFileLoader): Promise<void> {
    // TODO:
    if (!await repoFileLoader('README.md')) {
      this.invalidCookbook(CookbookInvalidReasons.REPO_SLUG);
      return;
    }

    this.loading = false;
  }

  /**
   * Display cookbook as invalid
   */
  protected invalidCookbook(reason: CookbookInvalidReasons): void {
    this.invalidReason = reason;
    this.loading = false;
  }
}
