import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeyValueModel } from '../../../core/UI/model/keyValue';
import { DxDrawerRef } from '../../dx-drawer';
import { Company } from '../header-model/model';
import { Profile, ProfileBasicAction } from '../header-model/profile';
import { NgDxAvatarSettings } from '../../dx-avatar/model/avatar';

@Component({
  selector: 'dx-profile',
  templateUrl: './dx-profile.component.html',
  styleUrls: ['./dx-profile.component.scss']
})
export class DxProfileComponent implements OnInit {
  avatarSettings: NgDxAvatarSettings = {
    size: 80,
    initialsSize: 2,
  };
  logoAvatarSettings: NgDxAvatarSettings = {
    size: 35,
    initialsSize: 2,
  };
  option: KeyValueModel[] = [
    {
      keyTt: 'compact',
      valueTt: 'Compact'
    },
    {
      keyTt: 'vertical',
      valueTt: 'Classic'
    },
    {
      keyTt: 'horizontal',
      valueTt: 'Enterprise'
    }
  ]
  @Input() profile!: Profile;
  @Output() onClickCompanyAction: EventEmitter<Company> =
    new EventEmitter<Company>();
  layoutType: FormControl = new FormControl('compact')
  selectedCompany: Company | undefined;
  constructor(
    private drawer: DxDrawerRef<DxProfileComponent, Profile>,
  ) { }

  ngOnInit(): void {
    if (this.profile?.profileBasic?.companyList) {
      this.selectedCompany = this.profile?.profileBasic?.companyList?.find(
        (item: Company) => item?.default
      );
    }
  }

  isCompListMoreThanOne(): boolean | undefined | number {
    return this.profile?.profileBasic?.companyList?.length &&
      this.profile?.profileBasic?.companyList?.length > 1
  }
  close(): void {
    this.drawer.close();
  }

  submitAction(action: ProfileBasicAction): void {

  }

  onLayoutChange(event: string): void {

  }

  onSelectCompany(event: Company): void {

  }



}
