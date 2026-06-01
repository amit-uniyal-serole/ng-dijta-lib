import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableComponent } from './dx-table.component';
interface D {}
describe('DxTableComponent', () => {
  let component: DxTableComponent<D>;
  let fixture: ComponentFixture<DxTableComponent<D>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DxTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DxTableComponent<D>>(DxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
