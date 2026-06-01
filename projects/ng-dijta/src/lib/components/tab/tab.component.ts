import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgxTabContentDirective } from './tab-content.directive';
import { NgxTabTitleDirective } from './tab-title.directive';

@Component({
  selector: 'd-tab:not(p)',
  template: `<ng-template #innerContent><ng-content></ng-content></ng-template>`,
  preserveWhitespaces: false,
})
export class NgxTabComponent {
  @Input() set tabId(value) {
    this.id = value;
  }
  @Input()
    id!: number | string;
  @Input()
    title!: string;
  @Input() disabled = false;
  @ContentChild(NgxTabContentDirective)
    contentTpl!: NgxTabContentDirective;
  @ContentChild(NgxTabTitleDirective)
    titleTpl!: NgxTabTitleDirective;
  @ViewChild('innerContent', { static: true })
    innerContent!: TemplateRef<any>;
  closeable!: boolean;
}