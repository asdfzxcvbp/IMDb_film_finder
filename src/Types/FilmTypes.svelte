<script lang="ts" context="module">
    
    interface FilmRating{
        Source: string;
        Value: string;
    }

    export interface FilmDetType {
        imdbID: string;
        Genre: string;
        Director: string;
        Actors: string;
        Plot: string;
        Awards: string;
        BoxOffice: string;
        Rated: string;
        Released: string /*Date*/;
        imdbRating: string;
        Production: string;
        Language: string;
        // ShowDetails: boolean;
    }

    export interface FilmType{
        Title: string;
        Year: number;
        Type: string;
        Poster: string;
        imdbID: string;
    }
    
</script>