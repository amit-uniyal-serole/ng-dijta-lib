import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFooterComponent } from './tile-footer.component';

describe('TileFooterComponent', () => {
  let component: TileFooterComponent;
  let fixture: ComponentFixture<TileFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
