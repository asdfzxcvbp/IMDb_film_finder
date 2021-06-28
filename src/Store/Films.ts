import { writable } from 'svelte/store';
import type { FilmType } from "../Types/FilmTypes.svelte";

const FilmList: Array<FilmType> = [];
const { subscribe, set, update } = writable(FilmList);
const addFilm = (film: FilmType) => update(films => {
    return [...films, film];
});
const reset = () => {
    set(FilmList);
}

export default {
    subscribe,
    addFilm,
    reset
}
