import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@jsverse/transloco';
import { DxPopoverModule } from '../dx-popover/popover.module';
import { DxAvatarGroupComponent } from './components/dx-avatar-group.component';
import { DxAvatarComponent } from './dx-avatar.component';
import { SourceFactory } from './model/source.factory';
import { AvatarConfigService } from './service/avatar-config.service';
import { AvatarService } from './service/avatar.service';
import { MatIconModule } from '@angular/material/icon';
import { ImagePreviewModule } from '../image-preview';
@NgModule({
  declarations: [DxAvatarComponent, DxAvatarGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslocoModule,
    DxPopoverModule,
    MatMenuModule,
    MatIconModule,
    ImagePreviewModule
  ],
  exports: [DxAvatarComponent, DxAvatarGroupComponent],
  providers: [
    SourceFactory,
    AvatarService,
    AvatarConfigService,
  ]
})
export class DxAvatarModule { }
