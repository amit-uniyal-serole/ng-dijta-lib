import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCurrencyComponent } from './dx-currency.component';

describe('DxCurrencyComponent', () => {
  let component: DxCurrencyComponent;
  let fixture: ComponentFixture<DxCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
