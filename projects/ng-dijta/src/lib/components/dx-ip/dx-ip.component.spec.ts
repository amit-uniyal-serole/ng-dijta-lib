import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxIpComponent } from './dx-ip.component';

describe('DxIpComponent', () => {
  let component: DxIpComponent;
  let fixture: ComponentFixture<DxIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxIpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
