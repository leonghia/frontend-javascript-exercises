class SingleJoke extends Joke {
    #joke;

    constructor(joke) {
        super();
        this.#joke = joke;
    }

    get joke() {
        return this.#joke;
    }

    toString() {
        return `${this.#joke}`;
    }
}