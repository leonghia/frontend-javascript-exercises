export class Question {
    #a;
    #b;
    #result;
    #solution;
    #userAnswer;

    constructor(a = 0, b = 0, result = 0, solution = "right", userAnswer = "right") {
        this.#a = a;
        this.#b = b;
        this.#result = result;
        this.#solution = solution;
        this.#userAnswer = userAnswer;
    }

    get a() {
        return this.#a;
    }

    get b() {
        return this.#b;
    }

    get result() {
        return this.#result;
    }

    get solution() {
        return this.#solution;
    }

    get userAnswer() {
        return this.#userAnswer;
    }

    set a(value) {
        this.#a = value;
    }

    set b(value) {
        this.#b = value;
    }

    set result(value) {
        this.#result = value;
    }

    set solution(value) {
        this.#solution = value;
    }

    set userAnswer(value) {
        this.#userAnswer = value;
    }
}