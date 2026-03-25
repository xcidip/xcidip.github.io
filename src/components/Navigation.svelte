<script lang="ts">
	import { darkMode } from '../stores/darkMode';

	let isDark: boolean = false;
	let mobileMenuOpen = false;

	darkMode.subscribe((value: boolean) => {
		isDark = value;
	});

	function toggleDarkMode() {
		darkMode.toggle();
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav class="sticky top-0 z-50 glass border-b border-slate-200/30 dark:border-slate-800/30">
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-5">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 group">
				<div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-lg flex items-center justify-center">
					<span class="text-white font-bold text-lg">✦</span>
				</div>
				<span class="font-display text-xl font-bold hidden sm:inline text-slate-900 dark:text-white">Rafael</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-12">
				<a
					href="/"
					class="underline-animation text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white"
				>
					Home
				</a>
				<a
					href="#projects"
					class="underline-animation text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white"
				>
					Projects
				</a>
				<a
					href="#about"
					class="underline-animation text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white"
				>
					About
				</a>
				<a
					href="#contact"
					class="underline-animation text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white"
				>
					Contact
				</a>

				<!-- Dark Mode Toggle -->
				<button
					on:click={toggleDarkMode}
					class="p-2.5 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all duration-300"
					aria-label="Toggle dark mode"
				>
					{#if isDark}
						<span class="text-lg">☀️</span>
					{:else}
						<span class="text-lg">🌙</span>
					{/if}
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="md:hidden flex items-center gap-3">
				<button
					on:click={toggleDarkMode}
					class="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all"
					aria-label="Toggle dark mode"
				>
					{#if isDark}
						<span class="text-lg">☀️</span>
					{:else}
						<span class="text-lg">🌙</span>
					{/if}
				</button>
				<button
					on:click={toggleMobileMenu}
					class="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all"
					aria-label="Toggle mobile menu"
				>
					{#if mobileMenuOpen}
						<span class="text-lg">✕</span>
					{:else}
						<span class="text-lg">☰</span>
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-6 pb-4 border-t border-slate-200/20 dark:border-slate-800/20 pt-6 space-y-1 animate-fade-in">
				<a
					href="/"
					class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors font-medium"
					on:click={() => (mobileMenuOpen = false)}
				>
					Home
				</a>
				<a
					href="#projects"
					class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors font-medium"
					on:click={() => (mobileMenuOpen = false)}
				>
					Projects
				</a>
				<a
					href="#about"
					class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors font-medium"
					on:click={() => (mobileMenuOpen = false)}
				>
					About
				</a>
				<a
					href="#contact"
					class="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors font-medium"
					on:click={() => (mobileMenuOpen = false)}
				>
					Contact
				</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	nav {
		transition: all 0.3s;
	}
</style>
