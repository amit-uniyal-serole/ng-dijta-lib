import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardAdditionalContentComponent } from './dx-card-additional-content.component';

describe('DxCardAdditionalContentComponent', () => {
  let component: DxCardAdditionalContentComponent;
  let fixture: ComponentFixture<DxCardAdditionalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardAdditionalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCardAdditionalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
