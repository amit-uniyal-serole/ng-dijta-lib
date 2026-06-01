import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardImageComponent } from './dx-card-image.component';

describe('DxCardImageComponent', () => {
  let component: DxCardImageComponent;
  let fixture: ComponentFixture<DxCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
