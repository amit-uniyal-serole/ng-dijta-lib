import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DxBreadcrumb } from './breadcrumb.model';

/**
 * Drives dynamic breadcrumb content for {@link DxBreadcrumbComponent}: replacing
 * `{{token}}` labels and pushing route-independent breadcrumb trails at runtime.
 */
@Injectable({
  providedIn: 'root',
})
export class DxBreadcrumbService {
  /** Latest map of `{{token}}` → value used to resolve non-route labels. */
  readonly breadcrumbLabels = new BehaviorSubject<Record<string, unknown>>({});

  /** Latest route-independent breadcrumb trail. */
  readonly newBreadcrumb = new BehaviorSubject<DxBreadcrumb[]>([]);

  /** Assign dynamic values for `{{token}}` placeholders in breadcrumb labels. */
  updateBreadcrumbLabels(labels: Record<string, unknown>): void {
    this.breadcrumbLabels.next(labels);
  }

  /** Push a breadcrumb trail not derived from route `data.breadcrumb`. */
  updateBreadcrumb(newBreadcrumb: DxBreadcrumb[]): void {
    this.newBreadcrumb.next(newBreadcrumb);
  }
}
