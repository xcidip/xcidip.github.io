<script lang="ts">
	import type { Repository } from '../lib/github';
	import { getLanguageColor } from '../lib/github';

	export let repo: Repository;
</script>

<a
	href={repo.url}
	target="_blank"
	rel="noopener noreferrer"
	class="group card-hover relative overflow-hidden rounded-xl glass border border-white/20 dark:border-slate-800/20 p-6 flex flex-col h-full"
>
	<!-- Animated gradient background -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-emerald-500/0 group-hover:from-indigo-500/5 group-hover:via-indigo-500/5 group-hover:to-emerald-500/5 transition-all duration-500 pointer-events-none"
	/>

	<!-- Content -->
	<div class="relative z-10 flex flex-col h-full">
		<!-- Header -->
		<div class="mb-3 flex items-start justify-between">
			<div>
				<h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
					{repo.name}
				</h3>
			</div>
			<span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">↗</span>
		</div>

		<!-- Description -->
		{#if repo.description}
			<p class="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow">
				{repo.description}
			</p>
		{:else}
			<p class="text-slate-400 dark:text-slate-500 text-sm mb-4 italic">No description available</p>
		{/if}

		<!-- Topics -->
		{#if repo.topics.length > 0}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each repo.topics.slice(0, 3) as topic}
					<span class="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200/30 dark:border-indigo-900/30">
						{topic}
					</span>
				{/each}
			</div>
		{/if}

		<!-- Footer -->
		<div class="flex items-center justify-between pt-4 border-t border-slate-200/20 dark:border-slate-800/20 text-xs gap-4">
			<div class="flex items-center gap-3">
				{#if repo.language}
					<div class="flex items-center gap-1.5">
						<span
							class="w-2 h-2 rounded-full"
							style="background-color: {getLanguageColor(repo.language)}"
						/>
						<span class="text-slate-600 dark:text-slate-400 font-medium">{repo.language}</span>
					</div>
				{/if}
				{#if repo.stars > 0}
					<div class="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
						<span>⭐</span>
						<span class="font-medium">{repo.stars}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</a>

<style>
</style>
