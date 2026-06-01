import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputNameComponent } from './dx-input-name.component';

describe('DxInputNameComponent', () => {
  let component: DxInputNameComponent;
  let fixture: ComponentFixture<DxInputNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
