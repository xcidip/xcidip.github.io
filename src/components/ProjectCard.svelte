<script lang="ts">
	import type { Repository } from '../lib/github';
	import { getLanguageColor } from '../lib/github';

	export let repo: Repository;

	let isHovered = false;
</script>

<div
	class="group relative rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl transition-shadow duration-300"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	<!-- Gradient background on hover -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
	/>

	<!-- Content -->
	<div class="relative p-6 flex flex-col h-full">
		<!-- Header -->
		<div class="mb-4">
			<a
				href={repo.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-block mb-3 text-xl font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors group"
			>
				{repo.name}
				<span class="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
			</a>
		</div>

		<!-- Description -->
		{#if repo.description}
			<p class="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3">
				{repo.description}
			</p>
		{:else}
			<p class="text-slate-400 dark:text-slate-500 text-sm mb-4 italic">No description</p>
		{/if}

		<!-- Topics -->
		{#if repo.topics.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each repo.topics.slice(0, 3) as topic}
					<span class="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary/20">
						{topic}
					</span>
				{/each}
				{#if repo.topics.length > 3}
					<span class="inline-block px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
						+{repo.topics.length - 3}
					</span>
				{/if}
			</div>
		{/if}

		<!-- Footer -->
		<div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-sm">
			<div class="flex items-center gap-4">
				{#if repo.language}
					<div class="flex items-center gap-1">
						<span
							class="w-3 h-3 rounded-full"
							style="background-color: {getLanguageColor(repo.language)}"
						/>
						<span class="text-slate-600 dark:text-slate-400">{repo.language}</span>
					</div>
				{/if}
				{#if repo.stars > 0}
					<div class="flex items-center gap-1">
						<span>⭐</span>
						<span class="text-slate-600 dark:text-slate-400">{repo.stars}</span>
					</div>
				{/if}
			</div>
			<a
				href={repo.url}
				target="_blank"
				rel="noopener noreferrer"
				class="text-primary hover:text-secondary transition-colors"
				aria-label="View on GitHub"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>

<style>
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
