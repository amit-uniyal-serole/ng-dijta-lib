import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableTextCellComponent } from './dx-table-text-cell.component';
interface D {}
describe('DxTableTextCellComponent', () => {
  let component: DxTableTextCellComponent<D>;
  let fixture: ComponentFixture<DxTableTextCellComponent<D>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableTextCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableTextCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
