import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dx-popup',
  templateUrl: './dx-popup.component.html',
  styleUrls: ['./dx-popup.component.css']
})
export class DxPopupComponent {

  title!: string;
  description!: string[];
  constructor(
    private readonly dialogRef: MatDialogRef<DxPopupComponent>
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onClose();
      event.preventDefault(); // Prevent default behavior, like scrolling when space is pressed
    }
  }
}
