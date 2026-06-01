import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxFlexMenuComponent } from './dx-flex-menu.component';

describe('DxFlexMenuComponent', () => {
  let component: DxFlexMenuComponent;
  let fixture: ComponentFixture<DxFlexMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxFlexMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxFlexMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
