import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTilesFooterComponent } from './dx-tile-footer.component';

describe('DxTilesFooterComponent', () => {
  let component: DxTilesFooterComponent;
  let fixture: ComponentFixture<DxTilesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTilesFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTilesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
