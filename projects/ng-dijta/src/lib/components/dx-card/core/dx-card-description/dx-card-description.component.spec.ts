import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardDescriptionComponent } from './dx-card-description.component';

describe('DxCardDescriptionComponent', () => {
  let component: DxCardDescriptionComponent;
  let fixture: ComponentFixture<DxCardDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
