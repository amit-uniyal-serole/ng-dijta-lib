import { Routes } from '@angular/router';
import { Input } from './pages/input/input';
import { Card } from './pages/card/card';
import { Table } from './pages/table/table';
import { Button } from './pages/button/button';
import { Expansion } from './pages/expansion/expansion';
import { Criteria } from './pages/criteria/criteria';
import { Calendar } from './pages/calendar/calendar';
import { DxColorPaletteComponent, DxTypeScaleComponent, DxSpacingComponent, DxBorderRadiusComponent, DxShadowComponent, DxZIndexComponent, DxIconExplorerComponent, DxBorderComponent, DxBackgroundComponent, DxTextComponent } from 'projects/ng-dijta/src/public-api';
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
  { path: 'border',      component: DxBorderComponent },
  { path: 'background',  component: DxBackgroundComponent },
  { path: 'text',        component: DxTextComponent },
];
