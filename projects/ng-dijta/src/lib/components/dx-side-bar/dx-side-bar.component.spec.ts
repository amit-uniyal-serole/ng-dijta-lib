import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxSideBarComponent } from './dx-side-bar.component';

describe('DxSideBarComponent', () => {
  let component: DxSideBarComponent;
  let fixture: ComponentFixture<DxSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
