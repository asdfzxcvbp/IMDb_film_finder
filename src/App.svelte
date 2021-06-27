<script lang="ts">
	import { setContext } from 'svelte';
	import FilmSearchForm from './Components/FilmSearchForm.svelte';
	import FilmList from './Components/FilmList.svelte';

</script>

<main>
	<FilmSearchForm />
	<FilmList />
</main>

<style lang="scss">
	@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");
	$color: #8781a3;
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>