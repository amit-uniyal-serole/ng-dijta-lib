import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxDualListboxComponent } from './dx-dual-listbox.component';

describe('DxDualListboxComponent', () => {
  let component: DxDualListboxComponent;
  let fixture: ComponentFixture<DxDualListboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxDualListboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxDualListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
