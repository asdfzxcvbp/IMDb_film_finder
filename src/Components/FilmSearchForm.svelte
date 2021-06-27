<script lang="ts">
	import Films from '../Store/Films';
	import FilmDet from '../Store/FilmDet';
	import type { FilmType } from '../Types/FilmTypes.svelte';
	import { getFilms } from '../Services/FilmRequestor';
	import {fade } from 'svelte/transition';
	import { currentPage, numPages } from "../Store/Pages";

	let hasError = false;
	let isSuccessVisible = false;
	const errMessage = "A truly useful error message!";

	let Title: string;
	let Year: number;
	let Page:number;
	let ResultsFound: number;

	interface ApiRes{
		Search: Array<FilmType>;
		totalResults: string;
		Response: String;
	}

	const loadPage = (event: Event) => {
		event.preventDefault();
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
			<input type="text" bind:value={Title} class="form-control" id="filmName" placeholder="Name of the film" required>
		</div>
		<div class="form-group mx-sm-3 mb-2">
			<label for="filmYear" class="sr-only">Password</label>
			<input type="number" bind:value={Year} class="form-control" id="filmYear" placeholder="Release year">
		</div>
		<button type="submit" class="btn btn-primary mb-2" on:click={onSubmit}>Search</button>
		<input type="submit" class="btn btn-secondary mb-2 ml-3" on:click={Films.reset} value="Reset"/>
	</form>
	{#if hasError == true}
		<p class="error-alert">{errMessage}</p>
	{:else}
		{#if isSuccessVisible}	
			<p class="error-alert" transition:fade={{duration:150}}>Found {numPages} results!</p>
		{/if}
	{/if}
</div>