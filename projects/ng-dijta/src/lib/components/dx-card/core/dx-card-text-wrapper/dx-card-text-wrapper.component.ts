import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { DxDetailsCardContent } from '../../model/dx-details-card.model';
import { ModalService } from '../../../modal';

@Component({
  selector: 'dx-card-text-wrapper',
  templateUrl: 'dx-card-text-wrapper.component.html',
  styleUrls: ['dx-card-text-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxCardTextWrapperComponent {
  @Input() data!: DxDetailsCardContent;
  @Input() enableTextCopy!: boolean;
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  modelRef: any;
  constructor(
    private readonly modalService: ModalService
  ) { }

  openViewModal() {
    this.modelRef = this.modalService.open({
      id: 'modal-view-1',
      width: '50%',
      contentTemplate: this.modalContent,
    });
  }
  close(): void {
    this.modelRef.modalInstance.hide();
  }
}
