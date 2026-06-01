import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxNumberComponent } from './dx-number.component';

describe('DxNumberComponent', () => {
  let component: DxNumberComponent;
  let fixture: ComponentFixture<DxNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
