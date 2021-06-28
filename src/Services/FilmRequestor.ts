import type { ApiRes } from "../Types/FilmTypes.svelte";

// Returns all films matching substring in title
export async function getFilms(Title: string, Year: number, Page: number) {
  if (Title.length >= 3){
    const res: Response = await fetch(`http://www.omdbapi.com/?s=${Title}&y=${Year}&page=${Page}&apikey=4405d1c9`);
    const films: ApiRes = await res.json();

    if (res.ok) {
      return films;
    } else {
      throw new Error(films.toString());
    }
  }
}

// Returns more detailed info about a specific film by title
export async function getFilmDataById(Id: string) {
  const res: Response = await fetch(`http://www.omdbapi.com/?i=${Id}&apikey=4405d1c9`);
  const film: ApiRes = await res.json();

  if (res.ok) {
    return film;
  } else {
    throw new Error(film.toString());
  }
}

