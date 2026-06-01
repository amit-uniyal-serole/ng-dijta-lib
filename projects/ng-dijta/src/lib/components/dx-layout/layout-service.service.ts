import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type LAYOUT_TYPE = 'vertical' | 'horizontal' | 'compact';
@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {
  private layoutType = new BehaviorSubject<string>('compact');
  currentLayout = this.layoutType.asObservable();

  private menuToggle = new BehaviorSubject<boolean>(false);
  onMenuToggle = this.menuToggle.asObservable();

  private hideSideBar = new BehaviorSubject<boolean>(false);
  onHideSideBar = this.hideSideBar.asObservable();

  changeLayout(type: LAYOUT_TYPE) {
    this.layoutType.next(type)
  }

  onMenuChange(val: boolean): void {
    this.menuToggle.next(val);
  }

  onHideSideBarChange(val: boolean): void {
    this.hideSideBar.next(val);
  }
}
