<script lang="ts">
	import './app.css';
	import { darkMode } from './stores/darkMode';
	import { onMount } from 'svelte';
	import Navigation from './components/Navigation.svelte';
	import Footer from './components/Footer.svelte';
	import Page from './routes/+page.svelte';

	let isDark: boolean = false;

	onMount(() => {
		darkMode.init();
		const unsubscribe = darkMode.subscribe((value: boolean) => {
			isDark = value;
		});
		return unsubscribe;
	});
</script>

<div class="flex flex-col min-h-screen">
	<Navigation />
	<main class="flex-1">
		<Page />
	</main>
	<Footer />
</div>
