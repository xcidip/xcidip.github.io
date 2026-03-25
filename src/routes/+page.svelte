<script lang="ts">
	import { fetchUserRepositories, type Repository } from '../lib/github';
	import ProjectCard from '../components/ProjectCard.svelte';
	import { onMount } from 'svelte';

	let repositories: Repository[] = [];
	let filteredRepositories: Repository[] = [];
	let searchQuery = '';
	let selectedLanguage = '';
	let isLoading = true;
	let error: string | null = null;
	let allLanguages: string[] = [];

	// Replace with your actual GitHub username
	const GITHUB_USERNAME = 'xcidip'; // Your GitHub username

	onMount(async () => {
		try {
			repositories = await fetchUserRepositories(GITHUB_USERNAME);
			filteredRepositories = repositories;

			// Extract unique languages
			const languages = new Set<string>();
			repositories.forEach((repo) => {
				if (repo.language) {
					languages.add(repo.language);
				}
			});
			allLanguages = Array.from(languages).sort();
		} catch (err) {
			error = 'Failed to fetch repositories. Please check your GitHub username and try again.';
			console.error(err);
		} finally {
			isLoading = false;
		}
	});

	function filterRepositories() {
		filteredRepositories = repositories.filter((repo) => {
			const matchesSearch =
				repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

			const matchesLanguage = !selectedLanguage || repo.language === selectedLanguage;

			return matchesSearch && matchesLanguage;
		});
	}

	function handleSearch(event: Event) {
		searchQuery = (event.target as HTMLInputElement).value;
		filterRepositories();
	}

	function handleLanguageFilter(event: Event) {
		selectedLanguage = (event.target as HTMLSelectElement).value;
		filterRepositories();
	}

	function resetFilters() {
		searchQuery = '';
		selectedLanguage = '';
		filteredRepositories = repositories;
	}
</script>

<svelte:head>
	<title>Projects | Portfolio</title>
	<meta name="description" content="Browse my GitHub projects and creative work" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
	<!-- Hero Section -->
	<section class="max-w-6xl mx-auto px-4 py-16 md:py-24">
		<div class="text-center mb-12 animate-fade-in">
			<h1 class="text-4xl md:text-5xl font-bold mb-4 gradient-text">Projects</h1>
			<p class="text-xl text-slate-600 dark:text-slate-400 mb-8">
				Explore my GitHub repositories and creative projects
			</p>
		</div>

		<!-- Search and Filter Section -->
		<div class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-12 shadow-lg">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<!-- Search Input -->
				<div>
					<label for="search" class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
						Search
					</label>
					<input
						id="search"
						type="text"
						placeholder="Search projects..."
						value={searchQuery}
						on:input={handleSearch}
						class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					/>
				</div>

				<!-- Language Filter -->
				<div>
					<label for="language" class="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
						Language
					</label>
					<select
						id="language"
						value={selectedLanguage}
						on:change={handleLanguageFilter}
						class="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
					>
						<option value="">All Languages</option>
						{#each allLanguages as language}
							<option value={language}>{language}</option>
						{/each}
					</select>
				</div>

				<!-- Reset Button -->
				<div class="flex items-end">
					<button
						on:click={resetFilters}
						class="w-full px-4 py-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
					>
						Reset Filters
					</button>
				</div>
			</div>

			<p class="text-sm text-slate-600 dark:text-slate-400">
				Showing {filteredRepositories.length} of {repositories.length} repositories
			</p>
		</div>

		<!-- Loading State -->
		{#if isLoading}
			<div class="text-center py-12">
				<div class="inline-block animate-spin">
					<svg class="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
					</svg>
				</div>
				<p class="mt-4 text-slate-600 dark:text-slate-400">Loading repositories...</p>
			</div>
		{:else if error}
			<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
				<p class="text-red-700 dark:text-red-400 font-medium mb-2">Error</p>
				<p class="text-red-600 dark:text-red-300 mb-4">{error}</p>
				<p class="text-sm text-red-500 dark:text-red-400">
					Edit the GITHUB_USERNAME in the projects page to display your repositories.
				</p>
			</div>
		{:else if filteredRepositories.length === 0}
			<div class="text-center py-12">
				<p class="text-slate-600 dark:text-slate-400 text-lg">No repositories found matching your search.</p>
			</div>
		{:else}
			<!-- Projects Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				{#each filteredRepositories as repo (repo.id)}
					<div class="animate-slide-up">
						<ProjectCard {repo} />
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fadeIn 0.6s ease-in;
	}

	.animate-slide-up {
		animation: slideUp 0.6s ease-out forwards;
	}

	:global(.line-clamp-3) {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
