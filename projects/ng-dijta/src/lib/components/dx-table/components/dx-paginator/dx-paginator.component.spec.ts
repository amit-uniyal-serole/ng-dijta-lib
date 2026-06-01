import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxPaginatorComponent } from './dx-paginator.component';

describe('DxPaginatorComponent', () => {
  let component: DxPaginatorComponent<any>;
  let fixture: ComponentFixture<DxPaginatorComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxPaginatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
