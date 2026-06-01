import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DxTableCheckboxComponent } from './dx-table-checkbox.component';

interface CheckboxDummy {
  data: string;
}
describe('DxTableCheckboxComponent', () => {
  let component: DxTableCheckboxComponent<CheckboxDummy>;
  let fixture: ComponentFixture<DxTableCheckboxComponent<CheckboxDummy>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DxTableCheckboxComponent<CheckboxDummy>>(DxTableCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
