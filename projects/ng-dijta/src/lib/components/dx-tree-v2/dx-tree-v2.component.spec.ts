import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTreeV2Component } from './dx-tree-v2.component';

describe('DxTreeV2Component', () => {
  let component: DxTreeV2Component;
  let fixture: ComponentFixture<DxTreeV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTreeV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTreeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
