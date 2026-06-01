import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogService } from './dialog.service';
import { ModalContainerComponent } from './modal-container.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalComponent } from './modal.component';
import { ModalContainerDirective, ModalContentDirective } from './modal.directive';
import { ModalService } from './modal.service';
import { MovableDirective } from './movable.directive';
import { DocumentRef } from '../../core/window-ref';
import { OverlayContainerModule } from '../../core/overlay-container';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, OverlayContainerModule, ScrollingModule, TranslocoModule],
  declarations: [
    ModalComponent,
    ModalContainerComponent,
    ModalContainerDirective,
    ModalContentDirective,
    ModalHeaderComponent,
    ModalFooterComponent,
    MovableDirective
  ],
  exports: [ModalComponent, ModalContainerComponent, ModalHeaderComponent, ModalFooterComponent, MovableDirective],
  providers: [ModalService, DialogService, DocumentRef],
})
export class ModalModule { }
