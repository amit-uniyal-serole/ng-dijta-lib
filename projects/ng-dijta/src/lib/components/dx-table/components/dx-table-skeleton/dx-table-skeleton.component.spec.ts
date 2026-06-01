import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableSkeletonComponent } from './dx-table-skeleton.component';

describe('DxTableSkeletonComponent', () => {
  let component: DxTableSkeletonComponent;
  let fixture: ComponentFixture<DxTableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
