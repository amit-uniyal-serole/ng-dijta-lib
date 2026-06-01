import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListTableViewComponent } from './email-list-table-view.component';

describe('EmailListTableViewComponent', () => {
  let component: EmailListTableViewComponent;
  let fixture: ComponentFixture<EmailListTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailListTableViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
