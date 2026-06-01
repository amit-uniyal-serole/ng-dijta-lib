import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTitleComponent } from './dx-title.component';

describe('DxTitleComponent', () => {
  let component: DxTitleComponent;
  let fixture: ComponentFixture<DxTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
