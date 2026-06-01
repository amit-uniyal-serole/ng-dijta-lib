import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxToggleComponent } from './dx-toggle.component';

describe('DxToggleComponent', () => {
  let component: DxToggleComponent;
  let fixture: ComponentFixture<DxToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
