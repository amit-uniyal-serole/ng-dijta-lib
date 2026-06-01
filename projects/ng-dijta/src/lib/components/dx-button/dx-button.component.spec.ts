import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxButtonComponent } from './dx-button.component';

describe('DxButtonComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let component: DxButtonComponent<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fixture: ComponentFixture<DxButtonComponent<any>>;

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
