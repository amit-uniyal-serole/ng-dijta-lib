import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAddButtonComponent } from './filter-add-button.component';

describe('FilterAddButtonComponent', () => {
  let component: FilterAddButtonComponent;
  let fixture: ComponentFixture<FilterAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAddButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
