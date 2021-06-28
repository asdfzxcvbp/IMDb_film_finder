<script lang="ts" context="module">
	import Films from '../Store/Films';
	import FilmDet from '../Store/FilmDet';
	import type { FilmType, ApiRes } from '../Types/FilmTypes.svelte';
	import { getFilms } from '../Services/FilmRequestor';
	import { fade } from 'svelte/transition';
	import { currentPage, numPages } from "../Store/Pages";
	import { inputIsNotValid } from "./Validator.svelte"

	let hasError: boolean = true;
	let isSuccessVisible: boolean = false;
	const errMessage = "Field must contain at least 3 alfabetic characters";

	let Title: string = '';
	let Year: number;
	let Page:number;
	let ResultsFound: number;

	const loadPage = (event: Event) => {
		event.preventDefault();
	}

	const validateInput = () => {
		hasError = inputIsNotValid(Title);
		console.log(hasError)
	}

	const onSubmit = (event: Event) => {
		event.preventDefault();
		Films.reset();
		FilmDet.reset();
		const films: Promise<ApiRes> = getFilms(Title, Year, Page);
		films.then( (films: any) => {
			let filmArr = films.Search;
			ResultsFound = parseInt(films.totalResults);
			if (isNaN(ResultsFound) || ResultsFound == 0){
				alert("No films found matching the search criteia!");
			} else {
				isSuccessVisible = true;
				numPages.set(Math.ceil(ResultsFound/10));
				for(let i in filmArr){
					const _film: FilmType = {
						Title: filmArr[i].Title,
						Year: filmArr[i].Year,
						Type: filmArr[i].Type,
						Poster: filmArr[i].Poster,
						imdbID: filmArr[i].imdbID
					}
					Films.addFilm(_film);
				}
			}
		});
	}
</script>
<div class="formConainer">
	<form class="form-inline">
		<div class="form-group mb-2">
			<label for="filmName" class="sr-only">Film name</label>
			<input type="text" on:input={validateInput} bind:value={Title} class="form-control" id="filmName" placeholder="Name of the film" required>
		</div>
		<div class="form-group mx-sm-3 mb-2">
			<label for="filmYear" class="sr-only">Password</label>
			<input type="number" bind:value={Year} class="form-control" id="filmYear" placeholder="Release year">
		</div>
		<button disabled={hasError} type="submit" class="btn btn-primary mb-2" on:click={onSubmit}>Search</button>
		<input type="submit" class="btn btn-secondary mb-2 ml-3" on:click={Films.reset} value="Reset"/>
	</form>
	<p>{hasError}</p>
	{#if hasError == true}
		<p class="error-alert">{errMessage}</p>
	{:else}
		{#if isSuccessVisible}	
			<p class="error-alert" transition:fade={{duration:150}}>Found {ResultsFound} results!</p>
		{/if}
	{/if}
</div>