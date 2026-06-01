import { Component, Input, OnInit } from '@angular/core';
import { DxDetailsCardContent } from '../../model/dx-details-card.model';
@Component({
  selector: 'dx-card-url',
  template: `
  <ng-container *ngIf="data?.link;else old_url">
    <dx-card-text [link]="data.link"></dx-card-text>
  </ng-container>
  <ng-template #old_url>
  <a
    dx-tooltip
    dxTooltipTitle="{{ data?.value | transloco }}"
    class="dx-card-url"
    [href]="url"
    target="{{ target }}"
    >
    <div class="dx-details-card-url-value">
      {{ data?.value | transloco }}
    </div>
  </a>
  </ng-template>
  `,
  styles: [
    `
      .dx-card-url {
        color: #0d6efdd6;
      }
      .dx-details-card-url-value {
        flex: 0 0 32%;
        width: auto;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 21px;
      }
    `,
  ],
})
export class DxCardUrlComponent implements OnInit {
  @Input() data!: DxDetailsCardContent;
  url: string = '_blank';
  target: string = '';
  constructor() {}

  ngOnInit(): void {
    this.url = this.data?.params?.url ?? this.data?.value;
    this.target = this.data?.params?.newTab ? '_blank' : '_self';
  }
}
