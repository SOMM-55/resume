import type { ResumeContent } from "./schema";

export const enContent: ResumeContent = {
  locale: "en",
  dir: "ltr",
  langName: "English",

  name: "Sayyid Omid Mousavi Mehr",
  headline: "Senior Data Engineer · Agentic Systems",
  subheadline:
    "7+ years in data engineering, system architecture, ETL/ELT pipelines, Node.js, TypeScript, Python, PostgreSQL, microservices, and AI-agent / Spec-Driven Development workflows.",
  about:
    "Full-Stack Developer with 7+ years of experience in data engineering and system architecture. Strong in Node.js, TypeScript, Python, and PostgreSQL, with hands-on work in microservices, ETL/ELT pipelines, and clean architecture. Recently I've been writing specifications and orchestrating AI agents through implementation — a workflow that cut typical multi-week builds down to days. Open to relocation across Germany, the Netherlands, and Scandinavia; visa sponsorship required.",
  relocation:
    "Open to relocation across Germany, the Netherlands, and Scandinavia · Visa sponsorship required",

  sections: {
    about: "About",
    experience: "Experience",
    projects: "Selected Projects",
    skills: "Skills & Stack",
    education: "Education",
    certificates: "Certifications",
    languages: "Languages",
    interests: "Interests",
    contact: "Contact",
  },

  ui: {
    downloadPdf: "Download PDF",
    downloadingPdf: "Preparing PDF…",
    printResume: "Print",
    commandPalette: "Command Palette",
    commandPaletteHint: "Press ⌘K or ? for commands",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Switch language",
    present: "Present",
    technologies: "Technologies",
    viewOnGithub: "GitHub",
    viewLive: "Live",
    awardLabel: "Award",
    thesis: "Thesis",
    problem: "Problem",
    approach: "Approach",
    outcome: "Outcome",
    skipToContent: "Skip to content",
    copiedToClipboard: "Copied to clipboard",
    copyLink: "Copy link",
    privacyNotice: "Privacy-first analytics",
    privacyNoticeDetail:
      "No cookies, no fingerprinting, and no raw IP addresses stored. Hashed daily with salt.",
    contactCta: "Get in touch",
    contactDirectEmail: "Direct email",
    contactFormName: "Your name",
    contactFormEmail: "Your email",
    contactFormMessage: "Your message",
    contactFormSend: "Send message",
    contactFormSending: "Sending…",
    contactFormSuccess: "Message sent! I'll get back to you shortly.",
    contactFormError: "Failed to send message. Please email directly.",
    visitorsOnline: "live",
  },

  contact: {
    email: "s.omid.m.mehr@gmail.com",
    phone: "+98 915 911 3904",
    phoneHref: "+989159113904",
    location: "Mashhad, Iran",
    linkedin: "linkedin.com/in/sommehr",
    linkedinHref: "https://linkedin.com/in/sommehr",
    github: "github.com/SOMM-55",
    githubHref: "https://github.com/SOMM-55",
  },

  jobs: [
    {
      role: "AI-Native / Agentic Systems Engineer",
      company: "Part Software Group",
      location: "Mashhad, Iran",
      period: "Mar 2026 – Present",
      typeLabel: "Full-time",
      modelLabel: "On-site",
      overview:
        "Solo-architecting and shipping a commercial-scale production system using an agent-driven development workflow — writing specifications, orchestrating AI agents through implementation, and owning verification/release myself end-to-end.",
      achievements: [
        "Shipped a mechanized document-registration MVP in 10 days for a platform serving Iran’s Document Registration Organization — spec written, agent-implemented, reviewed before release; the MVP secured official licensing.",
        "Built a side project (file-sharing app) in 2 days to benchmark the spec-driven workflow against real CRUD and stateful use cases.",
        "Built security and usability audit agents that produce a pre-release checklist — caught issues before they reached production.",
      ],
      tech: [
        "TypeScript",
        "Next.js",
        "Node.js",
        "Docker",
        "Agentic Frameworks",
        "Spec-Driven Development",
      ],
    },
    {
      role: "Data Engineer",
      company: "Part Software Group",
      location: "Mashhad, Iran",
      period: "Sep 2022 – Mar 2026",
      typeLabel: "Full-time",
      modelLabel: "On-site",
      overview:
        "Designed and maintained data processing pipelines for reporting and aggregate datasets across database and backend layers, handling hundreds of gigabytes of data. Applied the microkernel architecture pattern to build “Delta”, a versatile data-processing server and client communicating over HTTP and gRPC.",
      achievements: [
        "Built scalable data processing pipelines in Node.js and Python for reporting and aggregate data at hundreds-of-GB scale.",
        "Applied the microkernel architecture pattern to Delta, enabling versatile data acquisition and processing over HTTP and gRPC.",
        "Secured 2nd place in the company’s Data Date Challenge.",
      ],
      tech: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Linux",
        "gRPC",
        "Redis",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "TCI — Telecommunication Company of Iran",
      location: "Mashhad, Iran",
      period: "Jan 2015 – Apr 2023",
      typeLabel: "Full-time",
      modelLabel: "On-site",
      overview:
        "Designed, developed, and deployed a web-based workflow management system (mini-ERP) for the technical-support ISP branch, used daily by 80+ employees and managers and replacing thousands of paper forms per month. Combined solo development with a 2-person team, leading the project while completing the M.Sc. on a flexible night-shift schedule.",
      achievements: [
        "Designed and built a web-based workflow management system (mini-ERP) for the ISP technical-support branch, adopted by 80+ daily users.",
        "Streamlined operations with 20+ modules (Notifications, Archives, Employee Evaluation, Work-Shift Management), reducing manual work and errors.",
        "Implemented granular access control with 80+ permission groups for tailored, secure module access.",
        "Cut paper usage by thousands of forms per month, contributing to a more efficient and eco-friendly workplace.",
        "Led the project within a 2-person team while studying for the M.Sc., working flexible night shifts to balance both.",
      ],
      tech: [
        "PHP",
        "MySQL",
        "JavaScript",
        "jQuery",
        "HTML5",
        "CSS3",
        "Bootstrap 4",
      ],
    },
  ],

  projects: [
    {
      name: "Mechanized Document Registration MVP",
      tagline: "Commercial production system delivered via SDD",
      problem:
        "Large-scale manual document intake created licensing bottlenecks for Iran’s Document Registration Organization.",
      approach:
        "Wrote rigorous technical specifications and orchestrated AI agents to generate services, UI, and test suites with end-to-end human verification.",
      outcome:
        "Shipped in 10 days; secured official licensing; established organization's SDD benchmark.",
      tech: ["TypeScript", "Next.js", "Node.js", "Docker", "SDD"],
    },
    {
      name: "Delta — Microkernel Data Processing Engine",
      tagline: "Extensible ETL/ELT runtime across HTTP & gRPC",
      problem:
        "Disparate data ingestion sources and reporting schemas required a modular, plugin-based architecture at hundreds-of-GB scale.",
      approach:
        "Applied microkernel architecture pattern separating a lightweight core runtime from swappable source, transformer, and sink plugins.",
      outcome:
        "Unified high-throughput pipeline handling company reporting datasets; powered 2nd place win in Data Date Challenge.",
      tech: ["Node.js", "Python", "gRPC", "PostgreSQL", "MongoDB", "Linux"],
    },
    {
      name: "File-Sharing App",
      tagline: "CRUD & streaming benchmark for agentic workflows",
      problem:
        "Needed a real-world benchmark to test agentic spec-driven workflows against chunked uploads, resumable streams, and stateful auth.",
      approach:
        "Authored modular specs for chunked multipart upload, resumable streaming, and token auth, executed via agent harness.",
      outcome:
        "Fully working production-grade app shipped in 2 days from scratch.",
      tech: ["Next.js", "Node.js", "TypeScript", "Docker"],
      github: "https://github.com/SOMM-55",
    },
    {
      name: "ISP Technical Support Mini-ERP",
      tagline: "Enterprise workflow automation for 80+ daily staff",
      problem:
        "Manual paper workflows and shift evaluations caused operational delay and data loss across ISP technical support branches.",
      approach:
        "Built 20+ specialized modules (shift management, archive, employee evaluation) with 80+ granular role-based permission groups.",
      outcome:
        "Adopted by 80+ employees and managers daily for 8+ years; eliminated thousands of paper forms per month.",
      tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Linux"],
    },
  ],

  skills: [
    {
      label: "Data Engineering",
      items: [
        "ETL / ELT Pipelines",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch / OpenSearch",
        "gRPC",
        "Gigabyte-scale Data",
      ],
    },
    {
      label: "AI-Agent Engineering",
      items: [
        "Spec-Driven Development (SDD)",
        "Harness Engineering",
        "Agentic Frameworks",
        "Prompt Architecture",
      ],
    },
    {
      label: "Programming Languages",
      items: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL", "PHP"],
    },
    {
      label: "Frameworks & Libraries",
      items: [
        "Next.js",
        "React",
        "Express",
        "Django",
        "Flask",
        "Tailwind CSS",
        "Prisma",
      ],
    },
    {
      label: "DevOps & Infrastructure",
      items: [
        "Linux (kernel tools)",
        "Docker",
        "GitLab CI",
        "Grafana",
        "OpenTelemetry",
        "Kubernetes (familiar)",
      ],
    },
    {
      label: "Architecture & Methodologies",
      items: [
        "Clean Architecture",
        "Microservices",
        "Microkernel",
        "MVC / MTV",
        "Saga",
        "Event-Driven",
        "REST API Design",
        "TDD",
        "Agile",
      ],
    },
  ],

  education: [
    {
      degree: "M.Sc. Computer Software Engineering",
      institution: "Imam Reza International University",
      location: "Mashhad, Iran",
      period: "Oct 2015 – Sep 2018",
      grade: "GPA: 17.06/20 (≈ 1.7 German scale)",
      thesis: "Context-aware Recommendation Systems",
    },
    {
      degree: "B.Sc. Computer Software Engineering",
      institution: "Imam Reza International University",
      location: "Mashhad, Iran",
      period: "Oct 2010 – Sep 2014",
      grade: "GPA: 16.50/20 (≈ 2.3 German scale)",
    },
  ],

  certificates: [
    {
      name: "Professional Project-oriented Course: Back-end Development with Django",
      issuer: "Quera.org",
    },
    {
      name: "Professional Project-oriented Course: Front-end Development with React",
      issuer: "Quera.org",
    },
  ],

  languagesKnown: [
    { name: "Persian", level: "Native" },
    { name: "English", level: "Working Proficiency" },
  ],

  interests: ["Gaming", "Miniature wooden structure building", "Piano"],
  award: "2nd place — Part Software Group Data Date Challenge",
};
