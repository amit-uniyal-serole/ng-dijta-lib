import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardListingComponent } from './dx-card-listing.component';

describe('DxCardListingComponent', () => {
  let component: DxCardListingComponent;
  let fixture: ComponentFixture<DxCardListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
