import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxConfigTableComponent } from './dx-config-table.component';

describe('DxConfigTableComponent', () => {
  let component: DxConfigTableComponent<any>;
  let fixture: ComponentFixture<DxConfigTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxConfigTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxConfigTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
