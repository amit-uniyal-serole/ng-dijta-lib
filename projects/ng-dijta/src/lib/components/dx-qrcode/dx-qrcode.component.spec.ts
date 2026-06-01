// @ts-nocheck — pre-existing errors; missing peer dependency or removed module
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QRCodeComponent } from './dx-qrcode.component';
describe('QRCodeComponent', () => {
  let component: QRCodeComponent;
  let fixture: ComponentFixture<QRCodeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRCodeComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(QRCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
