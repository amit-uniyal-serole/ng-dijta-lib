import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableCurrencyComponent } from './dx-table-currency.component';
interface D {}
describe('DxTableCurrencyComponent', () => {
  let component: DxTableCurrencyComponent<D>;
  let fixture: ComponentFixture<DxTableCurrencyComponent<D>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
