import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { Tag } from '../tag';
import { filter } from 'lodash';
@Component({
  selector: 'dx-tag',
  template: `
    <div class="dx-tag">
      <div class="dx-tag-view gap-2">
        <div
          class="badge border px-3 rounded-pill"
          *ngFor="let tag of visibleTags"
          [changeChipColor]="tag.colorCode"
          [onlyBorder]="true"
        >
          <div class="tag gap-1">
            <mat-icon
              aria-hidden="false"
              aria-label="tag"
              fontIcon="local_offer"
            ></mat-icon>
            <p class="paragraph mb-0">
              {{ tag.name }}
            </p>
          </div>
        </div>
        <div class="dx-tag-more badge border p-2 rounded-pill" *ngIf="hiddenTags?.length" [matMenuTriggerFor]="tagMore">
          <p
            class="caption text-body fw-bold paragraph-align"
            
          >
            + {{ hiddenTags?.length }}
          </p>
        </div>
        <mat-menu #tagMore="matMenu" class="dx-tag-content">
          <div class="dx-tag p-2 d-flex gap-2 flex-column">
            <div
              class="badge px-2 py-1 border d-flex gap-2 rounded-pill"
              *ngFor="let tag of hiddenTags"
              [changeChipColor]="tag.colorCode"
              [onlyBorder]="true"
            >
              <div class="tag d-flex px-2 gap-1">
                <mat-icon
                  aria-hidden="false"
                  aria-label="tag"
                  fontIcon="local_offer"
                ></mat-icon>
                <p class="subbody mb-0">
                  {{ tag.name }}
                </p>
              </div>
            </div>
          </div>
        </mat-menu>
      </div>
    </div>
  `,
  styleUrls: ['./dx-tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DxTagComponent implements OnChanges {
  @Input() tags: Tag[] = [];
  visibleTags: Tag[] = [];
  hiddenTags: Tag[] = [];
  ngOnChanges(): void {
    this.visibleTags = filter(this.tags, (person: Tag, i: number) => i < 2);
    this.hiddenTags = filter(this.tags, (person: Tag, i: number) => i >= 2);
  }
}
