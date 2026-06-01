import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DxDirectiveModule } from '../../directive/directive.module';
import { DxInputModule } from '../dx-input';
import { DxNumberModule } from '../dx-number';
import { CoordinatesDirective } from './directives/coordinates-directive/coordinates.directive';
import { CoordinatesService } from './directives/coordinates-directive/coordinates.service';
import { DxCoordinatesComponent } from './dx-coordinates.component';
import { LatitudeMaskDirective } from './directives/latitude.directive';
import { DxPipeModule } from '../../core/pipe/pipe.module';
import { CoordinateLatLongComponent } from './coordinate-lat-long/coordinate-lat-long.component';
import { LatLongInput } from './coordinate-lat-long/lat-long.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    DxCoordinatesComponent,
    CoordinatesDirective,
    LatitudeMaskDirective,
    CoordinateLatLongComponent,
    LatLongInput
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    DxInputModule,
    DxNumberModule,
    DxDirectiveModule,
    DxPipeModule,
    TranslocoModule
  ],
  exports: [
    DxCoordinatesComponent,
    DxPipeModule,
    CoordinateLatLongComponent
  ],
  providers: [CoordinatesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DxCoordinatesModule { }
