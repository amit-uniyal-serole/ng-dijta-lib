import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxPageContentMenuComponent } from './dx-page-content-menu.component';

describe('DxPageContentMenuComponent', () => {
  let component: DxPageContentMenuComponent;
  let fixture: ComponentFixture<DxPageContentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxPageContentMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxPageContentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
