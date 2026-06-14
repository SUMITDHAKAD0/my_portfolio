# AI Agent Guide for ML Engineer Portfolio

## Project Overview

This is a modern, responsive **React single-page application (SPA)** portfolio website showcasing ML engineering expertise. The site is deployed on GitHub Pages and uses a **JSON-first content architecture** to enable non-developer content updates.

**Live Site**: https://sumitdhakad0.github.io/my_portfolio

## Quick Start

### Development
```bash
npm install        # Install dependencies
npm start          # Start dev server on localhost:3000 (auto-reload)
npm test           # Run Jest tests in watch mode
```

### Production & Deployment
```bash
npm run build      # Create optimized production build (build/)
npm run deploy     # Deploy to GitHub Pages (runs build automatically)
```

**Deployment Note**: The `predeploy` hook automatically runs `npm run build` before deploying. To deploy, simply run `npm run deploy`.

## Architecture & Key Patterns

### Component Structure

The app follows a **modular, section-based architecture**:

```
App.js (root)
├── Navbar          (navigation, sticky header)
├── Hero            (intro section with typing animation)
├── Skills          (categorized technical skills grid)
├── Experience      (work history timeline)
├── Projects        (filterable project cards)
├── Education       (academic credentials)
├── Achievements    (certifications/awards)
├── Contact         (EmailJS contact form)
└── Footer          (footer links)
```

Each component:
1. Lives in `src/components/` as a separate `.js` file (PascalCase naming)
2. Imports corresponding JSON data from `src/data/`
3. Uses `useState` for local state and `useEffect` for data initialization
4. Renders using Tailwind CSS utility classes

### Data Architecture (JSON-First)

All content is **externalized to JSON files** in `src/data/` for easy updates without code changes:

- **`personalInfo.json`** - Name, title, bio, social links, contact details, resume URL
- **`skills.json`** - Technical skills organized by category (Backend, Frontend, ML Libraries, Cloud, Tools)
- **`experience.json`** - Work history with company, role, duration, description
- **`projects.json`** - Featured projects with filters, descriptions, technologies, image URLs
- **`education.json`** - Academic credentials (degree, institution, year, details)
- **`achievements.json`** - Certifications, publications, awards

**Pattern Example** (Skills.js):
```javascript
import skillsData from '../data/skills.json'
const [skills, setSkills] = useState({})
useEffect(() => { setSkills(skillsData) }, [])
```

### Styling Architecture

- **Framework**: Tailwind CSS 3.4+ with custom configuration
- **Entry Point**: `src/index.css` (applies Tailwind directives)
- **PostCSS**: Processes Tailwind + autoprefixes for browser compatibility
- **Color Scheme**:
  - Primary: `#0a2638` (dark navy)
  - Secondary: `#56cca7` (teal accent)
  - Text: White/light gray
- **Custom Font**: Poppins (imported in `src/index.css`)
- **Responsive Breakpoints**: Mobile-first design with `md:` and `lg:` prefixes
- **Custom Animations**: `pulse-slow` for subtle 3-second pulse effects

See [tailwind.config.js](tailwind.config.js) and [postcss.config.js](postcss.config.js) for configuration details.

## Common Tasks

### Task: Update Portfolio Content (No Code Changes)

Edit the corresponding JSON file in `src/data/`:
- Change name/title → edit `personalInfo.json`
- Add/modify skills → edit `skills.json`
- Update work history → edit `experience.json`
- Add/modify projects → edit `projects.json`

Local dev server auto-refreshes when JSON files change.

### Task: Modify Component Styling

Component classes use Tailwind utilities. Example modifications:
- Change padding: `p-4` → `p-6`
- Adjust colors: `text-secondary` → `text-light`
- Update layout: `md:grid-cols-2` → `md:grid-cols-3`

No need to edit CSS files directly; Tailwind processes all utility classes.

### Task: Add Interactivity or Logic

- Use `useState` for component-level state
- Use `useEffect` for side effects (data loading, animations, etc.)
- Refer to existing patterns:
  - **Typing animation**: See [Hero.js](src/components/Hero.js) for character-by-character speed control
  - **Filtering**: See [Projects.js](src/components/Projects.js) for filter button state management
  - **Form submission**: See [Contact.js](src/components/Contact.js) for EmailJS integration

### Task: Deploy to GitHub Pages

```bash
npm run deploy
```

This automatically runs `npm run build` and deploys the `build/` folder to the `gh-pages` branch.

## Development Guidelines

### Component Creation

When adding a new component:
1. Create `src/components/ComponentName.js` (PascalCase)
2. Create `src/data/componentName.json` for content (if needed)
3. Follow the existing pattern: import data, `useState`, `useEffect`, return JSX with Tailwind classes
4. Export as default: `export default ComponentName`

### Content Updates in JSON

JSON structure should match the component's rendering logic:
- Ensure all required fields are present (components may rely on them)
- Maintain consistent structure across arrays (e.g., all skill items have the same properties)
- Test locally before deploying

### Naming Conventions

- **Components**: PascalCase (`Hero.js`, `Projects.js`)
- **Files**: Match component name or use lowercase for utilities
- **Classes**: Use Tailwind utilities; avoid custom CSS unless necessary
- **State variables**: camelCase (`skills`, `activeFilter`, `expandedFeatures`)

### Email Integration (Contact Form)

The Contact component uses EmailJS for backend-less email sending:
- Requires configuration with service ID, template ID, and public key
- Allows direct contact submissions without server infrastructure
- See [Contact.js](src/components/Contact.js) for implementation details

## Project-Specific Considerations

### Build Optimization

The production build creates:
- Minified, hashed CSS bundle: `build/static/css/main.[hash].css`
- Minified, hashed JS bundle: `build/static/js/main.[hash].js`
- Cache-busting via file hashing ensures users always get the latest version

### Performance & Accessibility

- Mobile-first responsive design (all screens supported)
- Smooth scrolling enabled globally
- External links include `target="_blank" rel="noopener noreferrer"`
- Semantic HTML structure for proper heading hierarchy

### Directory Structure

| Directory | Purpose |
|-----------|---------|
| `src/components/` | React components (one per section) |
| `src/data/` | JSON content files |
| `public/` | Static assets (index.html, manifest.json) |
| `public/images/` | Images (profile, projects) |
| `build/` | Production build output (generated, not version-controlled) |

## Troubleshooting

- **Styles not updating**: Restart dev server with `npm start`
- **Component not rendering**: Check that JSON data file exists and path is correct in import statement
- **EmailJS not working**: Verify service ID, template ID, and public key configuration in Contact.js
- **Build fails**: Clear node_modules and reinstall: `rm -r node_modules && npm install`

## Resources

- [README.md](README.md) - Project overview and setup instructions
- [React Docs](https://react.dev) - React fundamentals
- [Tailwind CSS Docs](https://tailwindcss.com) - Utility class reference
- [EmailJS Docs](https://www.emailjs.com/docs/) - Contact form integration

---

**Last Updated**: June 2026  
**Maintainer**: ML Engineer Portfolio Project
