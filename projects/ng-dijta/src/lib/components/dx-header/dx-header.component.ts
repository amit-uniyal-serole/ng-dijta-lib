import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateAgoPipe } from '../../utils';
import { NzBreakpointService, siderResponsiveMap } from '../../utils/types/breakpoint';
import { NgDxAvatarSettings } from '../dx-avatar/model/avatar';
import { DxDrawerService } from '../dx-drawer';
import { LayoutServiceService } from '../dx-layout';
import { DxProfileComponent } from './dx-profile/dx-profile.component';
import {
  Company,
  CompanyInfo,
  HeaderIcons,
  Notifications,
  ReadNotification
} from './header-model/model';
import { Profile, ProfileBasicAction } from './header-model/profile';
import { AppConfig, DxHeaderService } from './service/dx-header.service';

@Component({
  selector: 'dx-header',
  templateUrl: './dx-header.component.html',
  providers: [DateAgoPipe],
})
export class DxHeaderComponent implements OnChanges, OnInit {

  @ViewChild('t') languageMenuTrigger!: MatMenuTrigger;
  @Input() companyInfo!: CompanyInfo;
  @Input() topBarNotificationData!: Notifications | undefined;
  @Input() headerIcons!: HeaderIcons[];
  @Input() currentUser!: Profile;
  @Input() latestNotificationCount: number = 0;
  @Input() unReadNotificationCount: number = 1;
  @Output() onClickProfileMenu: EventEmitter<ProfileBasicAction> =
    new EventEmitter<ProfileBasicAction>();
  @Output() onClickIcons: EventEmitter<string> = new EventEmitter<string>();
  @Output() onOpenNotificationMenu: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onCloseNotificationMenu: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onClickMarkAllasRead: EventEmitter<void> = new EventEmitter<void>();
  @Output() onNotificationTabChange: EventEmitter<MatTabChangeEvent> =
    new EventEmitter<MatTabChangeEvent>();
  @Output() onReadNotification: EventEmitter<ReadNotification> =
    new EventEmitter<ReadNotification>();
  @Output() onClickLoadMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClickCompanyAction: EventEmitter<Company> =
    new EventEmitter<Company>();

  @Input() isNewNotification = false;

  @Input() notification = false;

  @Output() onLayoutChange: EventEmitter<string> =
    new EventEmitter<string>();

  app$: Observable<AppConfig | null> = of(null)
  constructor(
    private readonly dxDrawerService: DxDrawerService,
    private readonly breakpointService: NzBreakpointService,
    private readonly dxHeaderService: DxHeaderService) { }
  ngOnInit(): void {
    this.getSmSize();
    this.app$ = this.dxHeaderService.appSub;
  }


  avatarSettings: NgDxAvatarSettings = {
    size: 40,
    initialsSize: 2,
    bgColor: '#818589',
  };

  appSettings: NgDxAvatarSettings = {
    size: 40,
    initialsSize: 2,
    bgColor: '#184a7c',
    round: false
  };

  isSmall$!: Observable<boolean>;
  selectedCompany!: Company | any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.companyInfo?.previousValue !== changes?.companyInfo?.currentValue) {
      this.selectedCompany = this.companyInfo?.companyList?.find(
        (item: Company) => item?.default
      );
    }
    if (changes?.currentUser?.previousValue != changes?.currentUser?.currentValue) {
      this.currentUser = this.currentUser
    }
  }

  getUserName(): string {
    return this.currentUser?.profileBasic?.name ?? '';
  }

  matMenuTrigger(d: boolean): void {
    this.onOpenNotificationMenu.emit(d);
  }
  isClosed(): void {
    this.onCloseNotificationMenu.emit(true);
  }
  markAllAsRead(): void {
    this.onClickMarkAllasRead.emit();
  }
  loadMore() {
    this.onClickLoadMore.emit();
  }




  onClickIcon(event: string): void {
    this.onClickIcons.emit(event);
  }

  onSelectCompany(event: Company): void {
    this.onClickCompanyAction.emit(event);
  }
  readNotification(event: ReadNotification): void {
    this.onReadNotification.emit(event);
  }

  showProfile(): void {
    const ref = this.dxDrawerService.create({
      dxContent: DxProfileComponent,
      dxClosable: false,
      dxWrapClassName: 'dx-profile-drawer',
      dxContentParams: {
        profile: this.currentUser,
        layoutType: signal<FormControl>(new FormControl(this.currentUser.profileBasic.layoutType ?? 'compact')),
        submitAction: (action: ProfileBasicAction) => {
          this.onClickProfileMenu.emit(action);
          if (!action?.isNotClose) {
            ref.close()
          }
        },
        onLayoutChange: (event: string) => {
          this.onLayoutChange.emit(event)
        },
        onSelectCompany: (event: Company) => {
          this.onClickCompanyAction.emit(event);
          ref.close();
        }
      }
    })
  }
  private getSmSize(): void {
    this.isSmall$ = this.breakpointService
      .subscribe(siderResponsiveMap, true)
      .pipe(
        map(val => !val.xs)
      )
  }
}
