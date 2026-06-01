import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxLinkComponent } from './dx-link.component';

describe('DxLinkComponent', () => {
  let component: DxLinkComponent<any>;
  let fixture: ComponentFixture<DxLinkComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
