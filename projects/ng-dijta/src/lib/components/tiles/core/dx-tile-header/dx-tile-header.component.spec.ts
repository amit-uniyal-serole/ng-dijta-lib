import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTileHeaderComponent } from './dx-tile-header.component';

describe('DxTileHeaderComponent', () => {
  let component: DxTileHeaderComponent;
  let fixture: ComponentFixture<DxTileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTileHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
