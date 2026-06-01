import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DxEmail } from '../data/dx-email.constant';
import { Mailbox } from './images/mail-box';
@Component({
  selector: 'dx-email-detail-view',
  templateUrl: './email-detail-view.component.html',
  styleUrls: ['./email-detail-view.component.scss'],
})
export class EmailDetailViewComponent implements OnInit {
  @Input() email: any;
  reply: boolean = false;
  noMails: boolean = false;
  menu = DxEmail.DETAIL_VIEW_MENU;
  Labels: any = DxEmail.LABELS
  QuillConfigModel = DxEmail.QuillConfig
  styles = {
    height: '120px',
  };
  maiBoxImg = `${'data:image/png;base64,' + Mailbox.mailBoxImage}`
  constructor(@Inject(DomSanitizer) private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.email?.body) {
      this.email.body = this.sanitizer.bypassSecurityTrustHtml(
        this.email?.body
      );
    }
  }
  bgClr(item: any) {
    const styles = {
      color: item.color,
      background: item.color + '39',
    };
    return styles;
  }

  emailAction() {
    this.reply = !this.reply;
  }
  backToList() {
    let emailList = document.getElementById('emailList');
    let detailView = document.getElementById('detailView');

    if (emailList && detailView) {
      emailList.style.display = 'block';
      detailView.style.display = 'none';
    } else {
      if (emailList && detailView) {
        emailList.style.display = 'none';
        detailView.style.display = 'block';
      }
    }
  }
  onTopBarMenuClick(menuKey: string) {
    if (menuKey == 'important') {
      this.email.isImportant = !this.email.isImportant
    }
  }
  onMenuItemClick(menuKey: string) {
    if (menuKey) {
    }
  }
}
