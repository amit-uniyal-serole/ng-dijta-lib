import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DxEmail } from '../data/dx-email.constant';
import { EmailComposeComponent } from '../email-compose/email-compose.component';
@Component({
  selector: 'dx-email-menu',
  templateUrl: './email-menu.component.html',
  styleUrls: ['./email-menu.component.scss'],
})
export class EmailMenuComponent implements OnInit {
  @Input() title: string = 'Mailbox';
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  mailMenu = DxEmail.MailMenu;

  emailList!: {
    from: string;
    date: string;
    subject: string;
    content: string;
  }[];
  @Output() menuItemClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() newEmail: EventEmitter<string> = new EventEmitter<string>();
  email: any;
  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void { }
  onClickMenu(menuItem: any) {
    this.menuItemClicked.emit(menuItem);
  }
  iconColor(item: any) {
    const styles = {
      color: item.color,
    };
    return styles;
  }
  composeEmail() {
    const dialogRef = this.dialog.open(EmailComposeComponent, {
      panelClass: 'email-compose-container',
    });

    dialogRef.afterClosed().subscribe((newEmail) => {
      if (newEmail) {
        this.email = newEmail;
        this.newEmail.emit(this.email);
      }
    });
  }
  onClickToggleMenu() {
    this.toggleMenu.emit(false);
  }
}
