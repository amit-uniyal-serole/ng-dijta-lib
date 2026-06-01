import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'dx-email',
  templateUrl: './dx-email.component.html',
  styleUrls: ['./dx-email.component.scss'],
})
export class DxEmailComponent implements OnInit {
  @Input() emailsList!: any[];
  @Input() emailListType!: string;
  @Output() onClickMenu: EventEmitter<any> = new EventEmitter<any>();
  email: any;
  toggle: boolean = true;
  emailMenu!: HTMLElement | null;
  isMobileScreen: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.mobileScreenWidthChecker(screen.width);
    fromEvent(window, 'resize').subscribe((e: any) => {
      this.mobileScreenWidthChecker(e.target.innerWidth);
    });
  }
  mobileScreenWidthChecker(width: number) {
    if (width <= 767) {
      this.isMobileScreen = true;
    } else {
      this.isMobileScreen = false;
    }
  }
  menuItemClicked(event: any) {
    this.email = undefined;
    this.onClickMenu.emit(event);
  }
  selectedEmail(email: any) {
    this.email = email;
    // this.showAndHideEmailList();
  }
  showAndHideEmailList() {
    let emailList = document.getElementById('emailList');
    let detailView = document.getElementById('detailView');
    if (this.isMobileScreen) {
      if (emailList && detailView) {
        emailList.style.display = 'none';
        detailView.style.display = 'block';
      } else {
        if (emailList && detailView) {
          emailList.style.display = 'block';
          detailView.style.display = 'none';
        }
      }
    }
  }
  toggleMenu(event: boolean): void {
    this.toggle = event;
    // this.emailMenu = document.getElementById('emailMenu');
    // let backdrop: HTMLElement | null | any =
    //   document.getElementById('backdrop');
    // if (
    //   this.emailMenu?.style.display == 'none' ||
    //   this.emailMenu?.style.display == '' ||
    //   (this.emailMenu?.style.display == 'block' && this.toggle) ||
    //   this.emailMenu?.style.display == ''
    // ) {
    //   // this.emailMenu.style.transition = 'all';
    //   // this.emailMenu.style.transitionDuration = '0.5s';
    //   this.emailMenu.style.display = 'block';

    //   if (backdrop) {
    //     backdrop.style.display = 'block';
    //   }
    // } else {
    //   if (this.emailMenu) {
    //     // this.emailMenu.style.transition = 'all';
    //     // this.emailMenu.style.transitionDuration = '0.5s';
    //     this.emailMenu.style.display = 'none';

    //     if (backdrop) {
    //       backdrop.style.display = 'none';
    //     }
    //   }
    // }
  }
  newEmail(newEmail: any): void {
    this.emailsList.unshift(newEmail);
  }
}
