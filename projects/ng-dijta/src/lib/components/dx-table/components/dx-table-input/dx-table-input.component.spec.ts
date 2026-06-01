import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableInputComponent } from './dx-table-input.component';
interface D {}
describe('DxTableInputComponent', () => {
  let component: DxTableInputComponent<D>;
  let fixture: ComponentFixture<DxTableInputComponent<D>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DxTableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
