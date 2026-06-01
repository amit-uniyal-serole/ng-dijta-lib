import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxContextMenuComponent } from './dx-context-menu.component';

describe('DxContextMenuComponent', () => {
  let component: DxContextMenuComponent<any>;
  let fixture: ComponentFixture<DxContextMenuComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxContextMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
