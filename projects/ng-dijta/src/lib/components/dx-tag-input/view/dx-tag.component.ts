import {
  Component,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Tag } from '../tag';
import { filter } from 'lodash';
@Component({
  selector: 'dx-tag',
  template: `
    <div class="dx-tag">
      <div class="dx-tag-view">
        <mat-chip-list cdkDropList>
          <mat-chip
            *ngFor="let tag of visibleTags"
            [changeChipColor]="tag.colorCode"
            [same]="true"
          >
            <div class="tag">
              <span class="material-icons-outlined tag-icon">
                tag
              </span>
              {{ tag.name }}
            </div>
          </mat-chip>
        </mat-chip-list>
        <div class="dx-tag-more" *ngIf="hiddenTags?.length">
            <p class="caption fw-bold paragraph-align" [matMenuTriggerFor]="tagMore">+ {{ hiddenTags?.length }}</p>
        </div>
        <mat-menu #tagMore="matMenu" class="dx-tag-content">
        <div class="dx-tag dx-tag-column">
            <mat-chip-list cdkDropList>
            <mat-chip
                *ngFor="let tag of hiddenTags"
                [changeChipColor]="tag.colorCode"
            >
                <div class="tag tag-column">
                <span class="material-icons-outlined tag-icon">
                    tag
                </span>
                {{ tag.name }}
                </div>
            </mat-chip>
            </mat-chip-list>
        </div>
        </mat-menu>
      </div>
    </div>
  `,
  styleUrls: ["./dx-tag.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DxTagComponent implements OnChanges {
  @Input() tags: Tag[] = [];
  visibleTags: Tag[] = [];
  hiddenTags: Tag[] = [];
  ngOnChanges(): void {
    this.visibleTags = filter(this.tags, (person: Tag, i: number) => i < 3);
    this.hiddenTags = filter(this.tags, (person: Tag, i: number) => i >= 3);
  }
}
