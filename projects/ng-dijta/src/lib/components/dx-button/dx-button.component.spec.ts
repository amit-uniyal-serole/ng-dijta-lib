import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxButtonComponent } from './dx-button.component';

describe('DxButtonComponent', () => {
  let component: DxButtonComponent;
  let fixture: ComponentFixture<DxButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
