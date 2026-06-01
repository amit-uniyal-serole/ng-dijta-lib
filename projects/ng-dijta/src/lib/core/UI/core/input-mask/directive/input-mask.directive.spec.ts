import { InputMaskDirective } from './input-mask.directive';

describe('InputMaskDirective', () => {
    it('should create an instance', () => {
        let data!: any;
        const directive = new InputMaskDirective(data, data);
        expect(directive).toBeTruthy();
    });
});