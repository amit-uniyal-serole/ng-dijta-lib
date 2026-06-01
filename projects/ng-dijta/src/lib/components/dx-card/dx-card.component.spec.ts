import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardComponent } from './dx-card.component';

describe('DxCardComponent', () => {
  let component: DxCardComponent;
  let fixture: ComponentFixture<DxCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
