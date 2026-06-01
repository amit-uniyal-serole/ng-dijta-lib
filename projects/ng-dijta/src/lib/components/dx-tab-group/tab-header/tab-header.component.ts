import { Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dx-tab-header',
  template: `
  <ng-template>
    <div class="tab" [class]="tabView">
      <mat-icon *ngIf="icon">
      {{icon}}
      </mat-icon>
      {{title}}
      <ng-content></ng-content>
    </div>
  </ng-template>
  `,
  styleUrls: ['./tab-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabHeaderComponent {
  @ViewChild(TemplateRef) public headerTemplate!: TemplateRef<any>;
  @Input() title: string = '';
  @Input() icon: string | undefined = undefined;
  @Input() tabView: 'top_bottom' | 'line_border_flat_icon' = 'line_border_flat_icon';
  @Input() data: any;

}
