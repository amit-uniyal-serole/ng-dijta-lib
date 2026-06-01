import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTilesHeaderComponent } from './dx-tile-header.component';

describe('DxTilesHeaderComponent', () => {
  let component: DxTilesHeaderComponent;
  let fixture: ComponentFixture<DxTilesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTilesHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTilesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
