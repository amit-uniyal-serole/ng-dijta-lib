import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxContentComponent } from './dx-content.component';

describe('DxContentComponent', () => {
  let component: DxContentComponent;
  let fixture: ComponentFixture<DxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
