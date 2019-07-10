export class DummyClass {
    prop1: string;
    prop2: number;

    constructor(dummyClass: DummyClass) {
        this.prop1 = dummyClass.prop1;
        this.prop2 = dummyClass.prop2;
    }
}
