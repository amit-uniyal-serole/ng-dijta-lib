import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxNavigationMenuComponent } from './dx-navigation-menu.component';

describe('DxNavigationMenuComponent', () => {
  let component: DxNavigationMenuComponent;
  let fixture: ComponentFixture<DxNavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxNavigationMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxNavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
