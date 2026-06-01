import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTileFooterComponent } from './dx-tile-footer.component';

describe('DxTileFooterComponent', () => {
  let component: DxTileFooterComponent;
  let fixture: ComponentFixture<DxTileFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTileFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTileFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
