import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputChipsComponent } from './dx-input-chips.component';

describe('DxInputChipsComponent', () => {
  let component: DxInputChipsComponent;
  let fixture: ComponentFixture<DxInputChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxInputChipsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
