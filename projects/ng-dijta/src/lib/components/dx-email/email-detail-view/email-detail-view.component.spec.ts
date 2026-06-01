import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDetailViewComponent } from './email-detail-view.component';

describe('EmailDetailViewComponent', () => {
  let component: EmailDetailViewComponent;
  let fixture: ComponentFixture<EmailDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
