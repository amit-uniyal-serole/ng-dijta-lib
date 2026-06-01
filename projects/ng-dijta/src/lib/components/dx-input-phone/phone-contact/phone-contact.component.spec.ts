import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneContactComponent } from './phone-contact.component';

describe('PhoneContactComponent', () => {
  let component: PhoneContactComponent;
  let fixture: ComponentFixture<PhoneContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
