import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxEmailComponent } from './dx-email/dx-email.component';
import { EmailMenuComponent } from './email-menu/email-menu.component';
import { EmailListComponent } from './email-list/email-list.component';

import { EmailDetailViewComponent } from './email-detail-view/email-detail-view.component';
import { DxTitleModule } from '../dx-title/dx-title.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmailComposeComponent } from './email-compose/email-compose.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DxInputModule } from '../dx-input';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailListTableViewComponent } from './email-list-table-view/email-list-table-view.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { DxDirectiveModule } from '../../directive';
@NgModule({
    declarations: [
        DxEmailComponent,
        EmailMenuComponent,
        EmailListComponent,
        EmailDetailViewComponent,
        EmailDetailViewComponent,
        EmailComposeComponent,
        EmailListTableViewComponent,
    ],
    imports: [
        CommonModule,
        DxTitleModule,
        MatPaginatorModule,
        MatDialogModule,
        DxInputModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTableModule,
        DxDirectiveModule
    ],
    exports: [
        DxEmailComponent,
        EmailMenuComponent,
        EmailListComponent,
        EmailDetailViewComponent,
        EmailDetailViewComponent,
        EmailComposeComponent,
        EmailListTableViewComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DxEmailModule { }
