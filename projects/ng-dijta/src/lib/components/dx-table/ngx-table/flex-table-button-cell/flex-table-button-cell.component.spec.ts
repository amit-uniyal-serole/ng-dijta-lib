import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from '@discovery/components';
import { MockObject } from '../flex-table/flex-table.mock';
import { FlexTableButtonCellComponent } from './flex-table-button-cell.component';
import DoneCallback = jest.DoneCallback;

describe('FlexTableButtonCellComponent', () => {
    let component: FlexTableButtonCellComponent<MockObject>;
    let fixture: ComponentFixture<FlexTableButtonCellComponent<MockObject>>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [
                FlexTableButtonCellComponent
            ],
            imports: [
                // 3rd Party Modules
                MatCardModule,
                MatIconModule,
                MatButtonModule,
                // Project Modules
                ComponentsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach((done: DoneCallback) => {
        fixture = TestBed.createComponent<FlexTableButtonCellComponent<MockObject>>(FlexTableButtonCellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // Wait for ngChange to be triggered
        void fixture.whenStable()
            .then(() => {
                done();
            });
    });

    it('should be created', () => {
        expect(component)
            .toBeTruthy();
    });
});