import { writable } from 'svelte/store';
//import type Film from './FilmTypes.svelte';

const FilmList/*: Array<Film>*/ = [];
const { subscribe, set, update } = writable(FilmList);
const addFilm = (film/*: Film*/) => update(films => {
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
