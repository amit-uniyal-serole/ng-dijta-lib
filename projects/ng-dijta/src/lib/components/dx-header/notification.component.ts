import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Notifications, ReadNotification } from './header-model/model';

@Component({
  selector: 'dx-notification',
  template: `
         <div class="notification-header">
                      <div>
                        <h2 class="heading-6 mb-0">Notifications</h2>
                      </div>
                      <div [formGroup]="unReadToggleFg" class="d-flex align-items-center">
                        <label class="body mx-1">Only show unread</label>
                        <mat-slide-toggle formControlName="unread"></mat-slide-toggle>
                      </div>
                    </div>

                    <mat-tab-group #matTabGroup class="notification-tab" (selectedTabChange)="tabChanged($event)"
                      [(selectedIndex)]="notificationIndex" animationDuration="0ms">
                      <div>
                        <ng-container *ngFor="
                            let notificationData of topBarNotificationData;
                            let i = index
                          ">
                          <mat-tab [label]="notificationData?.groupName">
                            <div class="notification-wrapper">
                              <div class="notification-body">
                                <div class="
                                    d-flex
                                    justify-content-between
                                    mark-all-as-read-container
                                  " *ngIf="
                                    notificationData?.groupList?.length !== 0
                                  ">
                                  <!-- <div class="body fw-semibold">LATEST</div> -->
                                  <div *ngIf="unReadNotificationCount > 0" class="body fw-semibold"
                                    (click)="markAllAsRead()">
                                    Mark all as read
                                  </div>
                                </div>
                                <ng-container *ngFor="
                                    let notificationItem of notificationData?.groupList
                                  ">
                                  <div class="notification-item" *ngIf="
                                      notificationData?.groupList &&
                                      notificationData?.groupList.length > 0
                                    ">
                                    <div class="notification-container d-flex">
                                      <div class="header-avatar-container" *ngIf="notificationData?.showAvatar">
                                        <ndx-avatar [avatarSettings]="
                                            notificationSettings
                                          " [name]="
                                            notificationItem?.userName
                                              ? notificationItem?.userName
                                              : '-'
                                          ">
                                        </ndx-avatar>
                                      </div>
                                      <div class="notification-content w-100">
                                        <div class=" d-flex justify-content-between my-1 ">
                                          <div class="body fw-extrabold">
                                            {{ notificationItem?.userName }}
                                          </div>
                                          <div class="read-and-clear-block">
                                            <div (click)="
                                                readNotification(
                                                  notificationItem?.pkId,
                                                  notificationData?.groupName,
                                                  notificationItem?.isRead
                                                )
                                              " #tooltip="matTooltip" [matTooltip]="
                                                !notificationItem?.isRead
                                                  ? 'Mark as read'
                                                  : null
                                              " [ngClass]="
                                                notificationItem?.isRead
                                                  ? 'custom-radio-inactive'
                                                  : 'custom-radio-active'
                                              "></div>
                                          </div>
                                        </div>
                                        <p class="subbody mb-0" [innerHtml]="
                                            notificationItem?.notificationData  | dxsafe: 'html'
                                          "></p>
                                        <p class="notification-time paragraph mb-0">
                                          {{
                                          notificationItem?.notificationDate
                                          | dateAgo
                                          }}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </ng-container>
                                <!-- If No records -->
                                <div class="notification-emptylist d-flex" *ngIf="
                                    notificationData?.groupList?.length == 0 ||
                                    notificationData == undefined
                                  ">
                                  <div *ngIf="!(NotificationLoader$ | async)" class="no-records">
                                    No {{ notificationData?.groupName }}
                                  </div>
                                  
                                </div>
                                <!--  -->
                              </div>
                            </div>
                            <!-- show more button  -->
                            <footer id="showMore" layout="row" class="notification-footer">
                              <button  (click)="loadMore()"
                                *ngIf="notificationData?.groupList?.length > 0" mat-button class="show-more-btn w-100">
                                Show More
                              </button>
                          </footer>
                            <!--  -->
                          </mat-tab>
                        </ng-container>
                      </div>
                    </mat-tab-group>
    `
})
export class DxNotificationComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() topBarNotificationData!: Notifications | undefined;
  @Output() onReadNotification: EventEmitter<ReadNotification> =
    new EventEmitter<ReadNotification>();
  @Input() unReadNotificationCount: number = 1;
  @Output() onClickMarkAllasRead: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClickLoadMore: EventEmitter<void> = new EventEmitter<void>();

  copyNotifications: Notifications | undefined;
  notificationIndex = 0;
  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;
  @Output() onNotificationTabChange: EventEmitter<MatTabChangeEvent> =
    new EventEmitter<MatTabChangeEvent>();

  ngOnInit(): void {
    this.copyNotifications = this.topBarNotificationData;
    this.showUnread();
  }

  unReadToggleFg = new FormGroup({
    unread: new FormControl(false),
  });

  showUnread(): void {
    this.unReadToggleFg?.controls?.unread?.valueChanges?.subscribe(
      (data: boolean | null | undefined) => {

        if (data) {
          this.topBarNotificationData = this.topBarNotificationData?.map(
            (item) => {
              return {
                ...item,
                groupList: item.groupList?.filter((data) => !data.isRead),
              };
            }
          );
        } else {
          this.topBarNotificationData = this.copyNotifications;
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.copyNotifications = this.topBarNotificationData;
  }
  ngAfterViewInit(): void {
    if (this.matTabGroup) {
      this.matTabGroup.selectedIndex = this.notificationIndex;
    }
    setTimeout(() => {
      this.matTabGroup?.realignInkBar();
    }, 2000);
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.onNotificationTabChange.emit(tabChangeEvent);
  }
  markAllAsRead(): void {
    this.onClickMarkAllasRead.emit();
  }
  loadMore() {
    this.onClickLoadMore.emit();
  }

  readNotification(id: number, groupName: string, isRead: boolean): void {
    const payload: ReadNotification = {
      id: id,
      groupName: groupName,
      isRead: isRead,
    };
    this.onReadNotification.emit(payload);
  }
}