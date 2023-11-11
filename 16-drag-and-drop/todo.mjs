export class Todo {
    id = 0;
    name;
    type;

    constructor(name = "", type = "") {
        this.name = name;
        this.type = type;
    }
}