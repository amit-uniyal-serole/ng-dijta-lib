import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxInputEmailComponent } from './dx-input-email.component';

describe('DxInputEmailComponent', () => {
  let component: DxInputEmailComponent;
  let fixture: ComponentFixture<DxInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxInputEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
