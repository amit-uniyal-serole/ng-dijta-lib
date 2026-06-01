import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLookupModalComponent } from './multi-lookup-modal.component';

describe('MultiLookupModalComponent', () => {
  let component: MultiLookupModalComponent;
  let fixture: ComponentFixture<MultiLookupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLookupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLookupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
