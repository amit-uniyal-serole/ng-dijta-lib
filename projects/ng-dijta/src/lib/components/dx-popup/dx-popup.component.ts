import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, TranslocoModule],
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
