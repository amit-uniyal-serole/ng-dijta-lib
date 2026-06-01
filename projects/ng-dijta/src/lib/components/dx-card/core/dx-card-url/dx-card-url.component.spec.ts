import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardUrlComponent } from './dx-card-url.component';

describe('DxCardUrlComponent', () => {
  let component: DxCardUrlComponent;
  let fixture: ComponentFixture<DxCardUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCardUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
