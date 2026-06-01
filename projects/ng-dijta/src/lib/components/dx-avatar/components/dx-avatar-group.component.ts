import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Avatar, AvatarSetting, NgDxAvatarSettings } from '../model/avatar';

@Component({
  selector: 'dx-avatar-group',
  templateUrl: './dx-avatar-group.component.html',
  styleUrls: ['./dx-avatar-group.component.scss']
})
export class DxAvatarGroupComponent {
  @ViewChild('languageMenuTrigger') languageMenuTrigger!: MatMenuTrigger;
  @Input()
  setting!: AvatarSetting;
  @Input()
  avatarSettings!: NgDxAvatarSettings;
  displayedAvatar: Avatar[] | undefined = [];
  extraAvatar: Avatar[] | undefined = [];
  extraTotal!: Avatar;
  private _allAvatar: Avatar[] | undefined = []

  @Input()
  set data(list: Avatar[] | undefined) {
    this._allAvatar = list;
    this.updateAvatar();
  }


  get avatars(): Avatar[] | undefined {
    return this._allAvatar;
  }

  updateAvatar(): void {
    if (this.avatars && this.avatars.length > 0) {
      this.displayedAvatar = this.avatars.filter((_avatar, i) => i < 3).map((avatar: Avatar) => avatar);
      this.extraAvatar = this.avatars.filter((_avatar, i) => i >= 3).map((avatar: Avatar) => avatar);
      if (this.extraAvatar?.length > 0) {
        this.extraTotal = {
          ...this.extraTotal,
          shortName: `+ ${this.extraAvatar?.length}`
        }
      }
    }
  }

  showMore(): void {
    this.languageMenuTrigger.openMenu();
  }

}
