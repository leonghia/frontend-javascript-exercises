class TwoPartJoke extends Joke {
    #setup;
    #delivery;

    constructor(setup, delivery) {
        super();
        this.#setup = setup;
        this.#delivery = delivery;
    }

    get setup() {
        return this.#setup;
    }

    get delivery() {
        return this.#delivery;
    }

    toString() {
        return `${this.#setup}. ${this.#delivery}`;
    }
}