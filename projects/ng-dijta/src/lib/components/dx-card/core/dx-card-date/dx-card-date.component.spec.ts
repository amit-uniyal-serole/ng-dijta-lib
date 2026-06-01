import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardDateComponent } from './dx-card-date.component';

describe('DxCardDateComponent', () => {
  let component: DxCardDateComponent;
  let fixture: ComponentFixture<DxCardDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
