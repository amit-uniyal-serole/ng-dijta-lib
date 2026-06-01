import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxBasicTileComponent } from './dx-basic-tile.component';

describe('DxBasicTileComponent', () => {
  let component: DxBasicTileComponent;
  let fixture: ComponentFixture<DxBasicTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxBasicTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxBasicTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
