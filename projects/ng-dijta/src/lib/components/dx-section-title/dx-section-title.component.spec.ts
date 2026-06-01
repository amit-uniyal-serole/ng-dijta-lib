import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxSectionTitleComponent } from './dx-section-title.component';

describe('DxSectionTitleComponent', () => {
  let component: DxSectionTitleComponent;
  let fixture: ComponentFixture<DxSectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxSectionTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxSectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
