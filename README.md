# GitHub Portfolio Website

A beautifully designed personal portfolio website showcasing your GitHub projects. Built with **SvelteKit**, **Tailwind CSS**, and **Vite** for optimal performance and developer experience.

## Features

✨ **Core Features**
- Dynamic GitHub repository fetching via GitHub API
- Beautiful, modern UI with gradient effects
- Creative card-based project display
- Full-text search across projects
- Filter by programming language
- Responsive design (mobile, tablet, desktop)
- Dark mode with persistent theme storage
- Smooth animations and transitions
- About section with skills showcase
- Contact section with social links

## Stack

- **Framework**: Svelte with SvelteKit
- **Styling**: Tailwind CSS with responsive utilities
- **Build Tool**: Vite for fast development and builds
- **Language**: TypeScript for type safety
- **API**: GitHub REST API for dynamic repo fetching
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- A GitHub account

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd MyPersonalWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure GitHub API (Optional but recommended)**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add:
   ```
   VITE_GITHUB_USERNAME=your-github-username
   VITE_GITHUB_TOKEN=your-github-personal-access-token
   ```

   **To get a GitHub Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create a new token with `public_repo` scope
   - Copy the token and add it to `.env`

4. **Update the GitHub username in the code**
   
   Edit [src/routes/+page.svelte](src/routes/+page.svelte) and change:
   ```typescript
   const GITHUB_USERNAME = 'torvalds'; // Change to your username
   ```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173` with hot module reloading.

### Customization

**Change Portfolio Details:**
- Navigation links: [src/components/Navigation.svelte](src/components/Navigation.svelte)
- Footer: [src/components/Footer.svelte](src/components/Footer.svelte)
- About section: Edit the about section in [src/routes/+page.svelte](src/routes/+page.svelte)
- Contact links: Update email and social links in the contact section

**Styling:**
- Colors and theme: [tailwind.config.js](tailwind.config.js)
- Global styles: [src/app.css](src/app.css)
- Component styles: Individual `.svelte` files

**Add Custom Content:**
- Modify project filtering logic in [src/lib/github.ts](src/lib/github.ts)
- Create new routes by adding `.svelte` files in `src/routes/`

### Building

Build for production:
```bash
npm run build
```

Output will be in the `build/` directory.

Preview the production build:
```bash
npm run preview
```

## Deployment to GitHub Pages

### Step 1: Configure for GitHub Pages

Update the base path in [svelte.config.js](svelte.config.js) if using a repository (not username.github.io):

```javascript
paths: {
  base: process.env.NODE_ENV === 'production' ? '/repository-name' : '',
}
```

### Step 2: Deploy

```bash
npm run build
git add build/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "Pages" section
3. Select `gh-pages` branch or your build directory as source
4. Save

Your site will be live at: `https://username.github.io/MyPersonalWebsite`

## Project Structure

```
src/
├── app.css                 # Global styles with Tailwind
├── app.html                # HTML entry point
├── routes/
│   ├── +layout.svelte      # Root layout (navigation, footer)
│   └── +page.svelte        # Home page with hero and projects
├── components/
│   ├── Navigation.svelte    # Top navigation bar
│   ├── Footer.svelte        # Footer component
│   └── ProjectCard.svelte   # Individual project card
├── lib/
│   └── github.ts            # GitHub API service
└── stores/
    └── darkMode.ts          # Dark mode store
```

## Environment Variables

- `VITE_GITHUB_USERNAME` - Your GitHub username
- `VITE_GITHUB_TOKEN` - GitHub Personal Access Token (optional, for higher rate limits)

## Troubleshooting

**Projects not loading?**
- Verify your GitHub username is correct
- Check browser console for API errors
- Ensure GitHub API is accessible (no network issues)
- If using a token, verify it's valid

**Styling looks broken?**
- Run `npm install` to ensure Tailwind is installed
- Clear browser cache and rebuild: `npm run build`
- Check that `tailwind.config.js` is properly configured

**Dark mode not working?**
- Ensure JavaScript is enabled
- Check localStorage permissions in browser
- Verify dark mode store is initialized

## Performance Tips

- Projects are lazy-loaded from GitHub API on page load
- Implement caching to reduce API calls (already using fetch caching)
- Consider using a backend service for production to cache repos
- Images/media can be added to projects via repo topics

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check GitHub repository for existing issues
2. Create a new issue with detailed information
3. Review the code comments for implementation details

---

Built with ❤️ using Svelte, Tailwind CSS, and Vite
