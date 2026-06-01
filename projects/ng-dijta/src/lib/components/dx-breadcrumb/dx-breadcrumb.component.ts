import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DxBreadcrumb } from './breadcrumb.model';
import { DxBreadcrumbService } from './dx-breadcrumb.service';

@Component({
  selector: 'dx-breadcrumb',
  templateUrl: './dx-breadcrumb.component.html',
  styleUrls: ['./dx-breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Material breadcrumb trail. Builds itself from the active route's
 * `data.breadcrumb` (with `:param` / `{{token}}` interpolation via
 * {@link DxBreadcrumbService}), or renders an explicit trail passed to `items`.
 * The last entry (or any entry with an empty `url`) is rendered as the current,
 * non-linked page.
 *
 * @example
 * ```html
 * <!-- explicit trail -->
 * <dx-breadcrumb [items]="[
 *   { label: 'Home', url: '/' },
 *   { label: 'Products', url: '/products' },
 *   { label: 'Laptops', url: '' }
 * ]"></dx-breadcrumb>
 *
 * <!-- route-driven: configure data.breadcrumb on the route -->
 * <dx-breadcrumb></dx-breadcrumb>
 * ```
 */
export class DxBreadcrumbComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(DxBreadcrumbService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Explicit breadcrumb trail. When set, route-derived breadcrumbs are ignored. */
  @Input()
  set items(value: DxBreadcrumb[] | null | undefined) {
    this._items = value ?? null;
    if (this._items) {
      this.breadcrumb = this._items;
      this.cdr.markForCheck();
    }
  }
  get items(): DxBreadcrumb[] | null {
    return this._items;
  }
  private _items: DxBreadcrumb[] | null = null;

  /** Horizontal alignment of the trail within its container. @default 'left' */
  @Input() align: 'left' | 'center' | 'right' = 'left';

  /** Material icon name used as the separator between items. @default 'chevron_right' */
  @Input() separatorIcon = 'chevron_right';

  /** Resolved trail rendered by the template. */
  breadcrumb: DxBreadcrumb[] = [];
  private params: { [key: string]: string } = {};

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === PRIMARY_OUTLET),
        takeUntilDestroyed(),
      )
      .subscribe(route => {
        if (this._items) {
          return;
        }
        this.params = route.snapshot.params;
        this.updateData(route, null);
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbLabels.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(labelData => {
      for (const label of Object.keys(labelData)) {
        this.breadcrumb.forEach(crumb => {
          const labelParams = crumb.label.match(/[^{{]+(?=\}})/g);
          if (labelParams) {
            for (const labelParam of labelParams) {
              if (labelParam === label) {
                crumb.label = crumb.label.replace(`{{${labelParam}}}`, String(labelData[label]));
              }
            }
          }
        });
      }
      this.cdr.markForCheck();
    });

    this.breadcrumbService.newBreadcrumb.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(breadcrumb => {
      if (breadcrumb.length > 0 && !this._items) {
        this.updateData(this.activatedRoute, breadcrumb);
        this.cdr.markForCheck();
      }
    });
  }

  private updateData(route: ActivatedRoute, newBreadcrumb: DxBreadcrumb[] | null): void {
    const source = route.snapshot.data['breadcrumb'] ?? newBreadcrumb;
    if (!source) {
      this.breadcrumb = [];
      return;
    }

    const breadcrumb: DxBreadcrumb[] = JSON.parse(JSON.stringify(source));
    breadcrumb.forEach(crumb => {
      for (const chunk of crumb.url.split('/')) {
        if (chunk.includes(':') && this.params) {
          const paramId = chunk.replace(':', '');
          const value = this.params[paramId];
          if (value !== undefined) {
            crumb.url = crumb.url.replace(`:${paramId}`, value);
          }
        }
      }

      const labelParams = crumb.label.match(/[^{{]+(?=\}})/g);
      if (labelParams) {
        for (const labelParam of labelParams) {
          const value = this.params?.[labelParam.trim()];
          if (value) {
            crumb.label = crumb.label.replace(`{{${labelParam}}}`, value);
          }
        }
      }
    });
    this.breadcrumb = breadcrumb;
  }
}
