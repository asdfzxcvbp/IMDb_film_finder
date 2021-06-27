import { writable } from 'svelte/store';
//import type Film from '../Types/FilmTypes.svelte';

const FilmDetails = [];
const { subscribe, set, update } = writable(FilmDetails);
const addDetails = (details) => update(prevDetails => {
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
