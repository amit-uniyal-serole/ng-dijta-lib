import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTextareaComponent } from './dx-textarea.component';

describe('DxTextareaComponent', () => {
  let component: DxTextareaComponent;
  let fixture: ComponentFixture<DxTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
