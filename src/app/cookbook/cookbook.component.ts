import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from '../core/base.component';
import { RepoFileLoader } from '../core/repo-providers/repo-providers.interfaces';
import { RepoProvidersService } from '../core/repo-providers/repo-providers.service';
import { CookbookService } from '../core/services/cookbook/cookbook.service';
import { CookbookInvalidReasons } from './cookbook.interfaces';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent extends BaseAppComponent implements OnInit, OnDestroy {
  constructor(private repoProvidersService: RepoProvidersService,
    private cookbookService: CookbookService,
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
        );

        const href = `/${params['repoProvider']}/${params['repoOwner']}/${params['repoName']}`;

        if (repoFileLoader) {
          this.loadCookbook(href, repoFileLoader);
        } else {
          this.invalidCookbook(CookbookInvalidReasons.REPO_SLUG);
        }
      });
  }

  /**
   * Load the cookbook
   * @param repoSlug
   */
  public async loadCookbook(href: string, repoFileLoader: RepoFileLoader): Promise<void> {
    try {
      await this.cookbookService.init(href, repoFileLoader);
    } catch (error) {
      this.invalidCookbook(CookbookInvalidReasons.COOKBOOK_FORMAT);
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

  /**
   * Destroy cookbook
   */
  public override ngOnDestroy(): void {
    this.cookbookService.reset();
    super.ngOnDestroy();
  }
}
