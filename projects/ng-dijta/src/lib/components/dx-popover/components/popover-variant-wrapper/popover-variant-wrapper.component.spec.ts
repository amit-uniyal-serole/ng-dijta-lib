import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverVariantWrapperComponent } from './popover-variant-wrapper.component';

describe('PopoverVariantWrapperComponent', () => {
  let component: PopoverVariantWrapperComponent;
  let fixture: ComponentFixture<PopoverVariantWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopoverVariantWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverVariantWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
