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
	const GITHUB_USERNAME = 'xcidip';

	const skills = ['Full Stack Development', 'Web Design', 'React / Vue', 'Node.js', 'TypeScript', 'Svelte', 'Tailwind CSS', 'UI/UX Design'];

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
	<title>Rafael Prokop - Full Stack Developer & Designer</title>
	<meta name="description" content="Full-stack developer and designer crafting beautiful, functional digital experiences. Explore my portfolio of web projects." />
</svelte:head>

<main class="bg-white dark:bg-slate-950">
	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-950 pt-20 pb-20 md:pt-32 md:pb-24">
		<!-- Decorative elements -->
		<div class="absolute top-0 right-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl -mr-48 -mt-48 opacity-50" />
		<div class="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl -ml-48 -mb-48 opacity-50" />

		<div class="relative max-w-7xl mx-auto px-4 md:px-6">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="animate-fade-in">
					<p class="text-indigo-600 dark:text-indigo-400 font-medium mb-4">FULL STACK DEVELOPER & DESIGNER</p>
					<h1 class="section-title mb-6 text-slate-900 dark:text-white">
						Crafting Beautiful Digital Experiences
					</h1>
					<p class="section-subtitle mb-8">
						I design and develop modern web applications with a focus on elegant design, clean code, and exceptional user experiences.
					</p>

					<div class="flex flex-col sm:flex-row gap-4">
						<a
							href="#projects"
							class="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
						>
							View My Work
							<span class="ml-2">↓</span>
						</a>
						<a
							href="https://github.com/xcidip"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center px-8 py-3.5 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-300"
						>
							GitHub Profile
							<span class="ml-2">→</span>
						</a>
					</div>
				</div>

				<!-- Decorative code block -->
				<div class="hidden lg:block animate-slide-up">
					<div class="glass rounded-xl p-6 border border-white/20 dark:border-slate-800/20">
						<div class="space-y-4 font-mono text-sm">
							<div class="text-slate-400">{'<div'} <span class="text-emerald-500">class</span>="<span class="text-yellow-500">portfolio</span>"{'>'}</div>
							<div class="ml-4 text-slate-400">{'<h1>'}<span class="text-pink-500">Beautiful Code</span>{'</h1>'}</div>
							<div class="ml-4 text-slate-400">{'<p>'}<span class="text-cyan-500">Pixel Perfect Design</span>{'</p>'}</div>
							<div class="ml-4 text-slate-400">{'<span>'}<span class="text-indigo-500">User Focused</span>{'</span>'}</div>
							<div class="text-slate-400">{'</div>'}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="py-20 md:py-28 bg-gradient-to-b from-white dark:from-slate-950 to-slate-50 dark:to-slate-900">
		<div class="max-w-7xl mx-auto px-4 md:px-6">
			<div class="text-center mb-16 animate-fade-in">
				<h2 class="section-title mb-4">Skills & Expertise</h2>
				<p class="section-subtitle max-w-2xl mx-auto">
					A comprehensive toolkit of modern technologies and design principles
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each skills as skill, i}
					<div
						class="glass rounded-lg p-6 border border-white/20 dark:border-slate-800/20 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 animate-slide-up"
						style="animation-delay: {i * 50}ms"
					>
						<div class="flex items-center gap-3 mb-3">
							<div class="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-600" />
							<h3 class="font-semibold text-slate-900 dark:text-white">{skill}</h3>
						</div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Expert level proficiency</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Projects Section -->
	<section id="projects" class="py-20 md:py-28 bg-white dark:bg-slate-950">
		<div class="max-w-7xl mx-auto px-4 md:px-6">
			<div class="text-center mb-16 animate-fade-in">
				<h2 class="section-title mb-4">Featured Projects</h2>
				<p class="section-subtitle max-w-2xl mx-auto">
					A selection of my recent work showcasing design and development expertise
				</p>
			</div>

			<!-- Search and Filter Section -->
			<div class="glass rounded-xl border border-white/20 dark:border-slate-800/20 p-6 md:p-8 mb-16 animate-fade-in">
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<!-- Search Input -->
					<div class="md:col-span-2">
						<label for="search" class="block text-sm font-semibold mb-3 text-slate-900 dark:text-white">
							Search Projects
						</label>
						<input
							id="search"
							type="text"
							placeholder="Find a project..."
							value={searchQuery}
							on:input={handleSearch}
							class="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
						/>
					</div>

					<!-- Language Filter -->
					<div>
						<label for="language" class="block text-sm font-semibold mb-3 text-slate-900 dark:text-white">
							Language
						</label>
						<select
							id="language"
							value={selectedLanguage}
							on:change={handleLanguageFilter}
							class="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
							class="w-full px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors duration-300"
						>
							Reset
						</button>
					</div>
				</div>

				<p class="text-sm text-slate-600 dark:text-slate-400">
					Showing <span class="font-semibold text-slate-900 dark:text-white">{filteredRepositories.length}</span> of <span class="font-semibold text-slate-900 dark:text-white">{repositories.length}</span> repositories
				</p>
			</div>

			<!-- Loading State -->
			{#if isLoading}
				<div class="text-center py-24">
					<div class="inline-block animate-spin">
						<svg class="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
						</svg>
					</div>
					<p class="mt-6 text-slate-600 dark:text-slate-400 text-lg">Loading projects...</p>
				</div>
			{:else if error}
				<div class="glass rounded-xl p-8 border border-red-200/30 dark:border-red-900/30 text-center max-w-2xl mx-auto">
					<p class="text-red-600 dark:text-red-400 font-semibold mb-2">Unable to Load Projects</p>
					<p class="text-red-600 dark:text-red-300 mb-4">{error}</p>
				</div>
			{:else if filteredRepositories.length === 0}
				<div class="text-center py-24">
					<p class="text-slate-600 dark:text-slate-400 text-lg">No matching projects found. Try adjusting your filters.</p>
				</div>
			{:else}
				<!-- Projects Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each filteredRepositories as repo, i (repo.id)}
						<div class="animate-slide-up" style="animation-delay: {i * 50}ms">
							<ProjectCard {repo} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="py-20 md:py-28 bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-950">
		<div class="max-w-7xl mx-auto px-4 md:px-6">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="animate-fade-in">
					<h2 class="section-title mb-6">About Me</h2>
					<div class="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
						<p>
							I'm a passionate full-stack developer and designer dedicated to creating exceptional digital experiences. With expertise in modern web technologies and a keen eye for design, I transform ideas into elegant, functional solutions.
						</p>
						<p>
							My approach combines clean code architecture with thoughtful UI/UX design, ensuring that every project is both beautiful and performant. I thrive on solving complex problems and constantly learning new technologies.
						</p>
						<p>
							When I'm not coding, you can find me exploring new design trends, contributing to open source, or experimenting with the latest web technologies.
						</p>
					</div>
				</div>

				<div class="glass rounded-xl p-8 border border-white/20 dark:border-slate-800/20 animate-slide-up">
					<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Facts</h3>
					<div class="space-y-4">
						<div class="flex items-start gap-4">
							<span class="text-2xl mt-1">🎯</span>
							<div>
								<h4 class="font-semibold text-slate-900 dark:text-white mb-1">Focused</h4>
								<p class="text-sm text-slate-600 dark:text-slate-400">On creating user-centric solutions</p>
							</div>
						</div>
						<div class="flex items-start gap-4">
							<span class="text-2xl mt-1">⚡</span>
							<div>
								<h4 class="font-semibold text-slate-900 dark:text-white mb-1">Fast Learner</h4>
								<p class="text-sm text-slate-600 dark:text-slate-400">Quickly adapts to new technologies</p>
							</div>
						</div>
						<div class="flex items-start gap-4">
							<span class="text-2xl mt-1">🎨</span>
							<div>
								<h4 class="font-semibold text-slate-900 dark:text-white mb-1">Creative</h4>
								<p class="text-sm text-slate-600 dark:text-slate-400">Brings design thinking to development</p>
							</div>
						</div>
						<div class="flex items-start gap-4">
							<span class="text-2xl mt-1">🤝</span>
							<div>
								<h4 class="font-semibold text-slate-900 dark:text-white mb-1">Collaborative</h4>
								<p class="text-sm text-slate-600 dark:text-slate-400">Works well in teams and independently</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section id="contact" class="py-20 md:py-28 bg-gradient-to-r from-indigo-600 to-emerald-600">
		<div class="max-w-4xl mx-auto px-4 md:px-6 text-center animate-fade-in">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Let's Build Something Great</h2>
			<p class="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
				Ready to turn your ideas into reality? Let's collaborate and create something amazing together.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://github.com/xcidip"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center px-8 py-3.5 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-300 hover:shadow-lg"
				>
					View GitHub
					<span class="ml-2">→</span>
				</a>
				<a
					href="mailto:iamimpulz@proton.me"
					class="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
				>
					Send Email
					<span class="ml-2">✉</span>
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	:global(body) {
		background-color: white;
	}

	:global(.dark body) {
		background-color: rgb(2, 6, 23);
	}
</style>
