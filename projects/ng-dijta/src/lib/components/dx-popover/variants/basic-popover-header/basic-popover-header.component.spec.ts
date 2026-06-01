import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPopoverHeaderComponent } from './basic-popover-header.component';

describe('BasicPopoverHeaderComponent', () => {
  let component: BasicPopoverHeaderComponent;
  let fixture: ComponentFixture<BasicPopoverHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPopoverHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPopoverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
