import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
@Component({
  selector: 'd-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
  preserveWhitespaces: false,
})
export class ModalHeaderComponent implements OnInit, OnDestroy {
  @Input()
  title!: string;
  @Input() dialogtype = 'standard';
  @Input()
  showCloseBtn: boolean = false;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() showMaximizeBtn = false;
  @Output() maximizeEvent = new EventEmitter<boolean>();
  maximized = false;


  get checkDialogType() {
    return this.dialogtype?.toLowerCase() || 'standard';
  }

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {

  }

  close(event) {
    this.closeEvent.emit(event);
  }

  ngOnDestroy() {

  }

  maximize() {
    this.maximized = !this.maximized;
    this.maximizeEvent.emit(this.maximized);
  }
}
