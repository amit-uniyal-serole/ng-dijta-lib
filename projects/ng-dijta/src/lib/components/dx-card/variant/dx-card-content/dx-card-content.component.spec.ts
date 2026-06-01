import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardContentComponent } from './dx-card-content.component';

describe('DxCardContentComponent', () => {
  let component: DxCardContentComponent;
  let fixture: ComponentFixture<DxCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
