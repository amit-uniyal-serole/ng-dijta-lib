import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableMenuComponent } from './dx-table-menu.component';

describe('DxTableMenuComponent', () => {
  let component: DxTableMenuComponent;
  let fixture: ComponentFixture<DxTableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
