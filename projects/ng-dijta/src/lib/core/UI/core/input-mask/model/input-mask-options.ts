import { AffinityCalculation, AffinityCalculationStrategy, Notation } from 'ts-input-mask';

export class InputMaskOptions {
    constructor(
        public readonly affineFormats: ReadonlyArray<string> = [],
        public readonly customNotations: ReadonlyArray<Notation> = [],
        public readonly affinityCalculationStrategy: AffinityCalculation =
            new AffinityCalculation(AffinityCalculationStrategy.WHOLE_STRING),
        public readonly autocomplete: boolean = true
    ) {
    }
}