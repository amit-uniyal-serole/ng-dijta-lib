import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DxTableSetting } from '../../interfaces/dx-table.interface';
import { DxTableComponent } from './dx-table.component';

@Component({ selector: 'dx-paginator', template: '' })
class MockDxPaginatorComponent {
  @Input() setting: any;
  @Input() showSeparator: any;
  @Input() multiViewTable: any;
  @Input() pageSizeList: any;
  @Output() onFilter = new EventEmitter<any>();
  @Output() onPagination = new EventEmitter<any>();
  @Output() onClickViewSwitcher = new EventEmitter<any>();
  @Output() onClickPageSize = new EventEmitter<any>();
  @Output() onClickChangeView = new EventEmitter<any>();
  @Output() onClickCreateCustomView = new EventEmitter<any>();
  @Output() onSubMenuClick = new EventEmitter<any>();
  @Output() onLeftDropDownSearch = new EventEmitter<any>();
  @Output() onMarkAsDefault = new EventEmitter<any>();
  @Output() activeTabChange = new EventEmitter<number | string>();
}

interface D {}
describe('DxTableComponent', () => {
  let component: DxTableComponent<D>;
  let fixture: ComponentFixture<DxTableComponent<D>>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTableComponent, MockDxPaginatorComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DxTableComponent<D>>(DxTableComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('activeTabChange output', () => {
    it('should forward activeTabChange emitted by dx-paginator to consumers', () => {
      component.setting = {} as DxTableSetting;
      fixture.detectChanges();

      const paginatorDebug = fixture.debugElement.query(By.directive(MockDxPaginatorComponent));
      expect(paginatorDebug).withContext('dx-paginator must be rendered when setting is set').toBeTruthy();

      const spy = jasmine.createSpy('activeTabChange');
      component.activeTabChange.subscribe(spy);

      (paginatorDebug.componentInstance as MockDxPaginatorComponent).activeTabChange.emit('tab-1');

      expect(spy).toHaveBeenCalledOnceWith('tab-1');
    });
  });
});
