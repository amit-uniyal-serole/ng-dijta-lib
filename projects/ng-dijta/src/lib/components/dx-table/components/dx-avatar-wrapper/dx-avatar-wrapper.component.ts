import { Component, Input } from '@angular/core';
import { DxAvatar } from '../../../dx-avatar/dx-avatar';
import { DxAddition } from '../../interfaces/dx-additional.interface';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { DxTableNgDxAvatar } from '../../../dx-avatar/model/avatar';
@Component({
  selector: 'dx-avatar-wrapper',
  templateUrl: './dx-avatar-wrapper.component.html',
  styleUrls: ['./dx-avatar-wrapper.component.css']
})
export class DxAvatarWrapperComponent<T extends DxAddition> {
  @Input() column!: DxTableColumn<T>;
  @Input() data!: DxTableNgDxAvatar;
  info: DxAvatar[] = []
}
