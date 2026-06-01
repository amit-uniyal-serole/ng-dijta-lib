import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableViewWrapperComponent } from './dx-table-view-wrapper.component';

describe('DxTableViewWrapperComponent', () => {
  let component: DxTableViewWrapperComponent<any>;
  let fixture: ComponentFixture<DxTableViewWrapperComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTableViewWrapperComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableViewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
