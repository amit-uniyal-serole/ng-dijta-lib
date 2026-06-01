import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableServiceDataComponent } from './dx-table-service-data.component';

describe('DxTableServiceDataComponent', () => {
  let component: DxTableServiceDataComponent<any>;
  let fixture: ComponentFixture<DxTableServiceDataComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableServiceDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableServiceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
