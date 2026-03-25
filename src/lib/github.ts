interface Repository {
	id: number;
	name: string;
	description: string | null;
	url: string;
	homepage: string | null;
	stars: number;
	language: string | null;
	topics: string[];
	updatedAt: string;
	image?: string;
}

interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	stargazers_count: number;
	language: string | null;
	topics: string[];
	updated_at: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchUserRepositories(username: string): Promise<Repository[]> {
	try {
		const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&direction=desc&per_page=100`;
		
		const headers: HeadersInit = {
			'Accept': 'application/vnd.github.v3+json',
		};

		// Add token if available from environment
		if (import.meta.env.VITE_GITHUB_TOKEN) {
			headers['Authorization'] = `token ${import.meta.env.VITE_GITHUB_TOKEN}`;
		}

		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(`GitHub API error: ${response.status}`);
		}

		const repos: GitHubRepo[] = await response.json();

		return repos
			.filter((repo) => !repo.fork && !repo.private) // Filter out forks and private repos
			.map((repo) => ({
				id: repo.id,
				name: repo.name,
				description: repo.description,
				url: repo.html_url,
				homepage: repo.homepage,
				stars: repo.stargazers_count,
				language: repo.language,
				topics: repo.topics || [],
				updatedAt: repo.updated_at,
			}));
	} catch (error) {
		console.error('Error fetching repositories:', error);
		throw error;
	}
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getLanguageColor(language: string | null): string {
	const colors: Record<string, string> = {
		TypeScript: '#3178c6',
		JavaScript: '#f1e05a',
		Python: '#3572A5',
		Java: '#b07219',
		'C++': '#f34b7d',
		'C#': '#239120',
		Go: '#00ADD8',
		Rust: '#dea584',
		Vue: '#41b883',
		Svelte: '#ff3e00',
		React: '#61dafb',
		HTML: '#e34c26',
		CSS: '#563d7c',
		Shell: '#89e051',
	};

	return colors[language || ''] || '#858585';
}

export type { Repository };
