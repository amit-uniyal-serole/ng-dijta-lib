import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DxTableHtmlComponent } from './dx-table-html.component';

describe('DxTableHtmlComponent', () => {
  let component: DxTableHtmlComponent;
  let fixture: ComponentFixture<DxTableHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DxTableHtmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DxTableHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
