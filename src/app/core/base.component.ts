import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-base-component',
  template: '',
})
export class BaseAppComponent implements OnDestroy {
  protected destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor() {}

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
