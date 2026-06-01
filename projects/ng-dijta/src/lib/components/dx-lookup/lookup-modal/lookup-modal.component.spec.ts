import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupModalComponent } from './lookup-modal.component';

describe('LookupModalComponent', () => {
  let component: LookupModalComponent<any>;
  let fixture: ComponentFixture<LookupModalComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
