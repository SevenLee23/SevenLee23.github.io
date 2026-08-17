/*
 * Portfolio configuration
 * ───────────────────────
 * Edit personal details, links, skills, projects, timeline entries, and
 * GitHub sample data here. The interaction/rendering code is in script.js.
 */

window.SITE_CONFIG = {
  profile: {
    name: "SEVENLEE",
    role: "IT Developer & Software Engineer",
    tagline: "I build scalable software, intelligent systems, modern web applications, and automation solutions.",
    aboutIntro: "I'm an aspiring software engineer who enjoys turning complex problems into clear, useful digital experiences.",
    aboutPhilosophy: "I care about readable code, pragmatic systems, and the small details that make a product feel reliable. My interests span web development, automation, data, and intelligent software.",
    learning: "Deepening my knowledge of system design, cloud-ready applications, and applied AI.",
    objective: "To contribute to thoughtful engineering teams and ship software that genuinely helps people.",
    email: "lequangthanh7t@gmail.com",
    githubUsername: "SevenLee23",
    cvUrl: "./assets/CV.pdf",
    social: [
      { label: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/SevenLee23", value: "SevenLee23" },
      { label: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com/sevenlee.07/", value: "@sevenlee.07" },
      { label: "Discord", icon: "fa-brands fa-discord", url: "https://discord.com/users/741223887907323956", value: "SevenLee__" },
      { label: "Facebook", icon: "fa-brands fa-facebook-f", url: "https://facebook.com/sevenlee.0", value: "@sevenlee.0" },
      { label: "WhatsApp", icon: "fa-brands fa-whatsapp", url: "https://wa.me/84376983570", value: "+84 376 983 570" }
    ]
  },

  contact: {
    // Create a Formspree form, then paste its unique endpoint here.
    // Example: "https://formspree.io/f/abcdwxyz"
    formspreeEndpoint: "https://formspree.io/f/xdenwegg"
  },

  stats: [
    { value: "10", label: "Projects Completed", icon: "\uf0ae" },
    { value: "15+", label: "Technologies Explored", icon: "\uf121" },
    { value: "3+", label: "Years Learning", icon: "\uf19d" },
    { value: "1000+", label: "Lines of Code", icon: "\uf1c9" }
  ],

  // Icons use Font Awesome class names. Percentages are editable sample values.
  skills: [
    { title: "Programming Languages", icon: "fa-solid fa-code", items: [
      { name: "Python", icon: "fa-brands fa-python", level: 65 }, { name: "JavaScript", icon: "fa-brands fa-js", level: 54 },
      { name: "C++", icon: "fa-solid fa-code", level: 60 }, { name: "SQL", icon: "fa-solid fa-database", level: 60 },
      { name: "HTML", icon: "fa-brands fa-html5", level: 70 }, { name: "CSS", icon: "fa-brands fa-css3-alt", level: 70 }
    ] },
    { title: "Frameworks & Libraries", icon: "fa-solid fa-layer-group", items: [
      { name: "Discord.py", icon: "fa-brands fa-discord", level: 20 }, { name: "Flask", icon: "fa-solid fa-flask", level: 20 },
      { name: "FastAPI", icon: "fa-solid fa-bolt", level: 25 }, { name: "React", icon: "fa-brands fa-react", level: 30 },
      { name: "Bootstrap", icon: "fa-brands fa-bootstrap", level: 60 }, { name: "Pandas", icon: "fa-solid fa-table", level: 40 },
      { name: "NumPy", icon: "fa-solid fa-calculator", level: 65 }, { name: "Scikit-learn", icon: "fa-solid fa-brain", level: 45 }
    ] },
    { title: "Databases", icon: "fa-solid fa-database", items: [
      { name: "MySQL", icon: "fa-solid fa-database", level: 50 }, { name: "PostgreSQL", icon: "fa-solid fa-database", level: 25 },
      { name: "SQL Server", icon: "fa-solid fa-server", level: 50 }, { name: "SQLite", icon: "fa-solid fa-database", level: 30 },
      { name: "MongoDB", icon: "fa-solid fa-leaf", level: 45 }
    ] },
    { title: "Tools", icon: "fa-solid fa-screwdriver-wrench", items: [
      { name: "Git", icon: "fa-brands fa-git-alt", level: 70 }, { name: "GitHub", icon: "fa-brands fa-github", level: 70 },
      { name: "VS Code", icon: "fa-solid fa-code", level: 80 }, { name: "Docker", icon: "fa-brands fa-docker", level: 20 },
      { name: "Linux", icon: "fa-brands fa-linux", level: 35 }, { name: "Postman", icon: "fa-solid fa-paper-plane", level: 50 }
    ] },
    { title: "AI / Data", icon: "fa-solid fa-brain", items: [
      { name: "Machine Learning", icon: "fa-solid fa-brain", level: 30 }, { name: "Computer Vision", icon: "fa-solid fa-eye", level: 35 },
      { name: "Data Analysis", icon: "fa-solid fa-chart-column", level: 45 }, { name: "Neural Networks", icon: "fa-solid fa-diagram-project", level: 20 },
      { name: "OpenCV", icon: "fa-solid fa-camera", level: 30 }, { name: "MediaPipe", icon: "fa-solid fa-hand", level: 45 }
    ] }
  ],

  projects: [
    {
      title: "Portfolio Website",
      image: "assets/projects/portfolio-preview.png",
      description: "A modern, responsive portfolio website showcasing my work and skills.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      features: ["Responsive design", "Interactive elements", "Smooth animations", "Contact form"],
      github: "https://github.com/SevenLee23/SevenLee23.github.io", live: "https://sevenlee.is-a.dev/"
    },
    {
      title: "Love Story",
      image: "assets/projects/love-story.svg",
      description: "A simple love story told through code.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Interactive narrative", "Visual storytelling", "Responsive design"],
      github: "https://github.com/SevenLee23/Love_Story", live: "https://sevenlee.is-a.dev/Love_Story/"
    },
    {
      title: "Enterprise Discord Management Bot",
      image: "assets/projects/discord-bot.svg",
      description: "A modular community-management bot concept focused on reliable moderation, clear permissions, and useful automation.",
      technologies: ["Python", "discord.py", "SQLite/PostgreSQL", "JSON", "AsyncIO"],
      features: ["Moderation", "AutoMod", "Permission management", "Logging", "Anti-link", "Welcome system", "Role management", "Music system"],
      // Leave a link blank to hide its GitHub or Live Demo button.
      github: "", live: ""
    },
    {
      title: "Finger Tracking & Visual Effects",
      image: "assets/projects/finger-tracking.svg",
      description: "A real-time computer-vision experiment that follows hand landmarks and layers expressive visual effects onto camera input.",
      technologies: ["Python", "OpenCV", "MediaPipe"],
      features: ["Hand landmark detection", "Finger tracking", "Real-time camera processing", "Anime effects", "Cartoon effects", "Neon effects"],
      github: "", live: ""
    }
  ],

  timeline: [
    { date: "Present", title: "Freelancer", organization: "Computer repair technician", description: "Providing computer repair and maintenance services.", technologies: ["Programming", "Systems", "Problem solving"] },
    { date: "09/2023 - Present", title: "University Student", organization: "Student", description: "I am currently pursuing a degree in IT.", technologies: ["Python", "JavaScript", "SQL"] },
    { date: "09/2024 - 3/2025", title: "University Teaching Assistant", organization: "Teacher", description: "I assist instructors with IT teaching.", technologies: ["Python", "Teacher", "Frontend"] }, 
  ],

  // Replace this object with GitHub API data when ready.
  github: {
    repositoryCount: "02", stars: "00", followers: "00", contributions: "000",
    popularRepos: [
      { name: "SevenLee23.github.io", description: "My personal website and portfolio.", stars: "0" },
      { name: "Love_Story", description: "A simple love story told through code.", stars: "0" },
      { name: "Enterprise Discord Management Bot", description: "A modular community-management bot concept. Coming soon!", stars: "0" },
      { name: "Finger Tracking & Visual Effects", description: "A real-time computer-vision experiment that follows hand landmarks and layers expressive visual effects onto camera input. Coming soon!", stars: "0" }
    ]
  }
};
