import { FlexTableColumn } from '../../interfaces/flex-table.interface';

export interface MockObject {
    key: string;
    value: string;
}

export class FlexTableHeaderMock {
    static readonly COLUMNS: Array<FlexTableColumn<MockObject>> = [
        {
            title: 'Title 1',
            field: 'key',
            type: 'text',
            sortable: true
        },
        {
            title: 'Title 2',
            field: 'value',
            type: 'currency',
            class: 'test'
        },
        {
            title: 'Title 3',
            field: 'key',
            type: 'text',
            sortable: true,
            class: ['test', 'test2']
        }
    ];
}
