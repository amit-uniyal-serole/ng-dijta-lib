import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTreeComponent } from './dx-tree.component';
interface Test {
  demo: string;
}
describe('DxTreeComponent', () => {
  let component: DxTreeComponent<Test>;
  let fixture: ComponentFixture<DxTreeComponent<Test>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<DxTreeComponent<Test>>(DxTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
