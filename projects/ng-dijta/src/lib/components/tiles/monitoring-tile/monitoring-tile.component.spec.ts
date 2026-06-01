import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringTileComponent } from './monitoring-tile.component';

describe('MonitoringTileComponent', () => {
  let component: MonitoringTileComponent;
  let fixture: ComponentFixture<MonitoringTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
