import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxActionComponent } from './dx-action.component';
interface D {}
describe('DxActionComponent', () => {
  let component: DxActionComponent<D>;
  let fixture: ComponentFixture<DxActionComponent<D>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DxActionComponent<D>>(DxActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
