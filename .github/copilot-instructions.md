## Project Setup Checklist

- [ ] Install Node.js 18+ from https://nodejs.org
- [ ] Run `npm install` to install dependencies
- [ ] Configure GitHub username in src/routes/+page.svelte
- [ ] (Optional) Set up GitHub API token in .env file
- [ ] Run `npm run dev` to start development server
- [ ] Customize portfolio colors in tailwind.config.js
- [ ] Update navigation links and footer in components
- [ ] Add your GitHub username to the project
- [ ] Run `npm run build` to create production build
- [ ] Deploy to GitHub Pages or hosting platform

### Development Commands

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript and Svelte checks

### Key Files to Customize

1. **GitHub Username**: `src/routes/+page.svelte` - Update `GITHUB_USERNAME` constant
2. **Colors/Theme**: `tailwind.config.js` - Modify primary, secondary, accent colors
3. **Navigation**: `src/components/Navigation.svelte` - Update menu links
4. **Footer**: `src/components/Footer.svelte` - Update social links and email
5. **About Section**: `src/routes/+page.svelte` - Update about text and skills

### GitHub Pages Deployment

1. Build the project: `npm run build`
2. Configure base path in `svelte.config.js` if needed
3. Push `build/` folder to GitHub
4. Enable Pages in repository settings
5. Your site will be live at `https://username.github.io/MyPersonalWebsite`

### First Steps

After installation, open the project in VS Code and:
1. Replace 'torvalds' with your GitHub username in `src/routes/+page.svelte`
2. Run `npm run dev`
3. Visit http://localhost:5173 in your browser
4. Customize colors and content as needed
