import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxFooterComponent } from './dx-footer.component';

describe('DxFooterComponent', () => {
  let component: DxFooterComponent;
  let fixture: ComponentFixture<DxFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
