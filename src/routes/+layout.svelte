<script lang="ts">
	import { darkMode } from '../stores/darkMode';
	import { onMount } from 'svelte';
	import Navigation from '../components/Navigation.svelte';
	import Footer from '../components/Footer.svelte';

	let isDark: boolean = false;

	onMount(() => {
		darkMode.init();
		const unsubscribe = darkMode.subscribe((value) => {
			isDark = value;
		});
		return unsubscribe;
	});
</script>

<div class="flex flex-col min-h-screen">
	<Navigation />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
