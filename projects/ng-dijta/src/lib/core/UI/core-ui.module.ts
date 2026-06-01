import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@jsverse/transloco';
import { DateComponent } from '../../core/UI/core/date/date.component';
import { ProfileComponent } from '../../core/UI/core/profile/profile.component';
import { DateAgoPipe } from '../../utils/pipe/date-ago.pipe';
import { DefaultFormatComponent } from './service/default-format/default-format.component';
import { GenericService } from './service/generic-service/generic-service.service';
import { TableCellDataService } from './service/table-cell-data/table-cell-data.service';
import { TableContextMenuDataService } from './service/table-context-menu-data/table-context-menu-data.service';
import { DxAvatarModule } from '../../components/dx-avatar';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatTooltipModule,
    ClipboardModule,
    TranslocoModule,
    DxAvatarModule
  ],
  declarations: [
    DateComponent,
    ProfileComponent,
    DateAgoPipe,
    DefaultFormatComponent
  ],
  exports: [
    DateComponent,
    ProfileComponent,
    DateAgoPipe,
    DxAvatarModule
  ],
  providers: [
    GenericService,
    TableCellDataService,
    TableContextMenuDataService,
  ]
})
export class CoreUiModule { }
