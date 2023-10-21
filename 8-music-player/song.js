export class Song {
    #id;
    #name;
    #displayName;
    #artist;
    #cover;

    constructor(id, name, displayName, artist, cover) {
        this.#id = id;
        this.#name = name;
        this.#displayName = displayName;
        this.#artist = artist;
        this.#cover = cover;
    }

    get name() {
        return this.#name;
    }

    get displayName() {
        return this.#displayName;
    }

    get artist() {
        return this.#artist;
    }

    get cover() {
        return this.#cover;
    }
}