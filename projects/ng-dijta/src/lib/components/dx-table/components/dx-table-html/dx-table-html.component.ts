import { Component, OnInit, Input, ViewEncapsulation, TemplateRef, ViewChild, HostBinding } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalService } from '../../../modal';
import { Link } from '../../interfaces/dx-additional.interface';

@Component({
  selector: 'dx-table-html',
  templateUrl: './dx-table-html.component.html',
  styleUrls: ['./dx-table-html.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '3rem', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('250ms ease-in-out')),
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class DxTableHtmlComponent implements OnInit {

  @HostBinding('attr.hoverCell')
  @Input()
  hoverCell: boolean = false;
  // ************ Style Bindings ************ */
  @HostBinding('class.body-1')
  @Input() body1Class: boolean = true;

  @Input() discFlexTableCellClass: boolean = true;

  @HostBinding('class.disc-flex-table-cell')
  get isDiscFlexTableCellClass(): boolean {
    return this.discFlexTableCellClass
      && !this.hoverCell;
  }

  private _links: Link<any> | undefined;

  @Input()
  set links(value: Link<any> | undefined) { // Handle the possibility that value could be undefined
    if (value) {
      this._links = {
        ...value,
        displayLabel: 'View', // Assuming `displayLabel` is a property of Link<any>
      };
    } else {
      this._links = undefined; // Explicitly handle the case when value is undefined
    }
  }

  get links(): Link<any> | undefined {
    return this._links;
  }
  @Input() data!: string | SafeHtml;
  @Input() type: 'HTML' | 'ONLY_HTML' | undefined;

  @Input() title: string | undefined;
  dataLen!: number;
  showMore: boolean = true;

  shortText: string = '';
  link: boolean = true;

  modelRef

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  constructor(
    private sanitizer: DomSanitizer,
    private readonly modalService: ModalService
  ) {
    this.data = this.sanitizer.bypassSecurityTrustHtml(this.data as string);
  }

  ngOnInit(): void {
    this.dataLen = (this.data as string)?.length;
    this.shortText = ((this.data as string) ?? '').substring(0, 300);
    window.addEventListener('locationchange', () => {
      this.close();
    });
  }

  openTemplateModal() {
    this.modelRef = this.modalService.open({
      id: 'modal-modal',
      width: '50%',
      contentTemplate: this.modalContent,
    });
  }

  close(): void {
    this.modelRef.modalInstance.hide();
  }




}
