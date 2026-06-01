import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxChartTileComponent } from './dx-chart-tile.component';

describe('DxChartTileComponent', () => {
  let component: DxChartTileComponent;
  let fixture: ComponentFixture<DxChartTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxChartTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxChartTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
