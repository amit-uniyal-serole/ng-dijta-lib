import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxServerSideAutocompleteComponent } from './dx-server-side-autocomplete.component';

describe('DxServerSideAutocompleteComponent', () => {
  let component: DxServerSideAutocompleteComponent;
  let fixture: ComponentFixture<DxServerSideAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxServerSideAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxServerSideAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
