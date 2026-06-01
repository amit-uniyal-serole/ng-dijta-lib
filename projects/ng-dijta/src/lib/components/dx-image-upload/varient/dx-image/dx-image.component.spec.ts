import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxImageComponent } from './dx-image.component';

describe('DxImageComponent', () => {
  let component: DxImageComponent;
  let fixture: ComponentFixture<DxImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
