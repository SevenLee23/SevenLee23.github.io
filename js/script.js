/* Site interactions and dynamic rendering. Edit content in config.js. */

const SITE_CONFIG = window.SITE_CONFIG;

if (!SITE_CONFIG) {
  throw new Error("Portfolio configuration is missing. Load js/config.js before js/script.js.");
}

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
let activeScrollFrame = null;

function bindProfileData() {
  const { profile } = SITE_CONFIG;
  $$('[data-bind]').forEach((node) => {
    const key = node.dataset.bind;
    if (profile[key]) node.textContent = profile[key];
  });
  $$('[data-cv-link]').forEach((link) => {
    link.href = profile.cvUrl;
    if (profile.cvUrl !== "#") link.setAttribute("download", "");
  });
  $$('[data-github-url]').forEach((link) => { link.href = `https://github.com/${profile.githubUsername}`; });
}

function renderSocialLinks() {
  const socialMarkup = SITE_CONFIG.profile.social.filter(({ url }) => url && url !== "#").map(({ label, icon, url }) => `
    <a href="${url}" target="_blank" rel="noopener" aria-label="Visit ${label}">
      <i class="${icon}" aria-hidden="true"></i>
    </a>`).join("");
  $$('[data-social-links]').forEach((container) => { container.innerHTML = socialMarkup; });
}

function renderStats() {
  $('[data-stats]').innerHTML = SITE_CONFIG.stats.map((stat) => `
    <article class="stat-card reveal" data-icon="${stat.icon}">
      <strong class="stat-value">${stat.value}</strong>
      <span class="stat-label">${stat.label}</span>
    </article>`).join("");
}

function renderSkills() {
  const container = $('[data-skill-groups]');
  container.innerHTML = SITE_CONFIG.skills.map((group) => `
    <article class="skill-group glass-card reveal">
      <header class="skill-group-header"><h3 class="skill-group-title"><i class="${group.icon}"></i>${group.title}</h3><span class="skill-count">${group.items.length} skills</span></header>
      <ul class="skill-list">${group.items.map((skill) => `
        <li class="skill-item"><div class="skill-item-top"><span class="skill-name"><i class="${skill.icon}"></i>${skill.name}</span><span class="skill-percent">${skill.level}%</span></div><div class="skill-track"><div class="skill-bar" data-level="${skill.level}"></div></div></li>`).join("")}
      </ul>
    </article>`).join("");
}

function safeExternalLink(url, label, icon) {
  const link = typeof url === "string" ? url.trim() : "";
  if (!link || link === "#") return "";
  return `<a class="project-link" href="${link}" target="_blank" rel="noopener"><i class="${icon}"></i>${label}</a>`;
}

function renderProjects() {
  const grid = $('[data-project-grid]');
  grid.innerHTML = SITE_CONFIG.projects.map((project, index) => `
    <article class="project-card reveal" data-project-index="${index}">
      <div class="project-image"><img src="${project.image}" alt="Placeholder visual for ${project.title}" loading="lazy" /><span class="project-index">0${index + 1}</span></div>
      <div class="project-body"><h3 class="project-title">${project.title}</h3><p class="project-description">${project.description}</p>
        <ul class="feature-list">${project.features.slice(0, 4).map((feature) => `<li>${feature}</li>`).join("")}${project.features.length > 4 ? `<li>+${project.features.length - 4} more</li>` : ""}</ul>
        <ul class="technology-list">${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}</ul>
        <div class="project-actions">${safeExternalLink(project.github, "GitHub", "fa-brands fa-github")}${safeExternalLink(project.live, "Live Demo", "fa-solid fa-arrow-up-right-from-square")}<button class="project-link" type="button" data-project-details="${index}">Details <i class="fa-solid fa-arrow-right"></i></button></div>
      </div>
    </article>`).join("");
}

function renderTimeline() {
  $('[data-timeline]').innerHTML = SITE_CONFIG.timeline.map((item) => `
    <li class="timeline-item reveal"><span class="timeline-dot" aria-hidden="true"></span><article class="timeline-card glass-card"><header class="timeline-card-head"><div><h3>${item.title}</h3><p class="timeline-organization">${item.organization}</p></div><time class="timeline-date">${item.date}</time></header><p class="timeline-description">${item.description}</p><div class="timeline-tech">${item.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div></article></li>`).join("");
}

function renderGithub() {
  const { github } = SITE_CONFIG;
  const metrics = [
    [github.repositoryCount, "Repos"], [github.stars, "Stars"], [github.followers, "Followers"], [github.contributions, "Contributions"]
  ];
  $('[data-github-stats]').innerHTML = metrics.map(([value, label]) => `<div class="github-stat"><b>${value}</b><span>${label}</span></div>`).join("");
  $('[data-popular-repos]').innerHTML = github.popularRepos.map((repo) => `
    <div class="repo-item"><div><span class="repo-name"><i class="fa-solid fa-book-bookmark"></i> ${repo.name}</span><span class="repo-description">${repo.description}</span></div><span class="repo-meta"><span><i class="fa-solid fa-star"></i> ${repo.stars}</span></span></div>`).join("");
}

function renderContactCards() {
  const { profile } = SITE_CONFIG;
  const getSocial = (label) => profile.social.find((social) => social.label === label) || {};
  const socialCard = (label) => {
    const social = getSocial(label);
    return { icon: social.icon, label, value: social.value || `Add your ${label} details`, href: social.url };
  };
  const cards = [
    { icon: "fa-solid fa-envelope", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: "fa-brands fa-github", label: "GitHub", value: profile.githubUsername, href: `https://github.com/${profile.githubUsername}` },
    socialCard("Instagram"),
    socialCard("Discord"),
    socialCard("WhatsApp")
  ];
  $('[data-contact-cards]').innerHTML = cards.map((card) => {
    const isLink = card.href && card.href !== "#";
    const value = isLink ? `<a href="${card.href}" ${card.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${card.value}</a>` : `<span>${card.value}</span>`;
    return `<article class="contact-card"><span class="contact-card-icon"><i class="${card.icon}"></i></span><div><p>${card.label}</p>${value}</div></article>`;
  }).join("");
}

function initNavigation() {
  const header = $('.site-header');
  const toggle = $('.nav-toggle');
  const panel = $('.nav-panel');
  const navLinks = $$('.nav-links a');
  const closeMenu = () => { toggle.classList.remove('open'); panel.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };

  toggle.addEventListener('click', () => {
    const nowOpen = !toggle.classList.contains('open');
    toggle.classList.toggle('open', nowOpen); panel.classList.toggle('open', nowOpen); toggle.setAttribute('aria-expanded', String(nowOpen));
  });
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const sections = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);
  const setHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
    let active = sections[0]?.id;
    sections.forEach((section) => { if (window.scrollY >= section.offsetTop - 150) active = section.id; });
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${active}`));
  };
  window.addEventListener('scroll', setHeaderState, { passive: true });
  setHeaderState();
}

function initTheme() {
  const toggle = $('.theme-toggle');
  const savedTheme = localStorage.getItem('seven-lee-theme');
  if (savedTheme === 'light') document.body.classList.add('light-theme');
  const updateToggle = () => {
    const isLight = document.body.classList.contains('light-theme');
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    toggle.innerHTML = `<i class="fa-solid fa-${isLight ? 'moon' : 'sun'}" aria-hidden="true"></i>`;
  };
  toggle.addEventListener('click', () => { document.body.classList.toggle('light-theme'); localStorage.setItem('seven-lee-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark'); updateToggle(); });
  updateToggle();
}

function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      entry.target.querySelectorAll('.skill-bar').forEach((bar) => { bar.style.width = `${bar.dataset.level}%`; });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((element) => observer.observe(element));
}

function initScrollProgress() {
  const indicator = $('.scroll-progress span');
  const backToTop = $('.back-to-top');
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    indicator.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', update, { passive: true }); update();
}

function animatePageScroll(destination) {
  if (activeScrollFrame) window.cancelAnimationFrame(activeScrollFrame);
  const startPosition = window.scrollY;
  const maximumPosition = document.documentElement.scrollHeight - window.innerHeight;
  const targetPosition = Math.max(0, Math.min(destination, maximumPosition));
  const distance = Math.abs(targetPosition - startPosition);
  if (distance < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 600 : Math.min(1500, Math.max(700, distance * 0.42));
  const startTime = performance.now();
  const easeInOutCubic = (progress) => progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

  const scrollFrame = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    window.scrollTo(0, Math.round(startPosition + (targetPosition - startPosition) * easeInOutCubic(progress)));
    activeScrollFrame = progress < 1 ? window.requestAnimationFrame(scrollFrame) : null;
  };

  activeScrollFrame = window.requestAnimationFrame(scrollFrame);
}

function initSmoothAnchorNavigation() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.matches('.skip-link, .back-to-top, [data-cv-link]')) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = $(hash);
    if (!target) return;

    event.preventDefault();
    const headerHeight = $('.site-header')?.offsetHeight || 0;
    const destination = window.scrollY + target.getBoundingClientRect().top - headerHeight - 14;
    animatePageScroll(destination);
    if (window.location.hash !== hash) history.pushState(null, '', hash);
  });
}

function initBackToTop() {
  const backToTop = $('.back-to-top');
  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    animatePageScroll(0);
    if (window.location.hash !== '#top') history.pushState(null, '', '#top');
    backToTop.blur();
  });
}

function initTypingEffect() {
  const target = $('#typed-role');
  const roles = ["Software Developer", "Python Developer", "Web Developer", "AI & Machine Learning Enthusiast", "Discord Bot Developer"];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { target.textContent = roles[0]; return; }
  let roleIndex = 0; let charIndex = 0; let deleting = false;
  const tick = () => {
    const word = roles[roleIndex];
    target.textContent = word.slice(0, charIndex);
    if (!deleting && charIndex < word.length) { charIndex += 1; setTimeout(tick, 61); return; }
    if (!deleting) { deleting = true; setTimeout(tick, 1500); return; }
    if (deleting && charIndex > 0) { charIndex -= 1; setTimeout(tick, 32); return; }
    deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(tick, 260);
  };
  tick();
}

function initProjectDialog() {
  const dialog = $('#project-dialog');
  const content = $('#dialog-content');
  const close = () => dialog.close();
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-details]');
    if (!button) return;
    const project = SITE_CONFIG.projects[Number(button.dataset.projectDetails)];
    content.innerHTML = `<img class="dialog-project-image" src="${project.image}" alt="Placeholder visual for ${project.title}" /><div class="dialog-copy"><p class="eyebrow">PROJECT OVERVIEW</p><h2 id="dialog-title">${project.title}</h2><p>${project.description}</p><h3>Core features</h3><ul class="detail-feature-list">${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul><h3>Technology</h3><ul class="technology-list">${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}</ul></div>`;
    dialog.showModal();
  });
  $('.dialog-close').addEventListener('click', close);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
}

function initContactForm() {
  const form = $('#contact-form');
  const status = $('.form-status', form);
  const notice = $('.form-notice', form);
  const submitButton = $('button[type="submit"]', form);
  const defaultButtonMarkup = submitButton.innerHTML;
  const endpoint = String(SITE_CONFIG.contact?.formspreeEndpoint || '').trim();
  const isFormspreeEndpoint = /^https:\/\/formspree\.io\/f\/[a-z0-9]+(?:\?.*)?$/i.test(endpoint);

  if (isFormspreeEndpoint) {
    form.action = endpoint;
    form.method = 'post';
    notice.hidden = true;
  } else if (endpoint) {
    notice.innerHTML = '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Check <code>SITE_CONFIG.contact.formspreeEndpoint</code>; it must be a Formspree form endpoint.';
  }

  const validations = {
    name: (value) => value.trim().length >= 2 ? '' : 'Please enter at least 2 characters.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address.',
    subject: (value) => value.trim().length >= 3 ? '' : 'Please add a short subject.',
    message: (value) => value.trim().length >= 12 ? '' : 'Please write at least 12 characters.'
  };
  const validateField = (field) => {
    const message = validations[field.name](field.value);
    field.classList.toggle('invalid', Boolean(message));
    $('.field-error', field.closest('.form-field')).textContent = message;
    return !message;
  };
  $$('input, textarea', form).forEach((field) => field.addEventListener('blur', () => validateField(field)));
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fields = $$('input, textarea', form);
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      status.textContent = 'Please correct the highlighted fields and try again.';
      status.style.color = 'var(--danger)';
      return;
    }

    if (!isFormspreeEndpoint) {
      status.textContent = 'Form delivery is not configured yet. Add your Formspree endpoint in js/config.js.';
      status.style.color = 'var(--danger)';
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    status.style.color = 'var(--text-soft)';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const details = result.errors?.map((error) => error.message).filter(Boolean).join(' ') || 'Please try again in a moment.';
        throw new Error(details);
      }
      form.reset();
      fields.forEach((field) => {
        field.classList.remove('invalid');
        $('.field-error', field.closest('.form-field')).textContent = '';
      });
      status.textContent = 'Thanks — your message has been sent successfully.';
      status.style.color = 'var(--green)';
    } catch (error) {
      status.textContent = `Message could not be sent. ${error.message}`;
      status.style.color = 'var(--danger)';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = defaultButtonMarkup;
      form.removeAttribute('aria-busy');
    }
  });
}

function initTerminal() {
  const input = $('#terminal-input');
  const output = $('#terminal-output');
  const { profile, projects } = SITE_CONFIG;
  const getSocialValue = (label) => profile.social.find((social) => social.label === label)?.value || 'Not configured';
  const responses = {
    help: "Commands: help, whoami, about, skills, projects, contact, status, clear",
    whoami: profile.name.toLowerCase().replace(/\s+/g, '-'),
    about: profile.aboutIntro,
    skills: SITE_CONFIG.skills.flatMap((group) => group.items.map((skill) => skill.name)).join(' · '),
    projects: projects.map((project) => `• ${project.title}`).join('\n'),
    contact: `Email: ${profile.email}\nGitHub: github.com/${profile.githubUsername}\nInstagram: ${getSocialValue('Instagram')}\nWhatsApp: ${getSocialValue('WhatsApp')}`,
    status: 'Building the future...'
  };
  const append = (content, accent = false) => {
    const line = document.createElement('p');
    if (accent) line.innerHTML = `<span class="terminal-accent">${content}</span>`;
    else line.textContent = content;
    output.append(line); output.scrollTop = output.scrollHeight;
  };
  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const command = input.value.trim().toLowerCase();
    if (!command) return;
    append(`seven@portfolio:~$ ${command}`, true);
    if (command === 'clear') output.innerHTML = '';
    else append(responses[command] || `command not found: ${command}. Type 'help' for available commands.`);
    input.value = '';
  });
}

function initCursorGlow() {
  if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches) return;
  const cursor = $('.cursor-glow');
  document.addEventListener('mousemove', (event) => { cursor.style.left = `${event.clientX}px`; cursor.style.top = `${event.clientY}px`; cursor.classList.add('active'); });
  $$('a, button, input, textarea').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

function initCVPlaceholder() {
  $('#cv-link').addEventListener('click', (event) => {
    if (SITE_CONFIG.profile.cvUrl === '#') {
      event.preventDefault();
      const link = event.currentTarget;
      const initial = link.innerHTML;
      link.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Add your CV file';
      setTimeout(() => { link.innerHTML = initial; }, 1700);
    }
  });
}

function initializePortfolio() {
  bindProfileData(); renderSocialLinks(); renderStats(); renderSkills(); renderProjects(); renderTimeline(); renderGithub(); renderContactCards();
  initNavigation(); initTheme(); initRevealAnimations(); initScrollProgress(); initSmoothAnchorNavigation(); initBackToTop(); initTypingEffect(); initProjectDialog(); initContactForm(); initTerminal(); initCursorGlow(); initCVPlaceholder();
}

document.addEventListener('DOMContentLoaded', initializePortfolio);
