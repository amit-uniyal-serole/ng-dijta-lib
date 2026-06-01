import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxFloaterButtonComponent } from './dx-floater-button.component';

describe('DxFloaterButtonComponent', () => {
  let component: DxFloaterButtonComponent;
  let fixture: ComponentFixture<DxFloaterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxFloaterButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxFloaterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
