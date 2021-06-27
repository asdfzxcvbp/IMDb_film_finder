// Returns all films matching substring in title
export async function getFilms(Title/*: string*/, Year/*: number*/, Page/*: number*/) {
  const res/*: Response*/ = await fetch(`http://www.omdbapi.com/?s=${Title}&y=${Year}&page=${Page}&apikey=4405d1c9`);
  const films/*: string*/ = await res.json();

  if (res.ok) {
    return films;
  } else {
    throw new Error(films);
  }
}

// Returns more detailed info about a specific film by title
export async function getFilmDataById(Id/*: string*/) {
  const res/*: Response*/ = await fetch(`http://www.omdbapi.com/?i=${Id}&apikey=4405d1c9`);
  const film/*: string*/ = await res.json();

  if (res.ok) {
    return film;
  } else {
    throw new Error(film);
  }
}

