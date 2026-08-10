/**
 * Resume data — Sayyid Omid Mousavi Mehr
 * Full-Stack Developer · Data Engineering & System Architecture
 *
 * Multi-language content for EN / FA / DE / ZH / JA / ES / RU / AR.
 * English is the default (SSR-rendered, ATS-visible). All other languages
 * are swapped client-side via the language switcher.
 */

export type LangCode = "en" | "fa" | "de" | "zh" | "ja" | "es" | "ru" | "ar";

export interface JobT {
  role: string;
  company: string;
  location: string;
  period: string;
  typeLabel: string;
  modelLabel: string;
  overview: string;
  achievements: string[];
  tech: string[];
}

export interface SkillGroupT {
  label: string;
  items: string[];
}

export interface LangContent {
  dir: "ltr" | "rtl";
  langName: string;
  ui: {
    print: string;
    language: string;
    present: string;
    awardLabel: string;
    gpaNote: string;
    native: string;
    working: string;
    thesis: string;
    techLabel: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  sections: {
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    certificates: string;
    languages: string;
    interests: string;
  };
  title: string;
  eyebrow: string;
  summary: string;
  jobs: JobT[];
  projects: { name: string; description: string; tech: string }[];
  skills: SkillGroupT[];
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    grade: string;
    thesis?: string;
  }[];
  certificates: { name: string; issuer: string }[];
  languagesKnown: { name: string; level: string }[];
  interests: string[];
  award: string;
}

/** Constant identity info (language-independent unless overridden via nameLocalized) */
export const identity: {
  name: string;
  nameLocalized: Record<string, string>;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  linkedin: string;
  linkedinHref: string;
  github: string;
  githubHref: string;
} = {
  name: "Sayyid Omid Mousavi Mehr",
  nameLocalized: { fa: "سید امید موسوی‌مهر" },
  email: "s.omid.m.mehr@gmail.com",
  phone: "+98 915 911 3904",
  phoneHref: "+989159113904",
  location: "Mashhad, Iran",
  linkedin: "linkedin.com/in/sommehr",
  linkedinHref: "https://linkedin.com/in/sommehr",
  github: "github.com/SOMM-55",
  githubHref: "https://github.com/SOMM-55",
};

export const languages: { code: LangCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی" },
  { code: "de", label: "Deutsch" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
];

/** Extra UI strings for the new toolbar controls (dark mode, download, zoom, etc.) */
export interface UiExtra {
  darkMode: string;
  lightMode: string;
  download: string;
  downloadTitle: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
  atsBadge: string;
  atsBadgeTitle: string;
  preparing: string;
  keyboardHint: string;
  copyText: string;
  copyTextTitle: string;
  copied: string;
  copyFailed: string;
  quickJump: string;
  proficiency: string;
}

/** Proficiency level for a skill item (1-5 dots). "skills" array items may optionally be objects. */
export interface SkillItem {
  name: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

export const uiStrings: Record<LangCode, UiExtra> = {
  en: {
    darkMode: "Dark mode",
    lightMode: "Light mode",
    download: "Download HTML",
    downloadTitle: "Download a self-contained HTML copy of this resume",
    zoomIn: "Increase text size",
    zoomOut: "Decrease text size",
    reset: "Reset",
    atsBadge: "ATS-ready",
    atsBadgeTitle: "Semantic HTML · schema.org microdata · print-friendly",
    preparing: "Preparing print…",
    keyboardHint: "Shortcuts: P print · D download · +/- zoom",
    copyText: "Copy text",
    copyTextTitle: "Copy a plain-text version of this resume for pasting into ATS web-forms",
    copied: "Copied!",
    copyFailed: "Copy failed",
    quickJump: "Jump to section",
    proficiency: "Proficiency",
  },
  fa: {
    darkMode: "حالت تاریک",
    lightMode: "حالت روشن",
    download: "دانلود HTML",
    downloadTitle: "دانلود یک نسخه HTML مستقل از این رزومه",
    zoomIn: "بزرگ‌نمایی متن",
    zoomOut: "کوچک‌نمایی متن",
    reset: "بازنشانی",
    atsBadge: "آماده برای ATS",
    atsBadgeTitle: "HTML معنایی · میکرودیتای schema.org · مناسب چاپ",
    preparing: "آماده‌سازی چاپ…",
    keyboardHint: "میانبرها: P چاپ · D دانلود · +/- بزرگ‌نمایی",
    copyText: "کپی متن",
    copyTextTitle: "کپی نسخه متنی ساده رزومه برای جای‌گذاری در فرم‌های ATS",
    copied: "کپی شد!",
    copyFailed: "کپی ناموفق",
    quickJump: "پرش به بخش",
    proficiency: "سطح تسلط",
  },
  de: {
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    download: "HTML herunterladen",
    downloadTitle: "Eigenständige HTML-Kopie dieses Lebenslaufs herunterladen",
    zoomIn: "Schrift vergrößern",
    zoomOut: "Schrift verkleinern",
    reset: "Zurücksetzen",
    atsBadge: "ATS-bereit",
    atsBadgeTitle: "Semantisches HTML · schema.org Microdata · druckfreundlich",
    preparing: "Druck wird vorbereitet …",
    keyboardHint: "Tastenkürzel: P drucken · D herunterladen · +/- Zoom",
    copyText: "Text kopieren",
    copyTextTitle: "Klartext-Version des Lebenslaufs kopieren (zum Einfügen in ATS-Webformulare)",
    copied: "Kopiert!",
    copyFailed: "Kopieren fehlgeschlagen",
    quickJump: "Zum Abschnitt springen",
    proficiency: "Kenntnisstand",
  },
  zh: {
    darkMode: "深色模式",
    lightMode: "浅色模式",
    download: "下载 HTML",
    downloadTitle: "下载本简历的独立 HTML 副本",
    zoomIn: "放大文字",
    zoomOut: "缩小文字",
    reset: "重置",
    atsBadge: "ATS 就绪",
    atsBadgeTitle: "语义化 HTML · schema.org 微数据 · 适合打印",
    preparing: "正在准备打印…",
    keyboardHint: "快捷键：P 打印 · D 下载 · +/- 缩放",
    copyText: "复制文本",
    copyTextTitle: "复制本简历的纯文本版本，便于粘贴到 ATS 网页表单",
    copied: "已复制！",
    copyFailed: "复制失败",
    quickJump: "跳转到章节",
    proficiency: "熟练度",
  },
  ja: {
    darkMode: "ダークモード",
    lightMode: "ライトモード",
    download: "HTMLをダウンロード",
    downloadTitle: "この履歴書の自己完結型HTMLコピーをダウンロード",
    zoomIn: "文字を拡大",
    zoomOut: "文字を縮小",
    reset: "リセット",
    atsBadge: "ATS対応",
    atsBadgeTitle: "セマンティックHTML · schema.orgマイクロデータ · 印刷向け",
    preparing: "印刷を準備中…",
    keyboardHint: "ショートカット：P 印刷 · D ダウンロード · +/- ズーム",
    copyText: "テキストをコピー",
    copyTextTitle: "ATSのWebフォームに貼り付けるためのプレーンテキスト版をコピー",
    copied: "コピー済み！",
    copyFailed: "コピー失敗",
    quickJump: "セクションへジャンプ",
    proficiency: "習熟度",
  },
  es: {
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    download: "Descargar HTML",
    downloadTitle: "Descargar una copia HTML autocontenida de este currículum",
    zoomIn: "Aumentar texto",
    zoomOut: "Disminuir texto",
    reset: "Restablecer",
    atsBadge: "Listo para ATS",
    atsBadgeTitle: "HTML semántico · microdatos schema.org · apto para imprimir",
    preparing: "Preparando impresión…",
    keyboardHint: "Atajos: P imprimir · D descargar · +/- zoom",
    copyText: "Copiar texto",
    copyTextTitle: "Copia una versión en texto plano del currículum para pegar en formularios ATS",
    copied: "¡Copiado!",
    copyFailed: "Copia fallida",
    quickJump: "Ir a la sección",
    proficiency: "Nivel",
  },
  ru: {
    darkMode: "Тёмная тема",
    lightMode: "Светлая тема",
    download: "Скачать HTML",
    downloadTitle: "Скачать автономную HTML-копию этого резюме",
    zoomIn: "Увеличить текст",
    zoomOut: "Уменьшить текст",
    reset: "Сбросить",
    atsBadge: "Готово для ATS",
    atsBadgeTitle: "Семантический HTML · микроданные schema.org · для печати",
    preparing: "Подготовка печати…",
    keyboardHint: "Горячие клавиши: P печать · D скачать · +/- масштаб",
    copyText: "Копировать текст",
    copyTextTitle: "Копировать текстовую версию резюме для вставки в ATS-формы",
    copied: "Скопировано!",
    copyFailed: "Не удалось скопировать",
    quickJump: "Перейти к разделу",
    proficiency: "Уровень владения",
  },
  ar: {
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    download: "تنزيل HTML",
    downloadTitle: "تنزيل نسخة HTML مستقلة من هذه السيرة الذاتية",
    zoomIn: "تكبير النص",
    zoomOut: "تصغير النص",
    reset: "إعادة ضبط",
    atsBadge: "جاهز لـ ATS",
    atsBadgeTitle: "HTML دلالي · بيانات schema.org · مناسب للطباعة",
    preparing: "جارٍ تجهيز الطباعة…",
    keyboardHint: "اختصارات: P طباعة · D تنزيل · +/- تكبير",
    copyText: "نسخ النص",
    copyTextTitle: "نسخ نسخة نصية بسيطة من السيرة الذاتية للصقها في نماذج ATS",
    copied: "تم النسخ!",
    copyFailed: "فشل النسخ",
    quickJump: "الانتقال إلى القسم",
    proficiency: "مستوى الإتقان",
  },
};

export const content: Record<LangCode, LangContent> = {
  /* ───────────────────────────── ENGLISH ───────────────────────────── */
  en: {
    dir: "ltr",
    langName: "English",
    title: "Senior Data Engineer · Agentic Systems",
    eyebrow: "7+ yrs · Data Pipelines · AI-Agent Workflows",
    ui: {
      print: "Print / Save as PDF",
      language: "Language",
      present: "Present",
      awardLabel: "Award",
      gpaNote: "German scale approx.",
      native: "Native",
      working: "Working Proficiency",
      thesis: "Thesis",
      techLabel: "Technologies",
    },
    contact: {
      email: "Email",
      phone: "Phone",
      location: "Location",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      summary: "Professional Summary",
      experience: "Professional Experience",
      projects: "Projects",
      skills: "Technical Skills",
      education: "Education",
      certificates: "Certificates",
      languages: "Languages",
      interests: "Interests",
    },
    summary:
      "Full-Stack Developer with 7+ years of experience in data engineering and system architecture. Strong in Node.js, TypeScript, Python, and PostgreSQL, with hands-on work in microservices, ETL/ELT pipelines, and clean architecture. Recently I've been writing specs and having AI agents implement them — a workflow that cut typical multi-week builds down to days. Open to relocation across Germany, the Netherlands, and Scandinavia; visa sponsorship required.",
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
          "Built two side projects (file-sharing app, todo list) in 2 days each to benchmark the spec-driven workflow against real CRUD and stateful use cases.",
          "Built security and usability audit agents that produce a pre-release checklist — caught issues before they reached production.",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
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
          "Designed and maintained data processing pipelines for reporting and aggregate datasets across the database and backend layers, handling hundreds of gigabytes of data. Applied the microkernel architecture pattern to build “Delta”, a data-processing server and client communicating over HTTP and gRPC.",
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
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "File-Sharing App",
        description:
          "Chunked upload, resumable downloads, and a minimal auth layer. Built in 2 days as a CRUD-heavy benchmark for the spec-driven workflow.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
      {
        name: "Todo List",
        description:
          "Optimistic UI updates, keyboard-driven navigation, and localStorage persistence. Built in 2 days to test the workflow on stateful UI patterns.",
        tech: "Next.js, Node.js, TypeScript, Docker",
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
        ],
      },
      {
        label: "Programming Languages",
        items: [
          "Node.js",
          "JavaScript",
          "TypeScript",
          "Python",
          "SQL",
        ],
      },
      {
        label: "Frameworks & Libraries",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
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
      {
        label: "Familiar With",
        items: ["Kubernetes"],
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
  },

  /* ───────────────────────────── PERSIAN ───────────────────────────── */
  fa: {
    dir: "rtl",
    langName: "فارسی",
    title: "مهندس ارشد داده · سیستم‌های Agentic",
    eyebrow: "۷+ سال · پایپ‌لاین داده · گردش‌کار AI-Agent",
    ui: {
      print: "چاپ / ذخیره به‌صورت PDF",
      language: "زبان",
      present: "اکنون",
      awardLabel: "جایزه",
      gpaNote: "تقریبی بر اساس مقیاس آلمانی",
      native: "زبان مادری",
      working: "سطح کاری",
      thesis: "پایان‌نامه",
      techLabel: "تکنولوژی‌ها",
    },
    contact: {
      email: "ایمیل",
      phone: "تلفن",
      location: "محل سکونت",
      linkedin: "لینکدین",
      github: "گیت‌هاب",
    },
    sections: {
      summary: "خلاصه حرفه‌ای",
      experience: "سوابق شغلی",
      projects: "پروژه‌ها",
      skills: "مهارت‌های فنی",
      education: "تحصیلات",
      certificates: "گواهی‌نامه‌ها",
      languages: "زبان‌ها",
      interests: "علاقه‌مندی‌ها",
    },
    summary:
      "توسعه‌دهنده فول‌استک با بیش از ۷ سال تجربه در مهندسی داده و معماری سیستم. مسلط به Node.js، TypeScript، Python و PostgreSQL، با تجربه دستی در معماری مایکروسرویس، پایپ‌لاین‌های ETL/ELT و معماری تمیز. اخیراً مشخصه می‌نویسم و پیاده‌سازی را به agentهای هوش مصنوعی می‌سپارم — رویکردی که ساخت پروژه‌های معمول چند هفته‌ای را به چند روز رسانده است. آماده مهاجرت به آلمان، هلند و اسکاندیناوی؛ نیازمند اسپانسرشیپ ویزا.",
    jobs: [
      {
        role: "مهندس سیستم‌های AI-Native / Agentic",
        company: "Part Software Group",
        location: "مشهد، ایران",
        period: "مارس ۲۰۲۶ – اکنون",
        typeLabel: "تمام‌وقت",
        modelLabel: "حضوری",
        overview:
          "معماری مستقل و تحویل یک سیستم تولیدی تجاری‌مقیاس با گردش‌کار توسعه مبتنی بر agent — نوشتن مشخصه‌ها، هدایت agentهای هوش مصنوعی در پیاده‌سازی، و مالکیت کامل تأیید و انتشار از ابتدا تا انتها.",
        achievements: [
          "تحویل MVP ثبت مکانیزه اسناد در ۱۰ روز برای پلتفرمی در خدمت سازمان ثبت اسناد ایران — مشخصه نوشته شد، توسط agent پیاده‌سازی شد، قبل از انتشار بازبینی شد؛ این MVP مجوز رسمی را کسب کرد.",
          "ساخت دو پروژه جانبی (اپ اشتراک فایل، todolist) هر کدام در ۲ روز برای راستی‌آزمایی گردش‌کار مشخصه‌محور در کاربردهای واقعی CRUD و stateful.",
          "ساخت agentهای ممیزی امنیتی و کاربری که یک چک‌لیست پیش از انتشار تولید می‌کنند — مشکلات را قبل از رسیدن به تولید شناسایی کردند.",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "مهندس داده",
        company: "Part Software Group",
        location: "مشهد، ایران",
        period: "سپتامبر ۲۰۲۲ – مارس ۲۰۲۶",
        typeLabel: "تمام‌وقت",
        modelLabel: "حضوری",
        overview:
          "طراحی و نگهداری پایپ‌لاین‌های پردازش داده برای داده‌های گزارش‌گیری و تجمیعی در لایه‌های دیتابیس و بک‌اند، با پردازش صدها گیگابایت داده. به‌کارگیری الگوی معماری میکروکرنل برای ساخت «Delta»، یک سرور و کلاینت پردازش داده با ارتباط روی HTTP و gRPC.",
        achievements: [
          "ساخت پایپ‌لاین‌های مقیاس‌پذیر پردازش داده با Node.js و Python برای داده‌های گزارش‌گیری و تجمیعی در مقیاس صدها گیگابایت.",
          "به‌کارگیری الگوی معماری میکروکرنل در Delta برای جمع‌آوری و پردازش همه‌منظوره داده روی HTTP و gRPC.",
          "کسب مقام دوم در Data Date Challenge شرکت.",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "توسعه‌دهنده فول‌استک",
        company: "شرکت مخابرات ایران (TCI)",
        location: "مشهد، ایران",
        period: "ژانویه ۲۰۱۵ – آوریل ۲۰۲۳",
        typeLabel: "تمام‌وقت",
        modelLabel: "حضوری",
        overview:
          "طراحی، توسعه و استقرار سیستم مبتنی بر وب مدیریت گردش‌کار (mini-ERP) برای شعبه پشتیبانی فنی ISP، با استفاده روزانه بیش از ۸۰ کارمند و مدیر و جایگزینی هزاران فرم کاغذی در ماه. ترکیب توسعه انفرادی با تیم دو نفره و رهبری پروژه در کنار تحصیل در مقطع ارشد با ساعت کاری شناور (شب‌کار).",
        achievements: [
          "طراحی و ساخت سیستم مبتنی بر وب مدیریت گردش‌کار (mini-ERP) برای شعبه پشتیبانی فنی ISP، با پذیرش بیش از ۸۰ کاربر روزانه.",
          "بهینه‌سازی فرایندها با ۲۰+ ماژول (اعلان‌ها، آرشیو، ارزیابی کارکنان، مدیریت شیفت) و کاهش کار دستی و خطاها.",
          "پیاده‌سازی کنترل دسترسی ریزدانه با ۸۰+ گروه دسترسی برای دسترسی امن و سفارشی به ماژول‌ها.",
          "کاهش مصرف کاغذ به‌اندازه هزاران فرم در ماه و کمک به محیط‌کاری کارآمدتر و دوست‌دار محیط‌زیست.",
          "رهبری پروژه در تیم دو نفره در کنار تحصیل در مقطع ارشد با شیفت‌های شبانه انعطاف‌پذیر برای توازن هر دو.",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "اپ اشتراک‌گذاری فایل",
        description:
          "آپلود تکه‌ای، دانلود قابل‌ادامه و لایه احراز هویت مینیمال. ساخته‌شده در ۲ روز به‌عنوان معیار CRUD-محور برای گردش‌کار مشخصه‌محور.",
        tech: "Next.js، Node.js، TypeScript، Docker",
      },
      {
        name: "فهرست کارها (Todo List)",
        description:
          "به‌روزرسانی خوش‌بینانه رابط، ناوبری کیبوردمحور و ماندگاری در localStorage. ساخته‌شده در ۲ روز برای آزمایش گردش‌کار روی الگوهای رابط stateful.",
        tech: "Next.js، Node.js، TypeScript، Docker",
      },
    ],
    skills: [
      {
        label: "مهندسی داده",
        items: [
          "پایپ‌لاین‌های ETL/ELT",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "داده در مقیاس گیگابایت",
        ],
      },
      {
        label: "مهندسی AI-Agent",
        items: [
          "SDD (توسعه مبتنی بر مشخصه)",
          "Harness Engineering",
          "چارچوب‌های Agentic",
        ],
      },
      {
        label: "زبان‌های برنامه‌نویسی",
        items: [
          "Node.js",
          "JavaScript",
          "TypeScript",
          "Python",
          "SQL",
        ],
      },
      {
        label: "فریم‌ورک‌ها و کتابخانه‌ها",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps و زیرساخت",
        items: [
          "Linux (ابزارهای کرنل)",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "معماری و متدولوژی",
        items: [
          "معماری تمیز",
          "مایکروسرویس",
          "میکروکرنل",
          "MVC / MTV",
          "Saga",
          "Event-Driven",
          "طراحی REST API",
          "TDD",
          "Agile",
        ],
      },
      {
        label: "آشنا با",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "کارشناسی ارشد مهندسی نرم‌افزار کامپیوتر",
        institution: "دانشگاه بین‌المللی امام رضا",
        location: "مشهد، ایران",
        period: "اکتبر ۲۰۱۵ – سپتامبر ۲۰۱۸",
        grade: "معدل: ۱۷.۰۶/۲۰ (≈ ۱.۷ مقیاس آلمانی)",
        thesis: "سیستم‌های توصیه‌گر context-aware",
      },
      {
        degree: "کارشناسی مهندسی نرم‌افزار کامپیوتر",
        institution: "دانشگاه بین‌المللی امام رضا",
        location: "مشهد، ایران",
        period: "اکتبر ۲۰۱۰ – سپتامبر ۲۰۱۴",
        grade: "معدل: ۱۶.۵۰/۲۰ (≈ ۲.۳ مقیاس آلمانی)",
      },
    ],
    certificates: [
      {
        name: "دوره پروژه‌محور حرفه‌ای: توسعه بک‌اند با Django",
        issuer: "Quera.org",
      },
      {
        name: "دوره پروژه‌محور حرفه‌ای: توسعه فرانت‌اند با React",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "فارسی", level: "زبان مادری" },
      { name: "انگلیسی", level: "سطح کاری" },
    ],
    interests: ["گیمینگ", "ساخت سازه‌های چوبی مینیاتوری", "پیانو"],
    award: "مقام دوم — Data Date Challenge شرکت Part Software Group",
  },

  /* ───────────────────────────── GERMAN ───────────────────────────── */
  de: {
    dir: "ltr",
    langName: "Deutsch",
    title: "Senior Data Engineer · Agentic Systems",
    eyebrow: "7+ Jahre · Daten-Pipelines · AI-Agent-Workflows",
    ui: {
      print: "Drucken / Als PDF speichern",
      language: "Sprache",
      present: "heute",
      awardLabel: "Auszeichnung",
      gpaNote: "ungefähr deutsche Skala",
      native: "Muttersprache",
      working: "Arbeitsniveau",
      thesis: "Abschlussarbeit",
      techLabel: "Technologien",
    },
    contact: {
      email: "E-Mail",
      phone: "Telefon",
      location: "Wohnort",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      summary: "Berufliches Profil",
      experience: "Berufserfahrung",
      projects: "Projekte",
      skills: "Technische Fähigkeiten",
      education: "Ausbildung",
      certificates: "Zertifikate",
      languages: "Sprachen",
      interests: "Interessen",
    },
    summary:
      "Full-Stack Developer mit über 7 Jahren Erfahrung in Data Engineering und Systemarchitektur. Sicher in Node.js, TypeScript, Python und PostgreSQL, mit praktischer Arbeit in Microservices, ETL/ELT-Pipelines und Clean Architecture. In letzter Zeit schreibe ich Specs und lasse sie von KI-Agenten umsetzen — ein Workflow, der typische mehrwöchige Builds auf Tage reduziert hat. Offen für Umzug nach Deutschland, in die Niederlande und nach Skandinavien; Visumsponsoring erforderlich.",
    jobs: [
      {
        role: "AI-Native / Agentic Systems Engineer",
        company: "Part Software Group",
        location: "Mashhad, Iran",
        period: "März 2026 – heute",
        typeLabel: "Vollzeit",
        modelLabel: "vor Ort",
        overview:
          "Solo-Architektur und Auslieferung eines kommerziellen Produktionssystems im Industriemaßstab mit einem agentengetriebenen Entwicklungsworkflow — Specs schreiben, KI-Agenten durch die Implementierung orchestrieren und Verifikation/Release selbstständig Ende-zu-Ende verantworten.",
        achievements: [
          "Auslieferung einer MVP zur mechanisierten Dokumentenregistrierung in 10 Tagen für eine Plattform im Dienst der iranischen Dokumentenregistrierungsbehörde — Spec geschrieben, von Agenten umgesetzt, vor Release geprüft; das MVP sicherte die offizielle Lizenzierung.",
          "Zwei Nebenprojekte (File-Sharing-App, Todo-Liste) in jeweils 2 Tagen gebaut, um den spec-driven Workflow an realen CRUD- und zustandsbehafteten Use Cases zu benchmarken.",
          "Sicherheits- und Usability-Audit-Agents gebaut, die eine Pre-Release-Checkliste erzeugen — haben Probleme entdeckt, bevor sie die Produktion erreichten.",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "Data Engineer",
        company: "Part Software Group",
        location: "Mashhad, Iran",
        period: "Sep 2022 – März 2026",
        typeLabel: "Vollzeit",
        modelLabel: "vor Ort",
        overview:
          "Entwurf und Pflege von Datenverarbeitungspipelines für Reporting- und Aggregatdatensätze über Datenbank- und Backend-Ebenen bei Hunderten von GB. Anwendung des Microkernel-Architekturmusters zum Aufbau von „Delta“, einem vielseitigen Datenverarbeitungs-Server und -Client über HTTP und gRPC.",
        achievements: [
          "Aufbau skalierbarer, zuverlässiger Datenverarbeitungspipelines in Node.js und Python für Reporting- und Aggregatdaten im Hunderte-GB-Maßstab.",
          "Anwendung des Microkernel-Architekturmusters auf Delta für vielseitige Datenerfassung und -verarbeitung über HTTP und gRPC.",
          "Erreichte den 2. Platz bei der unternehmensinternen Data Date Challenge.",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "Full-Stack Developer",
        company: "TCI — Telecommunication Company of Iran",
        location: "Mashhad, Iran",
        period: "Jan 2015 – Apr 2023",
        typeLabel: "Vollzeit",
        modelLabel: "vor Ort",
        overview:
          "Entwurf, Entwicklung und Bereitstellung eines webbasierten Workflow-Management-Systems (Mini-ERP) für den technischen ISP-Support-Zweig, täglich genutzt von über 80 Mitarbeitern und Managern und Ersatz von Tausenden Papierformularen pro Monat. Kombination aus Solo-Entwicklung und 2-Personen-Team mit Projektführung parallel zum M.Sc.-Studium im flexiblen Nachtschicht-Modell.",
        achievements: [
          "Entwurf und Aufbau eines webbasierten Workflow-Management-Systems (Mini-ERP) für den ISP-Techniksupport-Zweig, angenommen von über 80 täglichen Nutzern.",
          "Optimierung der Abläufe mit 20+ Modulen (Benachrichtigungen, Archive, Mitarbeiterbewertung, Schichtmanagement) zur Reduzierung manueller Arbeit und Fehler.",
          "Implementierung einer granularen Zugriffskontrolle mit 80+ Berechtigungsgruppen für maßgeschneiderten, sicheren Modulzugriff.",
          "Reduzierung des Papierverbrauchs um Tausende Formulare pro Monat für einen effizienteren und umweltfreundlicheren Arbeitsplatz.",
          "Projektführung im 2-Personen-Team parallel zum M.Sc.-Studium mit flexiblen Nachtschichten zur Balance beider Verpflichtungen.",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "File-Sharing-App",
        description:
          "Chunked-Upload, fortsetzbare Downloads und eine minimale Auth-Schicht. In 2 Tagen gebaut als CRUD-lastiger Benchmark für den spec-driven Workflow.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
      {
        name: "Todo-Liste",
        description:
          "Optimistische UI-Updates, tastaturgesteuerte Navigation und localStorage-Persistenz. In 2 Tagen gebaut, um den Workflow an zustandsbehafteten UI-Patterns zu testen.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
    ],
    skills: [
      {
        label: "Data Engineering",
        items: [
          "ETL/ELT-Pipelines",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "Gigabyte-skalierte Daten",
        ],
      },
      {
        label: "AI-Agent-Engineering",
        items: [
          "SDD (Spec-Driven Development)",
          "Harness Engineering",
          "Agenten-Frameworks",
        ],
      },
      {
        label: "Programmiersprachen",
        items: [
          "Node.js",
          "JavaScript",
          "TypeScript",
          "Python",
          "SQL",
        ],
      },
      {
        label: "Frameworks & Bibliotheken",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps & Infrastruktur",
        items: [
          "Linux (Kernel-Tools)",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "Architektur & Methoden",
        items: [
          "Clean Architecture",
          "Microservices",
          "Microkernel",
          "MVC / MTV",
          "Saga",
          "Event-Driven",
          "REST-API-Design",
          "TDD",
          "Agile",
        ],
      },
      {
        label: "Vertraut mit",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "M.Sc. Softwaretechnik",
        institution: "Imam Reza International University",
        location: "Mashhad, Iran",
        period: "Okt 2015 – Sep 2018",
        grade: "Note: 17,06/20 (≈ 1,7 deutsche Skala)",
        thesis: "Context-aware Recommendation Systems",
      },
      {
        degree: "B.Sc. Softwaretechnik",
        institution: "Imam Reza International University",
        location: "Mashhad, Iran",
        period: "Okt 2010 – Sep 2014",
        grade: "Note: 16,50/20 (≈ 2,3 deutsche Skala)",
      },
    ],
    certificates: [
      {
        name: "Projektorientierter Profi-Kurs: Backend-Entwicklung mit Django",
        issuer: "Quera.org",
      },
      {
        name: "Projektorientierter Profi-Kurs: Frontend-Entwicklung mit React",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "Persisch", level: "Muttersprache" },
      { name: "Englisch", level: "Arbeitsniveau" },
    ],
    interests: ["Gaming", "Bau von Miniatur-Holzstrukturen", "Klavier"],
    award: "2. Platz — Data Date Challenge der Part Software Group",
  },

  /* ───────────────────────────── CHINESE ───────────────────────────── */
  zh: {
    dir: "ltr",
    langName: "中文",
    title: "高级数据工程师 · 智能体系统",
    eyebrow: "7年以上 · 数据管道 · AI智能体工作流",
    ui: {
      print: "打印 / 另存为 PDF",
      language: "语言",
      present: "至今",
      awardLabel: "奖项",
      gpaNote: "约等于德国评分制",
      native: "母语",
      working: "工作熟练度",
      thesis: "毕业论文",
      techLabel: "技术栈",
    },
    contact: {
      email: "邮箱",
      phone: "电话",
      location: "所在地",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      summary: "个人简介",
      experience: "工作经历",
      projects: "项目经历",
      skills: "技术技能",
      education: "教育背景",
      certificates: "证书",
      languages: "语言能力",
      interests: "兴趣爱好",
    },
    summary:
      "全栈开发工程师，拥有 7 年以上数据工程与系统架构经验。精通 Node.js、TypeScript、Python 与 PostgreSQL，在微服务、ETL/ELT 管道与整洁架构方面有实际项目经验。最近我开始编写规格说明，交由 AI 智能体实现——这套工作流将通常数周的构建压缩到几天。愿意赴德国、荷兰及斯堪的纳维亚工作；需要签证赞助。",
    jobs: [
      {
        role: "AI-Native / 智能体系统工程师",
        company: "Part Software Group",
        location: "伊朗 马什哈德",
        period: "2026年3月 – 至今",
        typeLabel: "全职",
        modelLabel: "现场",
        overview:
          "独立架构并交付商业化规模的生产系统，使用智能体驱动的开发工作流——编写规格说明、编排 AI 智能体完成实现，并端到端自行负责验证与发布。",
        achievements: [
          "在 10 天内为伊朗文书登记组织服务的平台交付了机械化文档登记 MVP——规格编写、智能体实现、发布前审查；该 MVP 取得了正式许可。",
          "另外用各 2 天时间构建了两个副项目（文件共享应用、待办清单），用真实的 CRUD 与有状态场景对规格驱动工作流做基准验证。",
          "构建安全性与可用性审计智能体，生成发布前检查清单——在问题进入生产环境前就将其捕获。",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "数据工程师",
        company: "Part Software Group",
        location: "伊朗 马什哈德",
        period: "2022年9月 – 2026年3月",
        typeLabel: "全职",
        modelLabel: "现场",
        overview:
          "设计并维护用于报表与聚合数据集的数据处理管道，覆盖数据库与后端层，处理数百 GB 数据。应用微内核架构模式构建“Delta”——一个通过 HTTP 与 gRPC 通信的多功能数据处理服务端与客户端。",
        achievements: [
          "使用 Node.js 与 Python 构建可扩展、可靠的数据处理管道，处理数百 GB 规模的报表与聚合数据。",
          "将微内核架构模式应用于 Delta，实现通过 HTTP 与 gRPC 进行多功能数据采集与处理。",
          "在公司 Data Date Challenge 中获得第二名。",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "全栈开发工程师",
        company: "伊朗电信公司 (TCI)",
        location: "伊朗 马什哈德",
        period: "2015年1月 – 2023年4月",
        typeLabel: "全职",
        modelLabel: "现场",
        overview:
          "为 ISP 技术支持分部设计、开发并部署基于 Web 的工作流管理系统（小型 ERP），每日被 80+ 员工与管理层使用，每月替代数千份纸质表单。结合独立开发与 2 人团队，并在攻读硕士期间以弹性夜班方式主导项目。",
        achievements: [
          "为 ISP 技术支持分部设计并构建基于 Web 的工作流管理系统（小型 ERP），被 80+ 日常用户采用。",
          "通过 20+ 模块（通知、归档、员工评估、排班管理）优化流程，减少人工操作与错误。",
          "实现细粒度访问控制，配置 80+ 权限组以实现定制、安全的模块访问。",
          "每月减少数千份纸质表单的使用，打造更高效、环保的办公环境。",
          "在 2 人团队中主导项目，同时以弹性夜班平衡硕士学业。",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "文件共享应用",
        description: "分片上传、可恢复下载与最小化认证层。用 2 天构建，作为对规格驱动工作流的 CRUD 密集型基准测试。",
        tech: "Next.js、Node.js、TypeScript、Docker",
      },
      {
        name: "待办清单",
        description: "乐观 UI 更新、键盘驱动导航与 localStorage 持久化。用 2 天构建，用于在状态化 UI 模式上测试该工作流。",
        tech: "Next.js、Node.js、TypeScript、Docker",
      },
    ],
    skills: [
      {
        label: "数据工程",
        items: [
          "ETL/ELT 管道",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "GB级数据处理",
        ],
      },
      {
        label: "AI智能体工程",
        items: [
          "SDD（规格驱动开发）",
          "Harness Engineering",
          "智能体框架",
        ],
      },
      {
        label: "编程语言",
        items: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL"],
      },
      {
        label: "框架与库",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps 与基础设施",
        items: [
          "Linux（内核工具）",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "架构与方法论",
        items: [
          "整洁架构",
          "微服务",
          "微内核",
          "MVC / MTV",
          "Saga",
          "事件驱动",
          "REST API 设计",
          "TDD",
          "敏捷",
        ],
      },
      {
        label: "了解",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "软件工程硕士",
        institution: "伊玛目礼萨国际大学",
        location: "伊朗 马什哈德",
        period: "2015年10月 – 2018年9月",
        grade: "绩点：17.06/20（≈ 德国评分 1.7）",
        thesis: "上下文感知推荐系统",
      },
      {
        degree: "软件工程学士",
        institution: "伊玛目礼萨国际大学",
        location: "伊朗 马什哈德",
        period: "2010年10月 – 2014年9月",
        grade: "绩点：16.50/20（≈ 德国评分 2.3）",
      },
    ],
    certificates: [
      {
        name: "项目导向专业课程：使用 Django 进行后端开发",
        issuer: "Quera.org",
      },
      {
        name: "项目导向专业课程：使用 React 进行前端开发",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "波斯语", level: "母语" },
      { name: "英语", level: "工作熟练度" },
    ],
    interests: ["游戏", "微缩木结构制作", "钢琴"],
    award: "第二名 — Part Software Group Data Date Challenge",
  },

  /* ───────────────────────────── JAPANESE ───────────────────────────── */
  ja: {
    dir: "ltr",
    langName: "日本語",
    title: "シニアデータエンジニア · エージェントシステム",
    eyebrow: "7年以上 · データパイプライン · AIエージェントワークフロー",
    ui: {
      print: "印刷 / PDFとして保存",
      language: "言語",
      present: "現在",
      awardLabel: "受賞",
      gpaNote: "ドイツ評価換算（概算）",
      native: "ネイティブ",
      working: "業務レベル",
      thesis: "修士論文",
      techLabel: "使用技術",
    },
    contact: {
      email: "メール",
      phone: "電話",
      location: "居住地",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      summary: "プロフェッショナル概要",
      experience: "職務経歴",
      projects: "プロジェクト",
      skills: "技術スキル",
      education: "学歴",
      certificates: "資格・認定",
      languages: "言語",
      interests: "趣味",
    },
    summary:
      "フルスタック開発者として7年以上の経験、データエンジニアリングとシステムアーキテクチャを専門とする。Node.js、TypeScript、Python、PostgreSQLに熟達し、マイクロサービス、ETL/ELTパイプライン、クリーンアーキテクチャを実務で扱ってきた。最近はスペックを書き、AIエージェントに実装させるワークフローを試しており、通常数週間かかるビルドを数日に短縮できた。ドイツ、オランダ、スカンジナビアへの移住に意欲的；ビザスポンサーシップが必要。",
    jobs: [
      {
        role: "AI-Native / エージェントシステムエンジニア",
        company: "Part Software Group",
        location: "イラン マシュハド",
        period: "2026年3月 – 現在",
        typeLabel: "正社員",
        modelLabel: "オンサイト",
        overview:
          "エージェント駆動の開発ワークフローを用い、商用規模の本番システムを単独でアーキテクトし提供——スペックを記述し、AIエージェントに実装をオーケストレーションし、検証とリリースを自身でエンドツーエンド完遂。",
        achievements: [
          "イランの文書登録機関にサービスを提供するプラットフォーム向けに機械化ドキュメント登録MVPを10日でリリース——スペック記述、エージェント実装、リリース前レビュー；当該MVPは正式ライセンスを取得。",
          "さらに2日ずつで2つのサイドプロジェクト（ファイル共有アプリ、Todoリスト）を構築し、実際のCRUDおよびステートフルなユースケースでスペック駆動ワークフローをベンチマーク。",
          "リリース前チェックリストを生成するセキュリティおよびユーザビリティ監査エージェントを構築——本番に到達する前に問題を検出。",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "データエンジニア",
        company: "Part Software Group",
        location: "イラン マシュハド",
        period: "2022年9月 – 2026年3月",
        typeLabel: "正社員",
        modelLabel: "オンサイト",
        overview:
          "データベースおよびバックエンド層を横断するレポート用・集計用データセットのデータ処理パイプラインを設計・保守し、数百GB規模のデータを処理。マイクロカーネル・アーキテクチャ・パターンを適用し、HTTPとgRPCで通信する多用途なデータ処理サーバー/クライアント「Delta」を構築。",
        achievements: [
          "Node.jsとPythonで、数百GB規模のレポート・集計データ向けのスケーラブルかつ信頼性の高いデータ処理パイプラインを構築。",
          "Deltaにマイクロカーネル・アーキテクチャ・パターンを適用し、HTTPとgRPCによる多用途なデータ取得・処理を実現。",
          "社内Data Date Challengeで2位を獲得。",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "フルスタック開発者",
        company: "イラン電気通信会社 (TCI)",
        location: "イラン マシュハド",
        period: "2015年1月 – 2023年4月",
        typeLabel: "正社員",
        modelLabel: "オンサイト",
        overview:
          "ISP技術サポート部門向けのWebベースワークフロー管理システム（ミニERP）を設計・開発・展開し、80名以上の従業員と管理職が日常的に利用、月に数千枚の紙フォームを代替。単独開発と2人チームを組み、柔軟な夜勤で修士課程と並行してプロジェクトを主導。",
        achievements: [
          "ISP技術サポート部門向けWebベースワークフロー管理システム（ミニERP）を設計・構築し、80名以上の日常ユーザーに採用。",
          "通知、アーカイブ、従業員評価、シフト管理など20以上のモジュールでプロセスを合理化し、手作業とエラーを削減。",
          "80以上の権限グループによる細粒度アクセス制御を実装し、テーラーメードかつ安全なモジュールアクセスを実現。",
          "月に数千枚の紙フォーム使用を削減し、効率的で環境に配慮した職場を実現。",
          "修士課程と並行して2人チームでプロジェクトを主導し、柔軟な夜勤で両立。",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "ファイル共有アプリ",
        description: "チャンクアップロード、再開可能なダウンロード、最小限の認証レイヤー。2日で構築し、スペック駆動ワークフローに対するCRUD中心のベンチマークとして使用。",
        tech: "Next.js、Node.js、TypeScript、Docker",
      },
      {
        name: "Todoリスト",
        description: "楽観的UI更新、キーボード駆動ナビゲーション、localStorage永続化。2日で構築し、ステートフルなUIパターンでワークフローをテスト。",
        tech: "Next.js、Node.js、TypeScript、Docker",
      },
    ],
    skills: [
      {
        label: "データエンジニアリング",
        items: [
          "ETL/ELTパイプライン",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "ギガバイト規模データ",
        ],
      },
      {
        label: "AIエージェントエンジニアリング",
        items: [
          "SDD（スペック駆動開発）",
          "Harness Engineering",
          "エージェント型フレームワーク",
        ],
      },
      {
        label: "プログラミング言語",
        items: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL"],
      },
      {
        label: "フレームワーク・ライブラリ",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps・インフラ",
        items: [
          "Linux（カーネルツール）",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "アーキテクチャ・方法論",
        items: [
          "クリーンアーキテクチャ",
          "マイクロサービス",
          "マイクロカーネル",
          "MVC / MTV",
          "Saga",
          "イベント駆動",
          "REST API設計",
          "TDD",
          "アジャイル",
        ],
      },
      {
        label: "知識あり",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "ソフトウェア工学 修士",
        institution: "イマーム・レザ国際大学",
        location: "イラン マシュハド",
        period: "2015年10月 – 2018年9月",
        grade: "GPA：17.06/20（独評価換算 ≈ 1.7）",
        thesis: "コンテキスト対応レコメンドシステム",
      },
      {
        degree: "ソフトウェア工学 学士",
        institution: "イマーム・レザ国際大学",
        location: "イラン マシュハド",
        period: "2010年10月 – 2014年9月",
        grade: "GPA：16.50/20（独評価換算 ≈ 2.3）",
      },
    ],
    certificates: [
      {
        name: "プロジェクト指向プロフェッショナルコース：Djangoによるバックエンド開発",
        issuer: "Quera.org",
      },
      {
        name: "プロジェクト指向プロフェッショナルコース：Reactによるフロントエンド開発",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "ペルシャ語", level: "ネイティブ" },
      { name: "英語", level: "業務レベル" },
    ],
    interests: ["ゲーム", "ミニチュア木造構造物の製作", "ピアノ"],
    award: "第2位 — Part Software Group Data Date Challenge",
  },

  /* ───────────────────────────── SPANISH ───────────────────────────── */
  es: {
    dir: "ltr",
    langName: "Español",
    title: "Senior Data Engineer · Sistemas Agénticos",
    eyebrow: "7+ años · Pipelines de datos · Flujos de AI-Agent",
    ui: {
      print: "Imprimir / Guardar como PDF",
      language: "Idioma",
      present: "Actualidad",
      awardLabel: "Premio",
      gpaNote: "escala alemana aprox.",
      native: "Nativo",
      working: "Nivel profesional",
      thesis: "Tesis",
      techLabel: "Tecnologías",
    },
    contact: {
      email: "Correo",
      phone: "Teléfono",
      location: "Ubicación",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      summary: "Resumen profesional",
      experience: "Experiencia profesional",
      projects: "Proyectos",
      skills: "Habilidades técnicas",
      education: "Educación",
      certificates: "Certificados",
      languages: "Idiomas",
      interests: "Intereses",
    },
    summary:
      "Desarrollador Full-Stack con más de 7 años de experiencia en data engineering y arquitectura de sistemas. Dominio de Node.js, TypeScript, Python y PostgreSQL, con trabajo práctico en microservicios, pipelines ETL/ELT y clean architecture. Últimamente estoy escribiendo specs y dejando que agentes de IA los implementen — un flujo que ha reducido builds típicas de varias semanas a días. Disponible para reubicación a Alemania, Países Bajos y Escandinavia; se requiere patrocinio de visado.",
    jobs: [
      {
        role: "AI-Native / Agentic Systems Engineer",
        company: "Part Software Group",
        location: "Mashhad, Irán",
        period: "Mar 2026 – Actualidad",
        typeLabel: "Jornada completa",
        modelLabel: "Presencial",
        overview:
          "Arquitectura en solitario y entrega de un sistema de producción a escala comercial usando un flujo de desarrollo agent-driven — escribiendo specs, orquestando agentes de IA durante la implementación y responsabilizándome de la verificación y el release de principio a fin.",
        achievements: [
          "Entrega de un MVP de registro mecanizado de documentos en 10 días para una plataforma al servicio de la Organización de Registro de Documentos de Irán — spec escrito, implementado por agente, revisado antes del release; el MVP consiguió la licencia oficial.",
          "Dos proyectos secundarios (app de file sharing, todo list) construidos en 2 días cada uno para benchmark del workflow spec-driven en casos reales CRUD y con estado.",
          "Construcción de agentes de auditoría de seguridad y usabilidad que generan una checklist pre-lanzamiento — detectaron problemas antes de que llegaran a producción.",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "Data Engineer",
        company: "Part Software Group",
        location: "Mashhad, Irán",
        period: "Sep 2022 – Mar 2026",
        typeLabel: "Jornada completa",
        modelLabel: "Presencial",
        overview:
          "Diseño y mantenimiento de pipelines de procesamiento de datos para conjuntos de reportes y agregados en las capas de base de datos y backend, manejando cientos de GB. Aplicación del patrón de arquitectura microkernel para construir “Delta”, un servidor y cliente versátil de procesamiento de datos sobre HTTP y gRPC.",
        achievements: [
          "Construcción de pipelines de procesamiento de datos escalables y fiables en Node.js y Python para datos de reportes y agregados a escala de cientos de GB.",
          "Aplicación del patrón de arquitectura microkernel a Delta, permitiendo adquisición y procesamiento versátil de datos sobre HTTP y gRPC.",
          "2º puesto en el Data Date Challenge de la empresa.",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "Desarrollador Full-Stack",
        company: "TCI — Telecommunication Company of Iran",
        location: "Mashhad, Irán",
        period: "Ene 2015 – Abr 2023",
        typeLabel: "Jornada completa",
        modelLabel: "Presencial",
        overview:
          "Diseño, desarrollo y despliegue de un sistema web de gestión de flujos de trabajo (mini-ERP) para la sucursal de soporte técnico ISP, usado a diario por más de 80 empleados y directivos y sustituyendo miles de formularios en papel al mes. Combinación de desarrollo individual con un equipo de 2 personas, liderando el proyecto mientras cursaba el máster con horario flexible de noche.",
        achievements: [
          "Diseño y construcción de un sistema web de gestión de flujos de trabajo (mini-ERP) para la sucursal de soporte técnico ISP, adoptado por más de 80 usuarios diarios.",
          "Optimización de procesos con más de 20 módulos (Notificaciones, Archivos, Evaluación de Empleados, Gestión de Turnos), reduciendo trabajo manual y errores.",
          "Implementación de control de acceso granular con más de 80 grupos de permisos para un acceso a módulos a medida y seguro.",
          "Reducción del uso de papel en miles de formularios al mes, contribuyendo a un entorno más eficiente y ecológico.",
          "Liderazgo del proyecto en un equipo de 2 personas mientras cursaba el máster, con turnos nocturnos flexibles para equilibrar ambos.",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "App de file sharing",
        description:
          "Subida por chunks, descargas reanudables y una capa de auth mínima. Construida en 2 días como benchmark CRUD-intensivo para el workflow spec-driven.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
      {
        name: "Todo list",
        description:
          "Actualizaciones optimistas de UI, navegación por teclado y persistencia en localStorage. Construida en 2 días para probar el workflow en patrones de UI con estado.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
    ],
    skills: [
      {
        label: "Data Engineering",
        items: [
          "Pipelines ETL/ELT",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "Datos a escala de gigabytes",
        ],
      },
      {
        label: "Ingeniería de AI-Agent",
        items: [
          "SDD (Spec-Driven Development)",
          "Harness Engineering",
          "Frameworks agénticos",
        ],
      },
      {
        label: "Lenguajes de programación",
        items: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL"],
      },
      {
        label: "Frameworks y librerías",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps e infraestructura",
        items: [
          "Linux (herramientas del kernel)",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "Arquitectura y metodologías",
        items: [
          "Clean Architecture",
          "Microservicios",
          "Microkernel",
          "MVC / MTV",
          "Saga",
          "Event-Driven",
          "Diseño de API REST",
          "TDD",
          "Agile",
        ],
      },
      {
        label: "Familiarizado con",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "M.Sc. Ingeniería de Software",
        institution: "Imam Reza International University",
        location: "Mashhad, Irán",
        period: "Oct 2015 – Sep 2018",
        grade: "Nota: 17,06/20 (≈ 1,7 escala alemana)",
        thesis: "Sistemas de recomendación context-aware",
      },
      {
        degree: "B.Sc. Ingeniería de Software",
        institution: "Imam Reza International University",
        location: "Mashhad, Irán",
        period: "Oct 2010 – Sep 2014",
        grade: "Nota: 16,50/20 (≈ 2,3 escala alemana)",
      },
    ],
    certificates: [
      {
        name: "Curso profesional orientado a proyectos: Desarrollo backend con Django",
        issuer: "Quera.org",
      },
      {
        name: "Curso profesional orientado a proyectos: Desarrollo frontend con React",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "Persa", level: "Nativo" },
      { name: "Inglés", level: "Nivel profesional" },
    ],
    interests: ["Videojuegos", "Construcción de estructuras de madera en miniatura", "Piano"],
    award: "2º puesto — Data Date Challenge de Part Software Group",
  },

  /* ───────────────────────────── RUSSIAN ───────────────────────────── */
  ru: {
    dir: "ltr",
    langName: "Русский",
    title: "Senior Data Engineer · Агентные системы",
    eyebrow: "7+ лет · Конвейеры данных · AI-агентные процессы",
    ui: {
      print: "Печать / Сохранить как PDF",
      language: "Язык",
      present: "настоящее время",
      awardLabel: "Награда",
      gpaNote: "прибл. по немецкой шкале",
      native: "Родной",
      working: "Рабочий уровень",
      thesis: "Дипломная работа",
      techLabel: "Технологии",
    },
    contact: {
      email: "Эл. почта",
      phone: "Телефон",
      location: "Местоположение",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      summary: "Профессиональное резюме",
      experience: "Опыт работы",
      projects: "Проекты",
      skills: "Технические навыки",
      education: "Образование",
      certificates: "Сертификаты",
      languages: "Языки",
      interests: "Интересы",
    },
    summary:
      "Full-Stack разработчик с более чем 7-летним опытом в data engineering и системной архитектуре. Уверенное владение Node.js, TypeScript, Python и PostgreSQL, практический опыт работы с микросервисами, пайплайнами ETL/ELT и чистой архитектурой. В последнее время я пишу спеки и передаю их реализацию AI-агентам — такой подход сократил типичные многонедельные разработки до нескольких дней. Готов к переезду в Германию, Нидерланды и Скандинавию; требуется визовая поддержка.",
    jobs: [
      {
        role: "AI-Native / Agentic Systems Engineer",
        company: "Part Software Group",
        location: "Мешхед, Иран",
        period: "Мар 2026 – настоящее время",
        typeLabel: "Полная занятость",
        modelLabel: "Офис",
        overview:
          "Самостоятельное архитектурное проектирование и доставка коммерческой production-системы с использованием agent-driven процесса разработки — написание спеков, оркестрация AI-агентов в ходе реализации и личная ответственность за верификацию и релиз от начала до конца.",
        achievements: [
          "За 10 дней поставлен MVP механизированной регистрации документов для платформы, обслуживающей Иранскую организацию регистрации документов — спек написан, реализован агентом, проверен перед релизом; MVP обеспечил официальную лицензию.",
          "Два побочных проекта (приложение для обмена файлами, todo-лист), каждый за 2 дня, — для бенчмарка spec-driven подхода на реальных CRUD и stateful-сценариях.",
          "Созданы агенты аудита безопасности и удобства, формирующие чек-лист перед релизом — проблемы отлавливались до попадания в продакшен.",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "Data Engineer",
        company: "Part Software Group",
        location: "Мешхед, Иран",
        period: "Сен 2022 – Мар 2026",
        typeLabel: "Полная занятость",
        modelLabel: "Офис",
        overview:
          "Проектирование и поддержка пайплайнов обработки данных для отчётных и агрегированных наборов данных на уровнях БД и бэкенда, обработка сотен ГБ данных. Применение паттерна микроядерной архитектуры для создания «Delta» — универсального сервера и клиента обработки данных по HTTP и gRPC.",
        achievements: [
          "Построены масштабируемые и надёжные пайплайны обработки данных на Node.js и Python для отчётных и агрегированных данных масштаба сотен ГБ.",
          "Применён паттерн микроядерной архитектуры в Delta для универсального сбора и обработки данных по HTTP и gRPC.",
          "Занял 2-е место во внутреннем Data Date Challenge компании.",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "Full-Stack разработчик",
        company: "TCI — Телекоммуникационная компания Ирана",
        location: "Мешхед, Иран",
        period: "Янв 2015 – Апр 2023",
        typeLabel: "Полная занятость",
        modelLabel: "Офис",
        overview:
          "Проектирование, разработка и развёртывание веб-системы управления рабочими процессами (мини-ERP) для отдела техподдержки ISP, ежедневно используемой более чем 80 сотрудниками и руководителями и заменяющей тысячи бумажных форм в месяц. Сочетание индивидуальной разработки и команды из 2 человек, руководство проектом параллельно с обучением в магистратуре по гибкому графику ночных смен.",
        achievements: [
          "Спроектирована и построена веб-система управления рабочими процессами (мини-ERP) для отдела техподдержки ISP, принятая более чем 80 ежедневными пользователями.",
          "Оптимизация процессов с помощью более 20 модулей (Уведомления, Архивы, Оценка сотрудников, Управление сменами), снижение ручного труда и ошибок.",
          "Реализован гранулярный контроль доступа с более чем 80 группами прав для безопасного и индивидуального доступа к модулям.",
          "Сокращено использование бумаги на тысячи форм в месяц, что сделало рабочее место более эффективным и экологичным.",
          "Руководство проектом в команде из 2 человек параллельно с обучением в магистратуре при гибких ночных сменах.",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "Приложение для обмена файлами",
        description:
          "Чанковая загрузка, возобновляемые загрузки и минимальный слой auth. Создано за 2 дня как CRUD-интенсивный бенчмарк для spec-driven подхода.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
      {
        name: "Todo-лист",
        description:
          "Оптимистичные обновления UI, навигация с клавиатуры и персистентность в localStorage. Создан за 2 дня для тестирования подхода на stateful UI-паттернах.",
        tech: "Next.js, Node.js, TypeScript, Docker",
      },
    ],
    skills: [
      {
        label: "Data Engineering",
        items: [
          "Конвейеры ETL/ELT",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "Данные гигабайтного масштаба",
        ],
      },
      {
        label: "AI-агентная инженерия",
        items: [
          "SDD (Spec-Driven Development)",
          "Harness Engineering",
          "Агентные фреймворки",
        ],
      },
      {
        label: "Языки программирования",
        items: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL"],
      },
      {
        label: "Фреймворки и библиотеки",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps и инфраструктура",
        items: [
          "Linux (инструменты ядра)",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "Архитектура и методологии",
        items: [
          "Чистая архитектура",
          "Микросервисы",
          "Микроядро",
          "MVC / MTV",
          "Saga",
          "Событийно-ориентированная",
          "Проектирование REST API",
          "TDD",
          "Agile",
        ],
      },
      {
        label: "Знаком с",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "Магистр программной инженерии",
        institution: "Международный университет Имама Резы",
        location: "Мешхед, Иран",
        period: "Окт 2015 – Сен 2018",
        grade: "Средний балл: 17,06/20 (≈ 1,7 немецкая шкала)",
        thesis: "Контекстно-зависимые рекомендательные системы",
      },
      {
        degree: "Бакалавр программной инженерии",
        institution: "Международный университет Имама Резы",
        location: "Мешхед, Иран",
        period: "Окт 2010 – Сен 2014",
        grade: "Средний балл: 16,50/20 (≈ 2,3 немецкая шкала)",
      },
    ],
    certificates: [
      {
        name: "Профессиональный проектный курс: бэкенд-разработка на Django",
        issuer: "Quera.org",
      },
      {
        name: "Профессиональный проектный курс: фронтенд-разработка на React",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "Персидский", level: "Родной" },
      { name: "Английский", level: "Рабочий уровень" },
    ],
    interests: ["Игры", "Создание миниатюрных деревянных конструкций", "Фортепиано"],
    award: "2-е место — Data Date Challenge Part Software Group",
  },

  /* ───────────────────────────── ARABIC ───────────────────────────── */
  ar: {
    dir: "rtl",
    langName: "العربية",
    title: "مهندس بيانات أول · أنظمة الوكلاء",
    eyebrow: "7+ سنوات · مسارات البيانات · تدفقات AI-Agent",
    ui: {
      print: "طباعة / حفظ بصيغة PDF",
      language: "اللغة",
      present: "حتى الآن",
      awardLabel: "جائزة",
      gpaNote: "تقريبي وفق المقياس الألماني",
      native: "اللغة الأم",
      working: "مستوى وظيفي",
      thesis: "رسالة",
      techLabel: "التقنيات",
    },
    contact: {
      email: "البريد",
      phone: "الهاتف",
      location: "الموقع",
      linkedin: "لينكدإن",
      github: "جيت‌هاب",
    },
    sections: {
      summary: "الملخص المهني",
      experience: "الخبرة المهنية",
      projects: "المشاريع",
      skills: "المهارات التقنية",
      education: "التعليم",
      certificates: "الشهادات",
      languages: "اللغات",
      interests: "الاهتمامات",
    },
    summary:
      "مطوّر Full-Stack بخبرة أكثر من 7 سنوات في هندسة البيانات وهندسة النظم. إتقان Node.js وTypeScript وPython وPostgreSQL، مع عمل تطبيقي في الخدمات المصغّرة وخطوط معالجة ETL/ELT والبنية النظيفة. مؤخرًا أصبحت أكتب المواصفات وأترك وكلاء الذكاء الاصطناعي ينفّذونها — منهج عمل قلّص المشاريع المعتادة متعددة الأسابيع إلى أيام. مستعد للانتقال إلى ألمانيا وهولندا وإسكندنافيا؛ مطلوب كفالة تأشيرة.",
    jobs: [
      {
        role: "مهندس أنظمة AI-Native / الوكلاء",
        company: "Part Software Group",
        location: "مشهد، إيران",
        period: "مارس ٢٠٢٦ – حتى الآن",
        typeLabel: "دوام كامل",
        modelLabel: "حضوري",
        overview:
          "هندسة معمارية مستقلة وتسليم نظام إنتاج تجاري الحجم باستخدام تدفق تطوير موجّه بالوكلاء — كتابة المواصفات، وتنسيق وكلاء الذكاء الاصطناعي أثناء التنفيذ، وتحمّل التحقق والإصدار من البداية للنهاية بمسؤولية فردية.",
        achievements: [
          "تسليم MVP لتسجيل المستندات المؤتمت خلال 10 أيام لمنصة تخدم منظمة تسجيل المستندات الإيرانية — المواصفات مكتوبة، النفيذ بالوكلاء، المراجعة قبل الإصدار؛ وقد ضمن الـMVP الترخيص الرسمي.",
          "بناء مشروعين جانبيين (تطبيق مشاركة ملفات، قائمة مهام) في يومين لكل منهما، كمعيار لمنهج العمل الموجّه بالمواصفات على حالات CRUD وذات الحالة الحقيقية.",
          "بناء وكلاء لتدقيق الأمان وسهولة الاستخدام ينتجون قائمة تحقق ما قبل الإصدار — التقطوا المشكلات قبل وصولها إلى الإنتاج.",
        ],
        tech: [
          "TypeScript",
          "Next.js",
          "Node.js",
          "Docker",
          "Agentic Frameworks",
          "SDD",
        ],
      },
      {
        role: "مهندس بيانات",
        company: "Part Software Group",
        location: "مشهد، إيران",
        period: "سبتمبر ٢٠٢٢ – مارس ٢٠٢٦",
        typeLabel: "دوام كامل",
        modelLabel: "حضوري",
        overview:
          "تصميم وصيانة خطوط معالجة البيانات لمجموعات بيانات التقارير والتجميعية عبر طبقات قاعدة البيانات والـBackend، معالجة مئات الغيغابايت. تطبيق نمط بنية النواة المصغّرة لبناء «Delta»، خادم وعميل متعدد الاستخدامات لمعالجة البيانات عبر HTTP وgRPC.",
        achievements: [
          "بناء خطوط معالجة بيانات قابلة للتوسع وموثوقة باستخدام Node.js وPython لبيانات التقارير والتجميعية بمقياس مئات الغيغابايت.",
          "تطبيق نمط بنية النواة المصغّرة على Delta لتمكين جمع ومعالجة البيانات متعددة الاستخدامات عبر HTTP وgRPC.",
          "احتلال المركز الثاني في تحدي Data Date Challenge الخاص بالشركة.",
        ],
        tech: [
          "Node.js",
          "Python",
          "PostgreSQL",
          "MongoDB",
          "Linux",
          "gRPC",
        ],
      },
      {
        role: "مطوّر Full-Stack",
        company: "شركة الاتصالات الإيرانية (TCI)",
        location: "مشهد، إيران",
        period: "يناير 2015 – أبريل 2023",
        typeLabel: "دوام كامل",
        modelLabel: "حضوري",
        overview:
          "تصميم وتطوير ونشر نظام ويب لإدارة سير العمل (mini-ERP) لفرع الدعم الفني لمزوّد خدمة الإنترنت، يُستخدم يوميًا من قبل أكثر من 80 موظفًا ومديرًا ويُعوّض آلاف النماذج الورقية شهريًا. الجمع بين التطوير الفردي وفريق من شخصين وقيادة المشروع بالتوازي مع دراسة الماجستير بجدول مرن للعمل الليلي.",
        achievements: [
          "تصميم وبناء نظام ويب لإدارة سير العمل (mini-ERP) لفرع الدعم الفني لمزوّد الإنترنت، اعتمده أكثر من 80 مستخدمًا يوميًا.",
          "تبسيط العمليات بأكثر من 20 وحدة (الإشعارات، الأرشيف، تقييم الموظفين، إدارة الورديات)، مما قلّل العمل اليدوي والأخطاء.",
          "تنفيذ تحكم دقيق في الوصول بأكثر من 80 مجموعة صلاحيات لوصول مخصّص وآمن للوحدات.",
          "خفض استخدام الورق بآلاف النماذج شهريًا، مساهمةً في بيئة عمل أكثر كفاءة وصديقة للبيئة.",
          "قيادة المشروع ضمن فريق من شخصين بالتوازي مع دراسة الماجستير بورديات ليلية مرنة لموازنة الاثنين.",
        ],
        tech: [
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "JavaScript (jQuery)",
          "PHP",
          "MySQL",
        ],
      },
    ],
    projects: [
      {
        name: "تطبيق مشاركة الملفات",
        description:
          "رفع مقسّم إلى أجزاء، تنزيلات قابلة للاستئناف، وطبقة مصادقة مينيمالية. بُني خلال يومين كمعيار كثيف الـCRUD لمنهج العمل الموجّه بالمواصفات.",
        tech: "Next.js، Node.js، TypeScript، Docker",
      },
      {
        name: "قائمة المهام",
        description:
          "تحديثات UI متفائلة، تنقّل بلوحة المفاتيح، والاحتفاظ في localStorage. بُنيت خلال يومين لاختبار منهج العمل على أنماط UI ذات الحالة.",
        tech: "Next.js، Node.js، TypeScript، Docker",
      },
    ],
    skills: [
      {
        label: "هندسة البيانات",
        items: [
          "مسارات ETL/ELT",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "Elasticsearch / OpenSearch",
          "gRPC",
          "بيانات بحجم الغيغابايت",
        ],
      },
      {
        label: "هندسة الوكلاء الذكية",
        items: [
          "SDD (التطوير الموجّه بالمواصفات)",
          "Harness Engineering",
          "أطر العمل القائمة على الوكلاء",
        ],
      },
      {
        label: "لغات البرمجة",
        items: ["Node.js", "JavaScript", "TypeScript", "Python", "SQL"],
      },
      {
        label: "الأطر والمكتبات",
        items: [
          "Next.js",
          "Express",
          "Django",
          "React",
          "Flask",
          "HTML5",
          "CSS3",
          "Bootstrap 4",
          "jQuery",
        ],
      },
      {
        label: "DevOps والبنية التحتية",
        items: [
          "Linux (أدوات النواة)",
          "Docker",
          "GitLab CI",
          "Grafana",
          "OpenTelemetry",
        ],
      },
      {
        label: "الهندسة والمنهجيات",
        items: [
          "البنية النظيفة",
          "الخدمات المصغّرة",
          "النواة المصغّرة",
          "MVC / MTV",
          "Saga",
          "القيادة بالأحداث",
          "تصميم REST API",
          "TDD",
          "Agile",
        ],
      },
      {
        label: "إلمان بـ",
        items: ["Kubernetes"],
      },
    ],
    education: [
      {
        degree: "ماجستير هندسة البرمجيات",
        institution: "جامعة الإمام الرضا الدولية",
        location: "مشهد، إيران",
        period: "أكتوبر 2015 – سبتمبر 2018",
        grade: "المعدل: 17.06/20 (≈ 1.7 المقياس الألماني)",
        thesis: "أنظمة التوصية المراعية للسياق",
      },
      {
        degree: "بكالوريوس هندسة البرمجيات",
        institution: "جامعة الإمام الرضا الدولية",
        location: "مشهد، إيران",
        period: "أكتوبر 2010 – سبتمبر 2014",
        grade: "المعدل: 16.50/20 (≈ 2.3 المقياس الألماني)",
      },
    ],
    certificates: [
      {
        name: "دورة مهنية موجّهة بالمشاريع: تطوير الـBackend باستخدام Django",
        issuer: "Quera.org",
      },
      {
        name: "دورة مهنية موجّهة بالمشاريع: تطوير الـFrontend باستخدام React",
        issuer: "Quera.org",
      },
    ],
    languagesKnown: [
      { name: "الفارسية", level: "اللغة الأم" },
      { name: "الإنجليزية", level: "مستوى وظيفي" },
    ],
    interests: ["الألعاب", "بناء هياكل خشبية مصغّرة", "البيانو"],
    award: "المركز الثاني — Data Date Challenge في Part Software Group",
  },
};
