import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPopoverContentComponent } from './basic-popover-content.component';

describe('BasicPopoverContentComponent', () => {
  let component: BasicPopoverContentComponent;
  let fixture: ComponentFixture<BasicPopoverContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPopoverContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPopoverContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
