import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTagInputComponent } from './dx-tag-input.component';

describe('DxTagInputComponent', () => {
  let component: DxTagInputComponent;
  let fixture: ComponentFixture<DxTagInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTagInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
