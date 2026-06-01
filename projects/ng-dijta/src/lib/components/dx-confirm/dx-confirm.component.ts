import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dx-confirm',
  templateUrl: './dx-confirm.component.html',
  styleUrls: ['./dx-confirm.component.scss']
})
export class DxConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DxConfirmComponent>) { }
  closeDialog(isConfirmed: boolean) {
    this.dialogRef.close(isConfirmed);
  }

}
