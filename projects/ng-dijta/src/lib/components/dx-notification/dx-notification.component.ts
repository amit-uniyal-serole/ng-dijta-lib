import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dx-notifications',
  templateUrl: './dx-notification.component.html',
  styleUrls: ['./dx-notification.component.scss']
})
export class DxNotificationsComponent {
  @Output() onLoadMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() onMarkAllAsRead: EventEmitter<void> = new EventEmitter<void>();
  @Output() onShowAllAsRead: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleAllAsRead: boolean = false;

  loadMore(): void {
    this.onLoadMore.emit();
  }
  markAsRead(): void {
    this.onMarkAllAsRead.emit();
  }
  showUnread(): void {
    this.onShowAllAsRead.emit(this.toggleAllAsRead);
  }
}
