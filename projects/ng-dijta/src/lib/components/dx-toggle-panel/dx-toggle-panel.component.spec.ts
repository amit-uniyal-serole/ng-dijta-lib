import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTogglePanelComponent } from './dx-toggle-panel.component';

describe('DxTogglePanelComponent', () => {
  let component: DxTogglePanelComponent;
  let fixture: ComponentFixture<DxTogglePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTogglePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTogglePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
