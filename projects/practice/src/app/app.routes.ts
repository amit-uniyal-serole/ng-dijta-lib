import { Routes } from '@angular/router';
import { Input } from './pages/input/input';
import { Card } from './pages/card/card';
import { Table } from './pages/table/table';
import { Button } from './pages/button/button';
import { Expansion } from './pages/expansion/expansion';
import { Criteria } from './pages/criteria/criteria';
import { Calendar } from './pages/calendar/calendar';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'input',
        pathMatch: 'full'
    },
    {
        path: 'input',
        component: Input
    },
    {
        path: 'card',
        component: Card
    },
    {
        path: 'table',
        component: Table
    },
    {
        path: 'button',
        component: Button
    },
    {
        path: 'expansion',
        component: Expansion
    },
     {
        path: 'criteria',
        component: Criteria
    },
     {
        path: 'calendar',
        component: Calendar
    }
];
