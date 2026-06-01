import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardActionComponent } from './dx-card-action.component';

describe('DxCardActionComponent', () => {
  let component: DxCardActionComponent<any>;
  let fixture: ComponentFixture<DxCardActionComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
