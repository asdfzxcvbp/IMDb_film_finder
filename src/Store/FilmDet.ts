import { writable } from 'svelte/store';
import type { FilmDetType } from "../Types/FilmTypes.svelte";

const FilmDetails: Array<FilmDetType> = [];
const { subscribe, set, update } = writable(FilmDetails);
const addDetails = (details: FilmDetType) => update(prevDetails => {
    return [...prevDetails, details];
});
const reset = () => {
    set(FilmDetails);
}

export default {
    subscribe,
    addDetails,
    reset
}
