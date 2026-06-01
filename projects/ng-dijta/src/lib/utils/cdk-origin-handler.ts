import { ElementRef } from '@angular/core';

export function formWithDropDown(ele: ElementRef): ElementRef['nativeElement'] {
  if (ele) {
    if (!ele.nativeElement.classList.contains('dx-dropdown-origin')) {
      const parentEle = ele.nativeElement.parentElement;
      if (parentEle && parentEle.classList.contains('dx-dropdown-origin')) {
        return ele.nativeElement.parentElement;
      } else {
        return;
      }
    } else {
      return ele.nativeElement;
    }
  }
}

export function addClassToOrigin(ele: ElementRef): void {
  const originEle = formWithDropDown(ele);
  if (originEle && !originEle.classList.contains('dx-dropdown-origin-open')) {
    originEle.classList.add('dx-dropdown-origin-open');
  }
}

export function removeClassFromOrigin(ele: ElementRef): void {
  const originEle = formWithDropDown(ele);
  if (originEle && originEle.classList.contains('dx-dropdown-origin-open')) {
    originEle.classList.remove('dx-dropdown-origin-open');
  }
}
