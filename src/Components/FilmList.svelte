<script lang="ts">

	import Films from '../Store/Films';
    import FilmDet from '../Store/FilmDet';
    import type { FilmDetType } from '../Types/FilmTypes.svelte';
    import { getFilmDataById } from '../Services/FilmRequestor';

    const additionalInfo = (Id: string) => {
        const filmDet: Promise<any> = getFilmDataById(Id);
        filmDet.then( (det: any) => {
            const filmDet: FilmDetType = {
                imdbID: det.imdbID,
                Genre: det.Genre,
                Director: det.Director,
                Actors: det.Actors,
                Plot: det.Plot,
                Awards: det.Awards,
                BoxOffice: det.BoxOffice,
                Rated: det.Rated,
                Released: det.Released,
                imdbRating: det.imdbRating,
                Production: det.Production,
                Language: det.Language,
                // ShowDetails: true
            }
            FilmDet.addDetails(filmDet);
        });
    }

</script>

<div class="container">
    <div class="row">
      <div class="col-12">
          <table class="table table-image">
            <thead>
              <tr>
                <th scope="col">Poster</th>
                <th scope="col">Title</th>
                <th scope="col">Year</th>
                <th scope="col">Type</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                { #each $Films as film}
                <tr>
                    <td class="col-md-2">
                        { #if film.Poster == "N/A" }
                            <img src="images/no_poster_available.png" alt="Poster" width="100" height="140"/>
                        { :else }
                            <img src={film.Poster} alt="Poster" width="100" height="140"/>
                        { /if }
                    </td>
                    <td class="col-md-2"> {film.Title} </td>
                    <td class="col-md-2"> {film.Year} </td>
                    <td class="col-md-2"> {film.Type} </td>
                    <td class="col-md-2">
                        <button type="submit" class="btn btn-primary mb-2" on:click|preventDefault={() => additionalInfo(film.imdbID)}>
                            More info
                        </button>
                    </td>
                </tr>
                <!-- Tried achieving the same by indexing each det object with imdbID as key to forego the the loop, but store would not play nice
                     This is a far less elegant solution and worse performing solution, but it does work. -->
                { #each $FilmDet as det}
                    { #if det.imdbID == film.imdbID }
                        <tr>
                            <td class="strong"> Actors </td>
                            <td class="strong"> Director </td>
                            <td class="strong"> Awards </td>
                            <td class="strong"> Box Office </td>
                            <td class="strong"> Genre </td>
                        </tr>
                        <tr>
                            <td> {det.Actors} </td>
                            <td> {det.Director} </td>
                            <td> {det.Awards} </td>
                            <td> {det.BoxOffice} </td>
                            <td> {det.Genre} </td>
                        </tr>
                        <tr>
                            <td class="strong"> imdb Rating </td>
                            <td class="strong"> Released </td>
                            <td class="strong"> Production </td>
                            <td class="strong"> Language </td>
                            <td class="strong"> Rated </td>
                        </tr>
                        <tr>
                            <td> {det.imdbRating} </td>
                            <td> {det.Released} </td>
                            <td> {det.Production} </td>
                            <td> {det.Language} </td>
                            <td> {det.Rated} </td>
                        </tr>
                        <tr>
                            <td colspan="5" class="strong"style="width: 100%;" > Plot </td>
                        </tr>
                        <tr>
                            <td colspan="5" style="width: 100%;"> {det.Plot} </td>
                        </tr>
                    { /if }
                { /each }
            { /each }
            </tbody>
          </table>   
      </div>
    </div>
  </div>

<style lang="scss">

    .container {
        padding: 2rem 0rem;
    }

    .table-image {
    td, th {
        vertical-align: middle;
        text-align: left;
        }
    }
    .strong{
        font-weight: 700;
    }

</style>

<!-- { #each $Films as film }
<div id="filmContainer">
    <p>{film.Title}</p>
    <p>{film.Year}</p>
    <p>{film.Rated}</p>
    <p>{film.Released}</p>
    <p>{film.Actors}</p>
    <p>{film.Poster}</p>
    { #each film.Ratings as rating}
        <p>{rating.Source}</p>
        <p>{rating.Value}</p>
    { /each }
{ /each }
</div> -->