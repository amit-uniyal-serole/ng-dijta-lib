import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTabGroupComponent } from './dx-tab-group.component';

describe('DxTabViewComponent', () => {
  let component: DxTabGroupComponent;
  let fixture: ComponentFixture<DxTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTabGroupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
