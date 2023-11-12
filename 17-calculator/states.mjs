export class States {
    currentNumber;
    operator;
    nextNumber;

    constructor(currentNumber = "", operator = "", nextNumber = "") {
        this.currentNumber = currentNumber;
        this.operator = operator;
        this.nextNumber = nextNumber;
    }
}