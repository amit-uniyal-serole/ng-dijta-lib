import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxEmailComponent } from './dx-email.component';

describe('DxEmailComponent', () => {
  let component: DxEmailComponent;
  let fixture: ComponentFixture<DxEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
