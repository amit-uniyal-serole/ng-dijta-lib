import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxCardEmailComponent } from './dx-card-email.component';

describe('DxCardEmailComponent', () => {
  let component: DxCardEmailComponent;
  let fixture: ComponentFixture<DxCardEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxCardEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxCardEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
