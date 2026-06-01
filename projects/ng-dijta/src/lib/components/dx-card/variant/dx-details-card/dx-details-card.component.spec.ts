import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDetailsCardComponent } from './dx-details-card.component';

describe('DxDetailsCardComponent', () => {
  let component: DxDetailsCardComponent;
  let fixture: ComponentFixture<DxDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
