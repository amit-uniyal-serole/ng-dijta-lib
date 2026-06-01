import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'dx-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  @Input() title: any = 'Inbox';
  @Input() emailsList!: any[];
  @Output() selectedEmail: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  toogle: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  onClickEmail(email: any) {
    this.selectedEmail.emit(email);
  }
  onClickToggleMenu() {
    this.toogle = !this.toogle;
    this.toggleMenu.emit(this.toogle);
  }
}
