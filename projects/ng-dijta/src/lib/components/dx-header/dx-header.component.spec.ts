import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxHeaderComponent } from './dx-header.component';

describe('DxHeaderComponent', () => {
  let component: DxHeaderComponent;
  let fixture: ComponentFixture<DxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
