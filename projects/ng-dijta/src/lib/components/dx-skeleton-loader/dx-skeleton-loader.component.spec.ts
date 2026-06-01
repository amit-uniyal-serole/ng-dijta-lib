import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxSkeletonLoaderComponent } from './dx-skeleton-loader.component';

describe('DxSkeletonLoaderComponent', () => {
  let component: DxSkeletonLoaderComponent;
  let fixture: ComponentFixture<DxSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxSkeletonLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
