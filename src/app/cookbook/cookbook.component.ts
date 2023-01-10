import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseAppComponent } from '../core/base.component';
import { CookbookService } from '../core/services/cookbook/cookbook.service';
import { Repository } from '../core/services/repository/repository';
import { RepositoryService } from '../core/services/repository/repository.service';
import { CookbookInvalidReasons } from './cookbook.interfaces';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent extends BaseAppComponent implements OnInit, OnDestroy {
  constructor(private repositoryService: RepositoryService,
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
        const slug = `${params['repoProvider']}/${params['repoOwner']}/${params['repoName']}`;
        const url = this.repositoryService.getUrlFromSlug(slug);
        const repository = url ? this.repositoryService.getRepository(url, params['repoProvider']) : null;

        if (repository) {
          this.loadCookbook(`/${slug}`, repository);
        } else {
          this.invalidCookbook(CookbookInvalidReasons.REPO_SLUG);
        }
      });
  }

  /**
   * Load the cookbook with given repo provider
   * @param repoSlug
   */
  public async loadCookbook(cookbookHref: string, repository: Repository): Promise<void> {
    try {
      await this.cookbookService.init(cookbookHref, repository);
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
