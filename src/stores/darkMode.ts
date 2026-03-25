import { writable } from 'svelte/store';

const darkModeStore = writable(false);

export const darkMode = {
	subscribe: darkModeStore.subscribe,
	toggle: () => {
		darkModeStore.update((value) => {
			const newValue = !value;
			if (typeof window !== 'undefined') {
				localStorage.setItem('darkMode', JSON.stringify(newValue));
				if (newValue) {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			}
			return newValue;
		});
	},
	init: () => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('darkMode');
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const shouldBeDark = saved ? JSON.parse(saved) : systemPrefersDark;
			
			darkModeStore.set(shouldBeDark);
			if (shouldBeDark) {
				document.documentElement.classList.add('dark');
			}
		}
	}
};
