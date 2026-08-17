# SEVEN LEE — IT Developer Portfolio

A responsive, dark-first, static portfolio website built with HTML, CSS, and vanilla JavaScript. It is ready to deploy to GitHub Pages, Netlify, or Vercel without a build step.

## Run locally

Open `index.html` in a modern browser. No backend or package installation is needed.

## Personalize it

All editable portfolio content is collected in [`js/config.js`](js/config.js):

- `SITE_CONFIG.profile` — name, headline, bio, email, social links, GitHub username, and CV URL
- `SITE_CONFIG.stats` — editable placeholder statistics
- `SITE_CONFIG.skills` — categories, skills, icons, and proficiency values
- `SITE_CONFIG.projects` — project details, image paths, features, technologies, and links
- `SITE_CONFIG.timeline` — education, roles, certifications, and milestones
- `SITE_CONFIG.github` — sample GitHub metrics and repositories; a future API integration can replace this object

[`js/script.js`](js/script.js) now contains only rendering, animation, navigation, form, terminal, and interaction logic. Keep `config.js` loaded before `script.js` in `index.html`.

For each project, leave `github` or `live` empty in `config.js` to hide that button. Add a URL when the repository or demo is ready.

Replace `assets/images/profile-placeholder.svg` with a real headshot (keep the filename or update the reference in `index.html`). Replace the SVG project placeholders in `assets/projects/` with project screenshots as you build them.

To add a CV, place a PDF in `assets/` and change `cvUrl` to its path, for example `assets/Seven-Lee-CV.pdf`.

## Contact form

The form is integrated with Formspree and works on GitHub Pages without a backend. To activate delivery:

1. Create a form at [Formspree](https://formspree.io/) and complete its email verification.
2. Copy the unique endpoint in the format `https://formspree.io/f/abcdwxyz`.
3. Paste it into `SITE_CONFIG.contact.formspreeEndpoint` in `js/config.js`.

The form sends asynchronously, prevents duplicate submissions while it is sending, and displays a success or error message. No private API key is stored in this repository.

Instagram and WhatsApp are defined in `SITE_CONFIG.profile.social`. Update their `url` and `value` there whenever your handle or phone number changes.

## Project structure

```text
portfolio/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── config.js
│   └── script.js
└── assets/
    ├── icons/
    │   └── favicon.svg
    ├── images/
    │   └── profile-placeholder.svg
    └── projects/
        ├── portfolio-preview.png
        ├── love-story.svg
        ├── discord-bot.svg
        └── finger-tracking.svg
```

## Notes

- Google Fonts and Font Awesome load from their public CDNs. The page remains usable if either is unavailable.
- The default theme is dark. The header theme button remembers the visitor’s choice in local storage.
- All motion respects `prefers-reduced-motion`.
