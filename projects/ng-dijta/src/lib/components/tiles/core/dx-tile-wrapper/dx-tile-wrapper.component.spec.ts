import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTileWrapperComponent } from './dx-tile-wrapper.component';

describe('DxTileWrapperComponent', () => {
  let component: DxTileWrapperComponent;
  let fixture: ComponentFixture<DxTileWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTileWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTileWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
