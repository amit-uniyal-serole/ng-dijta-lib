import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableFieldWrapperComponent } from './dx-table-field-wrapper.component';
interface D {}
describe('DxTableFieldWrapperComponent', () => {
  let component: DxTableFieldWrapperComponent<D>;
  let fixture: ComponentFixture<DxTableFieldWrapperComponent<D>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableFieldWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DxTableFieldWrapperComponent<D>>(DxTableFieldWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
