import { API_KEY, BASE_URL } from "./config.js";
import { Song } from "./song.js";

export const getSong = async function (id) {
    try {
        const response = await fetch(`${BASE_URL}/track/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Something went wrong 😭 " + err);
    }
}

export const getSongs = async function (ids = []) {
    const songs = [];
    for (let i = 0; i < ids.length; i++) {
        const data = await getSong(ids[i]);
        const song = new Song(ids[i], data.preview, data.title, data.artist.name, data.album.cover_big);
        songs.push(song);
    }
    return songs;
}