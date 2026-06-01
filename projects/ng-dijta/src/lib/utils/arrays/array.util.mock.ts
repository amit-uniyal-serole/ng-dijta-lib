export interface DummyModel {
    name: string;
    age: number;
}

export class ArrayUtilMock {
    static readonly NUMBERS: Array<number> = [5, 3, 1, 2, 4];
    static readonly STRINGS: Array<string> = ['5', '3', '1', '2', '4'];
    static readonly OBJECTS: Array<DummyModel> = [
        {name: 'a', age: 5},
        {name: 'c', age: 2},
        {name: 'b', age: 4},
        {name: 'c', age: 3},
        {name: 'c', age: 1}
    ];
}
