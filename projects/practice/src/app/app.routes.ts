import { Routes } from '@angular/router';
import { Input } from './pages/input/input';
import { Card } from './pages/card/card';
import { Table } from './pages/table/table';
import { Button } from './pages/button/button';
import { Expansion } from './pages/expansion/expansion';
import { Criteria } from './pages/criteria/criteria';
import { Calendar } from './pages/calendar/calendar';
import { DxColorPaletteComponent } from 'projects/ng-dijta/src/lib/foundation/dx-color-palette/dx-color-palette.component';
import { DxTypeScaleComponent } from 'projects/ng-dijta/src/lib/foundation/dx-type-scale/dx-type-scale.component';
import { DxSpacingComponent } from 'projects/ng-dijta/src/lib/foundation/dx-spacing/dx-spacing.component';
import { DxBorderRadiusComponent } from 'projects/ng-dijta/src/lib/foundation/dx-border-radius/dx-border-radius.component';
import { DxShadowComponent } from 'projects/ng-dijta/src/lib/foundation/dx-shadow/dx-shadow.component';
import { DxZIndexComponent } from 'projects/ng-dijta/src/lib/foundation/dx-z-index/dx-z-index.component';
import { DxIconExplorerComponent } from 'projects/ng-dijta/src/lib/foundation/dx-icon/dx-icon-explorer.component';
import { PreviewComponent } from './pages/preview/preview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'preview/dx-input',
    pathMatch: 'full',
  },
  {
    path: 'preview/:selector',
    component: PreviewComponent,
  },
  { path: 'input',         component: Input },
  { path: 'card',          component: Card },
  { path: 'table',         component: Table },
  { path: 'button',        component: Button },
  { path: 'expansion',     component: Expansion },
  { path: 'criteria',      component: Criteria },
  { path: 'calendar',      component: Calendar },
  { path: 'typography',    component: DxTypeScaleComponent },
  { path: 'colors',        component: DxColorPaletteComponent },
  { path: 'spacing',       component: DxSpacingComponent },
  { path: 'border-radius', component: DxBorderRadiusComponent },
  { path: 'shadow',        component: DxShadowComponent },
  { path: 'z-index',       component: DxZIndexComponent },
  { path: 'icons',         component: DxIconExplorerComponent },
];
