// @ts-nocheck — pre-existing errors; missing peer dependency or removed module
/*
 * Copyright Notice
 * ================
 * This file contains proprietary information of Discovery Health.
 * Copying or reproduction without prior written approval is prohibited.
 * Copyright (c) 2020.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexTableColumn, FlexTableHeaderEvent } from '../../interfaces/flex-table.interface';
import { FlexTableColumnClassPipe } from '../../pipes/flex-table-header-class/flex-table-header-class.pipe';
import { FlexTableHeaderComponent } from '../flex-table-header/flex-table-header.component';
import { FlexTableHeaderMock, MockObject } from './flex-table-header.mock';
import DoneCallback = jest.DoneCallback;

describe('FlexTableComponent', () => {
    let component: FlexTableHeaderComponent<MockObject>;
    let fixture: ComponentFixture<FlexTableHeaderComponent<MockObject>>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [
                FlexTableHeaderComponent,
                FlexTableColumnClassPipe
            ],
            imports: [
                MatCardModule,
                MatIconModule
            ]
        })
            .compileComponents();
    }));

    beforeEach((done: DoneCallback) => {
        fixture = TestBed.createComponent<FlexTableHeaderComponent<MockObject>>(FlexTableHeaderComponent);
        component = fixture.componentInstance;
        component.columns = FlexTableHeaderMock.COLUMNS;
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

    it('onHeaderClick should emit an event', (done: DoneCallback) => {
        // Prepare
        const expected: FlexTableColumn<MockObject> = FlexTableHeaderMock.COLUMNS[0]; // Sortable item
        // Assert
        component.columnSort
            .subscribe((item: FlexTableHeaderEvent<MockObject>) => {
                expect(item.column)
                    .toEqual(expected);

                done();
            });
        // Execute
        component.onHeaderClick(expected);
    });

    it('onHeaderClick should ignore an event if the column is not sortable', () => {
        // Prepare
        const expected: FlexTableColumn<MockObject> = FlexTableHeaderMock.COLUMNS[1]; // Not Sortable
        const spy: jest.SpyInstance = jest.spyOn(component.columnSort, 'emit');
        // Execute
        component.onHeaderClick(expected);
        // Assert
        expect(spy)
            .not
            .toHaveBeenCalled();
    });

    it('onHeaderClick with blank input should do nothing', () => {
        // Prepare
        const spy: jest.SpyInstance = jest.spyOn(component.columnSort, 'emit');
        // Execute
        component.onHeaderClick(undefined);
        // Assert
        expect(spy)
            .not
            .toHaveBeenCalled();
    });

    it('trackByFn should return item index', () => {
        // Execute
        // Assert
        expect(component.trackByFn(1))
            .toEqual(1);
    });
});
