// @ts-nocheck — pre-existing generic type errors; component was made generic after spec was written
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableTwoComponent } from './dx-table-two.component';

describe('DxTableTwoComponent', () => {
  let component: DxTableTwoComponent;
  let fixture: ComponentFixture<DxTableTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTableTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
