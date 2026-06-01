import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { TabContentDirective } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';

@Component({
  selector: 'd-tab',
  template: `<ng-template #innerContent><ng-content></ng-content></ng-template>`,
  preserveWhitespaces: false,
})
export class DxTabComponent {
  @Input() set tabId(value) {
    this.id = value;
  }
  @Input()
    id!: number | string;
  @Input()
    title!: string;
  @Input() disabled = false;
  @ContentChild(TabContentDirective)
    contentTpl!: TabContentDirective;
  @ContentChild(TabTitleDirective)
    titleTpl!: TabTitleDirective;
  @ViewChild('innerContent', { static: true })
    innerContent!: TemplateRef<any>;
  closeable!: boolean;
}