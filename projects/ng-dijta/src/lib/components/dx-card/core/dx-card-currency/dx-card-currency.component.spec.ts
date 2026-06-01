import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardCurrencyComponent } from './dx-card-currency.component';

describe('DxCardCurrencyComponent', () => {
  let component: DxCardCurrencyComponent;
  let fixture: ComponentFixture<DxCardCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
