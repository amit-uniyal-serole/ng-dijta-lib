import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Output, Input, EventEmitter, OnChanges, HostListener, HostBinding } from '@angular/core';
import { DxNotification } from '../model/notification-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { DxDateService } from '../../dx-datepicker';


@Component({
  selector: 'dx-notification-item',
  templateUrl: './dx-notification-item.component.html',
  styleUrls: ['./dx-notification-item.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '100px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('250ms ease-in-out')),
    ])
  ]
})
export class DxNotificationItemComponent implements OnChanges {
  @Output() onMarkRead: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  isExpanded = false;
  @Input() data: DxNotification | undefined;
  @Input() url!: string;
  isChecked = false;
  responseType: string = 'text';
  @HostListener("click", ['$event'])
  clicked(event: Event) {
    if (event.target instanceof HTMLAnchorElement) {
      this.onClose.emit()
    }
  }

  static nextId = 0;
  @HostBinding()
  id = `dx-notification-item-${DxNotificationItemComponent.nextId++}`;

  constructor(
    private readonly http: HttpClient,
    private readonly dxDateService: DxDateService
  ) { }
  ngOnChanges(): void {
    if (this.data?.date) {
      this.data = {
        ...this.data,
        date: this.dxDateService.getTimeToNow(this.data?.date)
      };
    }
  }

  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }

  async markMessageAsRead() {
    if (!this.data?.isRead) {
      this.onMarkMessageAsRead().pipe(
        filter((val) => !!val),
        first()
      ).subscribe((_val) => {
        this.onMarkRead.emit();
        this.data = {
          ...this.data,
          isRead: true
        };
      });
    }
  }

  private onMarkMessageAsRead(): Observable<any> {
    return this.http.post(this.url, [this.data?.pkId], { responseType: 'text' });
  }

}
