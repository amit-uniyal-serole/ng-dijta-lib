import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, of, } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateAgoPipe } from '../../utils';
import { NzBreakpointService, siderResponsiveMap } from '../../utils/types/breakpoint';
import { DxDrawerService } from '../dx-drawer';
import { LayoutServiceService } from '../dx-layout';
import { DefaultCompany } from './company-logo';
import { DxProfileComponent } from './dx-profile/dx-profile.component';
import {
  Company,
  CompanyInfo,
  HeaderIcons,
  Notifications,
  ProfileMenuDropdown,
  ReadNotification,
  TopBarSettings,
} from './header-model/model';
import { Profile, ProfileBasicAction } from './header-model/profile';
import { MatMenuTrigger } from '@angular/material/menu';
import { NgDxAvatarSettings } from '../dx-avatar/model/avatar';
import { AppConfig, DxHeaderService } from './service/dx-header.service';

@Component({
  selector: 'dx-header',
  templateUrl: './dx-header.component.html',
  styleUrls: ['./dx-header.component.scss'],
  providers: [DateAgoPipe],
})
export class DxHeaderComponent implements OnChanges, OnInit {
  @ViewChild('t') languageMenuTrigger!: MatMenuTrigger;
  @Input() isBusy$!: Observable<boolean>;
  @Input() companyInfo!: CompanyInfo;
  @Input() topBarNotificationData!: Notifications | undefined;
  @Input() headerIcons!: HeaderIcons[];
  @Input() currentUser!: Profile;
  @Input() latestNotificationCount: number = 0;
  @Input() unReadNotificationCount: number = 1;
  @Input() profileMenuDropdown!: ProfileMenuDropdown[];
  @Input() showApplicationsIcon!: boolean;
  @Output() onClickProfileMenu: EventEmitter<ProfileBasicAction> =
    new EventEmitter<ProfileBasicAction>();
  @Output() onClickIcons: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSearchValueChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() onSearchBarClose: EventEmitter<void> = new EventEmitter<void>();
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

  @Output() onLayoutChange: EventEmitter<string> =
    new EventEmitter<string>();

  @Input() topBarSettings: TopBarSettings = {
    isSearchVisible: true,
    isCompanyVisible: true,
    isMenuVisible: false,
    isNotificationVisible: true,
    isProfileVisible: true,
  };
  toggled: boolean = false;
  app$: Observable<AppConfig | null> = of(null)
  constructor(
    private readonly dxDrawerService: DxDrawerService,
    private readonly breakpointService: NzBreakpointService,
    private readonly layoutServiceService: LayoutServiceService,
    private readonly dxHeaderService: DxHeaderService) { }
  ngOnInit(): void {
    this.getSmSize();
    this.app$ = this.dxHeaderService.appSub;
  }

  toggleMenu(): void {
    this.toggled = !this.toggled;
    this.layoutServiceService.onMenuChange(this.toggled)
  }

  @Input() topBarCompanyData: any[] = [];
  defaultLogo: string = DefaultCompany.logo;
  avatarSettings: NgDxAvatarSettings = {
    size: 40,
    initialsSize: 2,
    bgColor: '#818589',
  };
  appSettings: NgDxAvatarSettings = {
    size: 40,
    initialsSize: 5,
    bgColor: '#11467a',
    round: false
  };
  logoAvatarSettings: NgDxAvatarSettings = {
    size: 35,
    initialsSize: 2,
  };
  notificationSettings: NgDxAvatarSettings = {
    size: 35,
    initialsSize: 2,
  };
  NotificationLoader$!: Observable<boolean>;
  isSmall$!: Observable<boolean>;

  isSearchFormVisible: boolean = false;
  searchForm: FormGroup = new FormGroup({
    searchField: new FormControl(),
  });

  isNotificationMenuOpened!: boolean;
  initialNotifyTrigger: any = 0;
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
  closeNotification(): void {
    this.languageMenuTrigger.closeMenu();
  }
  // show or hide search form
  showSearchForm(): void {
    this.searchForm.reset();
    const search: HTMLElement | null = document?.getElementById('searchField');
    if (search != null) {
      setTimeout(() => search?.focus(), 0);
    }
    this.isSearchFormVisible = !this.isSearchFormVisible;
    if (!this.isSearchFormVisible) {
      this.onSearchBarClose?.emit();
    }
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
  onSearchInputChange(event: Event): void {
    const target: HTMLInputElement = event?.target as HTMLInputElement;
    this.onSearchValueChange?.emit(target?.value);
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
        layoutType: new FormControl(this.currentUser.profileBasic.layoutType ?? 'compact'),
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
