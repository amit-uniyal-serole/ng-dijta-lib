import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardTextComponent } from './dx-card-text.component';

describe('DxCardTextComponent', () => {
  let component: DxCardTextComponent;
  let fixture: ComponentFixture<DxCardTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxCardTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
