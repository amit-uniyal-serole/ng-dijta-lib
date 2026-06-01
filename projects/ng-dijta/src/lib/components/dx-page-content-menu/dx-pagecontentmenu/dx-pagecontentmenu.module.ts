import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DxPageContentMenuComponent } from '../dx-page-content-menu.component';
import { DxContentMenuAccrodianComponent } from '../dx-content-menu-accrodian.component';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [DxPageContentMenuComponent, DxContentMenuAccrodianComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    RouterModule,
    TranslocoModule
  ],
  exports: [DxPageContentMenuComponent],

})
export class DxpagecontentmenuModule { }
