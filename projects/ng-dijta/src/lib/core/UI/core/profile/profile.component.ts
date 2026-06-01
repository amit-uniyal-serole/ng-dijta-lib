import { Component, Input, OnInit } from '@angular/core';
import { AvatarUtils } from '../../../../utils/avatar/avatar.utils';
import { Avatar } from '../../../../components/dx-avatar/model/avatar';

@Component({
  selector: 'dx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input()
  data!: Avatar;

  avatar!: Avatar;

  ngOnInit(): void {
    if (this.data) {
      this.avatar = {
        ...this.data,
        shortName: AvatarUtils.getInitials(this.data?.avatarName!)
      };
    }
  }

}
