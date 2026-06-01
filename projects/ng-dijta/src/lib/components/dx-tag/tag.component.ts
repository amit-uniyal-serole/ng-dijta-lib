import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export type ITagMode = 'default' | 'checkable' | 'closeable';

@Component({
  selector: 'd-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  exportAs: 'Tag',
  preserveWhitespaces: false,
})
export class TagComponent implements OnChanges {
  @Input() tag: any;
  @Input() labelStyle = '';
  @Input() customColor = '';
  // @deprecated
  @Input() deletable = false;
  @Input() titleContent!: string;
  @Input() mode: ITagMode = 'default';
  @Input() checked = false;
  @Input() maxWidth;
  @Input() customViewTemplate!: TemplateRef<any>;
  @Input() beforeDelete!: (tag?: any) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() tagDelete = new EventEmitter<any>();
  @Output() checkedChange = new EventEmitter<boolean>();

  currentTag!: string;
  deleteTag = false;
  colorMap = {
    'blue-w98': '#3383ff',
    'aqua-w98': '#39afcc',
    'olivine-w98': '#2fa898',
    'green-w98': '#4eb15e',
    'yellow-w98': '#b08d1a',
    'orange-w98': '#d47f35',
    'red-w98': '#f66f6a',
    'pink-w98': '#f3689a',
    'purple-w98': '#a97af8',
  };

  get isColorfulTag(): boolean {
    return !!(this.colorMap[this.labelStyle] || (this.customColor && this.customColor !== ''));
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { tag } = changes;
    if (tag) {
      this.currentTag = typeof this.tag === 'string' ? this.tag : '';
    }
  }

  removeTag($event, tag) {
    this.canDeleteTag(tag).then((canDelete) => {
      if (!canDelete) {
        return;
      }
      this.deleteTag = true;
      this.tagDelete.emit({ tag: tag, event: $event });
    });
  }

  tagClick() {
    if (this.mode === 'checkable') {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }

  canDeleteTag(tag) {
    let changeResult = Promise.resolve(true);
  
    if (this.beforeDelete) {
      const result: any = this.beforeDelete(tag);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result.then((res: boolean | undefined) => res ?? true);
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise().then((res: boolean | undefined) => res ?? true);
        } else {
          changeResult = Promise.resolve(result !== undefined ? result : true);
        }
      }
    }
  
    return changeResult;
  }

}
