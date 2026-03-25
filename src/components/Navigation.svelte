<script lang="ts">
	import { darkMode } from '../stores/darkMode';

	let isDark: boolean = false;
	let mobileMenuOpen = false;

	darkMode.subscribe((value) => {
		isDark = value;
	});

	function toggleDarkMode() {
		darkMode.toggle();
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav class="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
	<div class="max-w-6xl mx-auto px-4 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
				Portfolio
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-8">
				<a
					href="/"
					class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
				>
					Home
				</a>
				<a
					href="#projects"
					class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
				>
					Projects
				</a>
				<a
					href="#about"
					class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
				>
					About
				</a>
				<a
					href="#contact"
					class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
				>
					Contact
				</a>

				<!-- Dark Mode Toggle -->
				<button
					on:click={toggleDarkMode}
					class="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
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
			<div class="md:hidden flex items-center gap-4">
				<button
					on:click={toggleDarkMode}
					class="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
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
					class="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
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
			<div class="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
				<a
					href="/"
					class="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
					on:click={() => (mobileMenuOpen = false)}
				>
					Home
				</a>
				<a
					href="#projects"
					class="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
					on:click={() => (mobileMenuOpen = false)}
				>
					Projects
				</a>
				<a
					href="#about"
					class="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
					on:click={() => (mobileMenuOpen = false)}
				>
					About
				</a>
				<a
					href="#contact"
					class="block px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
					on:click={() => (mobileMenuOpen = false)}
				>
					Contact
				</a>
			</div>
		{/if}
	</div>
</nav>

<style>
	/* Add smooth transition for mobile menu */
	nav {
		@apply transition-all duration-300;
	}
</style>
