/* ==========================================================================
   Abrar Mahir Khan — Portfolio
   ONE FILE: public site behaviour + content engine + built-in Admin Panel.

   How it works
   ------------
   1. The site reads all its text/images/projects from  data/content.json
      (falls back to DEFAULTS below if the file is missing).
   2. Open  yoursite.com/#admin  to get the Admin Panel.
   3. "Publish" commits the new data/content.json (and uploaded images) to
      your GitHub repo through the GitHub API. GitHub Pages then redeploys
      the site automatically (usually 1–2 minutes).
   ========================================================================== */
(function ($) {
  "use strict";

  const CONTENT_URL = "data/content.json";
  const UPLOAD_DIR = "assets/uploads";

  /* ======================================================================
     1. DEFAULT CONTENT  (used when data/content.json is missing)
     ====================================================================== */
  /* DEFAULTS:START */
  const DEFAULTS = {
    site: {
      title: "Abrar Mahir khan — Front-end Developer",
      description: "Abrar Mahir Khan — Front-end developer creating thoughtful, modern digital experiences.",
      brandLeft: "Abrar",
      brandRight: "Dev",
      loaderText: "Abrar-Mahir-khan",
      availability: "Available for select projects",
      showAvailability: true,
      accentDark: "#d5ff45",
      accentLight: "#6a7d00",
      menuLocation: "Dhaka, Bangladesh",
      menuTagline: "Let’s make something meaningful.",
      footerText: "© 2026 ABRAR MAHIR KHAN | Front-end Developer",
      backToTop: "Back to top"
    },
    nav: [
      { id: "home", label: "Home", show: true },
      { id: "about", label: "About", show: true },
      { id: "expertise", label: "Expertise", show: true },
      { id: "work", label: "Selected work", show: true },
      { id: "experience", label: "Experience", show: true },
      { id: "contact", label: "Contact", show: true }
    ],
    hero: {
      eyebrow: "Independent front-end developer",
      year: "© 2026",
      intro: "Hello, I’m Abrar Mahir Khan.",
      title1: "Design-minded",
      title2: "developer",
      titleDot: ".",
      text: "I build refined, responsive and interactive digital experiences with a strong eye for detail.",
      ctaLabel: "Explore\nmy work",
      ctaLink: "#work",
      portrait: "assets/img/Abrar mahir khan (2).png",
      portraitAlt: "Portrait of Abrar Mahir Khan",
      portraitNote: "Curiosity\ninto craft.",
      scrollText: "Scroll to discover",
      location: "Based in Bangladesh"
    },
    about: {
      kickerLeft: "01 / A little intro",
      kickerRight: "About me",
      heading: "I turn thoughtful\ndesign into *living*\ndigital experiences.",
      lead: "I’m a front-end developer focused on bringing digital ideas to life through clean code, considered details and purposeful interaction.",
      text: "With experience translating Figma designs into responsive websites, I enjoy the space where design and development meet. I care about the small things — rhythm, spacing, movement and how every element feels to use.",
      linkLabel: "More about working together",
      linkUrl: "#contact",
      meta: [
        { label: "Based in", value: "Dhaka, Bangladesh" },
        { label: "Focus", value: "Front-end development / UI implementation" },
        { label: "Approach", value: "Detail-oriented & curious" }
      ]
    },
    expertise: {
      kickerLeft: "02 / What I do",
      kickerRight: "Expertise",
      heading: "A mix of logic\n& *visual craft.*",
      text: "From the first pixel to the final interaction, I aim to make every detail feel intentional.",
      items: [
        { title: "Front-end development", text: "Responsive, accessible and maintainable interfaces built with modern web fundamentals." },
        { title: "Figma to website", text: "Turning design systems and visual concepts into accurate, polished web experiences." },
        { title: "Interaction & motion", text: "Adding purposeful movement and micro-interactions that make interfaces feel alive." }
      ],
      skills: ["HTML5", "CSS / SCSS", "JavaScript", "jQuery", "GSAP", "Responsive UI", "Figma", "Git"]
    },
    work: {
      kickerLeft: "03 / A few highlights",
      kickerRight: "Selected work",
      heading: "Selected\n*projects.*",
      text: "A selection of digital experiences. Click any project card to view the live project.",
      note: "",
      projects: [
        { show: true, title: "Creative Studio", category: "Website design / Front-end development", url: "https://example.com/creative-studio", image: "", style: "one", mockBar: "studio / digital", mockTag: "CREATIVE STUDIO — 2026", mockHeadline: "Make it\n*matter.*", mockCaption: "Independent creative direction" },
        { show: true, title: "Objects Store", category: "E-commerce / UI development", url: "https://example.com/objects-store", image: "", style: "two", mockTag: "OBJECTS / 01", mockHeadline: "Everyday\nessentials.", mockCaption: "CURATED GOODS — SHOP NOW ↗" },
        { show: true, title: "Form Architecture", category: "Portfolio / Interaction design", url: "https://example.com/form-architecture", image: "", style: "three", mockTag: "FORM / FUNCTION", mockHeadline: "Space\nto feel.", mockCaption: "ARCHITECTURE & INTERIORS" },
        { show: true, title: "Nova Analytics", category: "Web application / GSAP UI", url: "https://example.com/nova-dashboard", image: "", style: "four", mockBar: "nova / analytics", mockTag: "FINTECH SAAS — 2026", mockHeadline: "Scale\n*faster.*", mockCaption: "Interactive UI & motion" },
        { show: true, title: "Kinetix Agency", category: "Creative showcase / Frontend", url: "https://example.com/kinetix-agency", image: "", style: "five", mockTag: "KINETIX / 02", mockHeadline: "Digital\ncraft.", mockCaption: "BRAND IDENTITY — EXPLORE ↗" },
        { show: true, title: "Veloce Travel", category: "Responsive web / UI implementation", url: "https://example.com/veloce-travel", image: "", style: "six", mockTag: "EXPLORE / WORLD", mockHeadline: "Move\nfreely.", mockCaption: "BOOKING PLATFORM UI" }
      ]
    },
    experience: {
      kickerLeft: "04 / The journey",
      kickerRight: "Experience",
      heading: "Where I’ve\n*been.*",
      items: [
        { date: "2024 — Present", title: "Front-end Developer", company: "Web development agency", text: "Building responsive websites for international clients, translating Figma designs into functional and polished interfaces." },
        { date: "Ongoing", title: "Learning & exploration", company: "Independent practice", text: "Continuously exploring JavaScript, GSAP, interaction design and modern front-end workflows." }
      ]
    },
    contact: {
      kickerLeft: "05 / Have a project?",
      kickerRight: "Get in touch",
      overline: "Have an idea in mind?",
      title: "Let’s make\n*it happen.*",
      email: "hello@example.com",
      phone: "+880 1700-000000",
      phoneLabel: "Call / WhatsApp",
      web3formsKey: "",
      formEndpoint: "",
      bottomText: "I’m always open to thoughtful conversations, interesting collaborations and new opportunities.",
      socials: [
        { platform: "facebook", url: "https://www.facebook.com/" },
        { platform: "instagram", url: "https://www.instagram.com/" },
        { platform: "x", url: "https://x.com/" },
        { platform: "whatsapp", url: "https://wa.me/" }
      ]
    }
  };
  /* DEFAULTS:END */

  /* ======================================================================
     2. SMALL HELPERS
     ====================================================================== */
  const clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  const pad = function (n) { return String(n).padStart(2, "0"); };
  const isObj = function (o) { return o && typeof o === "object" && !Array.isArray(o); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Mini markup for headings: new line = <br>, *word* = <em>word</em>
  function rich(s) {
    return esc(s).replace(/\*([^*\n]+)\*/g, "<em>$1</em>").replace(/\r?\n/g, "<br>");
  }
  function safeUrl(u) {
    u = String(u == null ? "" : u).trim();
    if (/^(javascript|data|vbscript):/i.test(u)) return "#";
    return u || "#";
  }
  function safeColor(c, fallback) {
    return /^#[0-9a-f]{3,8}$/i.test(String(c || "").trim()) ? c.trim() : fallback;
  }
  function deepMerge(base, over) {
    if (Array.isArray(over)) return clone(over);
    if (!isObj(base) || !isObj(over)) return over === undefined ? clone(base) : over;
    const out = {};
    Object.keys(base).forEach(function (k) { out[k] = over[k] === undefined ? clone(base[k]) : deepMerge(base[k], over[k]); });
    Object.keys(over).forEach(function (k) { if (!(k in out)) out[k] = over[k]; });
    return out;
  }
  function tokens(path) { return String(path).match(/[^.[\]]+/g) || []; }
  function getPath(obj, path) {
    return tokens(path).reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }
  function setPath(obj, path, val) {
    const t = tokens(path);
    let o = obj;
    for (let i = 0; i < t.length - 1; i++) {
      if (o[t[i]] == null) o[t[i]] = /^\d+$/.test(t[i + 1]) ? [] : {};
      o = o[t[i]];
    }
    o[t[t.length - 1]] = val;
  }
  function setText($e, v) {
    v = String(v == null ? "" : v);
    if ($e.data("_t") !== v) { $e.text(v).data("_t", v); }
  }
  function setHTML($e, h) {
    if ($e.data("_h") !== h) { $e.html(h).data("_h", h); }
  }

  /* ======================================================================
     3. STATE
     ====================================================================== */
  let content = clone(DEFAULTS);
  const pendingFiles = {}; // repo path -> { dataUrl, base64, uploaded }
  let introDone = false;
  let lenis = null;

  const $body = $("body");
  const $header = $(".header");
  const $menuButton = $(".menu-toggle");
  const $menu = $(".menu-overlay");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function srcOf(path) {
    path = String(path || "");
    if (pendingFiles[path]) return pendingFiles[path].dataUrl;
    if (/^(https?:|data:|blob:)/i.test(path)) return path;
    try { return encodeURI(decodeURI(path)); } catch (e) { return path; }
  }

  /* ======================================================================
     4. CONTENT → PAGE  (render engine)
     ====================================================================== */
  const SOCIAL_ICONS = {
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.4 4.8a9.2 9.2 0 0 1-2.7.7 4.7 4.7 0 0 0 2.1-2.6 9.4 9.4 0 0 1-3 1.1 4.7 4.7 0 0 0-8 4.3A13.3 13.3 0 0 1 2.1 3.4a4.7 4.7 0 0 0 1.5 6.3 4.6 4.6 0 0 1-2.1-.6v.1a4.7 4.7 0 0 0 3.8 4.6 4.7 4.7 0 0 1-2.1.1 4.7 4.7 0 0 0 4.4 3.3A9.4 9.4 0 0 1 0 19.1a13.2 13.2 0 0 0 7.2 2.1c8.6 0 13.3-7.1 13.3-13.3v-.6a9.5 9.5 0 0 0 2.9-2.5z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.5.2-.4c.1-.2 0-.3 0-.4s-.5-1.3-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.4a9.6 9.6 0 0 0 3.7 3.3c.5.2.9.4 1.2.5.5.2 1 .2 1.4.1.4-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1s-.2-.2-.4-.3z"/></svg>'
  };
  const SOCIAL_GLYPHS = { linkedin: "in", github: "Gh", behance: "Bē", youtube: "YT", dribbble: "Dr", telegram: "Tg", tiktok: "Tk", website: "↗" };
  const SOCIAL_LABELS = { facebook: "Facebook", instagram: "Instagram", x: "Twitter / X", whatsapp: "WhatsApp", linkedin: "LinkedIn", github: "GitHub", behance: "Behance", youtube: "YouTube", dribbble: "Dribbble", telegram: "Telegram", tiktok: "TikTok", website: "Website" };

  function socialHTML(s) {
    const icon = SOCIAL_ICONS[s.platform] || '<span class="soc-glyph">' + esc(SOCIAL_GLYPHS[s.platform] || "↗") + "</span>";
    const label = SOCIAL_LABELS[s.platform] || "Link";
    return '<a href="' + esc(safeUrl(s.url)) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(label) + '">' + icon + "</a>";
  }

  function projectVisualHTML(p) {
    const style = ["one", "two", "three", "four", "five", "six"].indexOf(p.style) > -1 ? p.style : "one";
    let inner;
    if (p.image) {
      inner = '<img class="project-cover" src="' + esc(srcOf(p.image)) + '" alt="' + esc(p.title) + '" loading="lazy">';
    } else if (style === "one" || style === "four") {
      const bar = p.mockBar || (String(p.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "project") + " / web";
      inner = '<div class="mock-browser"><div class="mock-browser__bar"><i></i><i></i><i></i><span>' + esc(bar) + "</span></div>" +
        '<div class="mock-browser__content"><small>' + esc(p.mockTag) + "</small><strong>" + rich(p.mockHeadline) + "</strong>" +
        '<div class="mock-shape"></div><span class="mock-caption">' + esc(p.mockCaption) + "</span></div></div>";
    } else if (style === "two" || style === "five") {
      inner = '<div class="shop-mock"><span>' + esc(p.mockTag) + "</span><strong>" + rich(p.mockHeadline) + "</strong>" +
        '<div class="shop-products"><i></i><i></i><i></i></div><small>' + esc(p.mockCaption) + "</small></div>";
    } else {
      inner = '<div class="architecture-mock"><small>' + esc(p.mockTag) + "</small><strong>" + rich(p.mockHeadline) + "</strong>" +
        '<div class="arch-shape"></div><span>' + esc(p.mockCaption) + "</span></div>";
    }
    return '<div class="project-visual project-visual--' + style + '">' + inner + "</div>";
  }

  function projectHTML(p) {
    const href = p.url ? ' href="' + esc(safeUrl(p.url)) + '" target="_blank" rel="noopener noreferrer"' : "";
    return '<a class="project-card reveal"' + href + ">" + projectVisualHTML(p) +
      '<div class="project-info"><div><h3>' + esc(p.title) + "</h3><p>" + esc(p.category) + '</p></div><span class="project-open">↗</span></div></a>';
  }

  function injectBaseStyles() {
    if ($("#abrar-base-style").length) return;
    $("head").append('<style id="abrar-base-style">' +
      "[hidden]{display:none!important}" +
      ".project-visual .project-cover{width:100%;height:100%;object-fit:cover;transition:transform .65s var(--ease)}" +
      ".project-card:hover .project-cover{transform:scale(1.04)}" +
      ".social-links .soc-glyph{font:600 11px var(--mono);letter-spacing:0}" +
      ".work-note:empty{display:none}" +
      "</style>");
    $("head").append('<style id="abrar-accent-style"></style>');
  }

  function applyContent(c, opts) {
    opts = opts || {};
    injectBaseStyles();
    const s = c.site, h = c.hero, a = c.about, ex = c.expertise, w = c.work, xp = c.experience, ct = c.contact;

    // ---- document / theme ----
    document.title = s.title;
    $('meta[name="description"]').attr("content", s.description);
    const accD = safeColor(s.accentDark, "#d5ff45");
    $("#abrar-accent-style").text(":root{--accent:" + accD + ";--adm-accent:" + accD + "}:root.light{--accent:" + safeColor(s.accentLight, "#6a7d00") + ";--adm-accent:" + accD + "}");

    // ---- header / brand / loader ----
    setHTML($(".brand"), esc(s.brandLeft) + "<span>.</span>" + esc(s.brandRight));
    $(".brand").attr("aria-label", s.brandLeft + "." + s.brandRight + " home");
    setText($(".page-loader > span"), s.loaderText);
    setHTML($(".availability"), "<i></i> " + esc(s.availability));
    $(".availability").prop("hidden", !s.showAvailability);

    // ---- navigation + section visibility ----
    const nav = (c.nav || []).filter(function (n) { return n.show !== false; });
    setHTML($(".desktop-nav"), nav.map(function (n) { return '<a href="#' + esc(n.id) + '">' + esc(n.label) + "</a>"; }).join(""));
    setHTML($(".menu-overlay__links"), nav.map(function (n, i) { return '<a href="#' + esc(n.id) + '"><small>' + pad(i + 1) + "</small>" + esc(n.label) + "</a>"; }).join(""));
    setText($(".menu-overlay__top span").last(), pad(1) + " — " + pad(nav.length));
    setText($(".menu-overlay__bottom span").first(), s.menuLocation);
    setText($(".menu-overlay__bottom span").last(), s.menuTagline);
    (c.nav || []).forEach(function (n) { $("#" + n.id).prop("hidden", n.show === false); });
    // section order follows the menu order (movable from the admin panel)
    const mainEl = document.querySelector("main");
    const wanted = (c.nav || []).map(function (n) { return document.getElementById(n.id); }).filter(function (el) { return el && el.parentNode === mainEl; });
    const current = Array.prototype.filter.call(mainEl.children, function (el) { return wanted.indexOf(el) > -1; });
    if (wanted.some(function (el, i) { return el !== current[i]; })) {
      wanted.forEach(function (el) { mainEl.appendChild(el); });
      if (opts.live) window.scrollTo(0, window.pageYOffset);
    }

    // ---- hero ----
    setHTML($(".hero__eyebrow"), '<span class="eyebrow-line"></span> ' + esc(h.eyebrow) + ' <span class="eyebrow-year">' + esc(h.year) + "</span>");
    setText($(".hero__intro"), h.intro);
    setHTML($(".title-inner").eq(0), esc(h.title1));
    setHTML($(".title-inner").eq(1), esc(h.title2) + (h.titleDot ? '<span class="accent-dot">' + esc(h.titleDot) + "</span>" : ""));
    setText($(".hero__bottom > p"), h.text);
    setHTML($(".round-link"), "<span>" + rich(h.ctaLabel) + "</span><b>↘</b>");
    $(".round-link").attr({ href: safeUrl(h.ctaLink), "aria-label": String(h.ctaLabel).replace(/\s+/g, " ") });
    const heroSrc = srcOf(h.portrait);
    const $portrait = $(".portrait-frame img");
    if ($portrait.attr("src") !== heroSrc) $portrait.attr("src", heroSrc);
    $portrait.attr("alt", h.portraitAlt);
    setHTML($(".portrait-note"), rich(h.portraitNote));
    setText($(".hero__footer > span").first(), h.scrollText);
    setText($(".hero__location"), h.location);

    // ---- about ----
    setText($("#about .section-kicker span").eq(0), a.kickerLeft);
    setText($("#about .section-kicker span").eq(1), a.kickerRight);
    setHTML($("#about .section-heading"), rich(a.heading));
    setText($(".intro__text .lead"), a.lead);
    const paras = String(a.text || "").split(/\n\s*\n/).map(function (t) { return t.trim(); }).filter(Boolean);
    const parasHTML = paras.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    if ($(".intro__text").data("_p") !== parasHTML) {
      $(".intro__text .lead").nextAll("p").remove();
      $(".intro__text .lead").after(parasHTML);
      $(".intro__text").data("_p", parasHTML);
    }
    setHTML($(".text-link"), esc(a.linkLabel) + " <span>↗</span>");
    $(".text-link").attr("href", safeUrl(a.linkUrl));
    setHTML($(".about-meta"), (a.meta || []).map(function (m) { return "<span>" + esc(m.label) + " <b>" + esc(m.value) + "</b></span>"; }).join(""));

    // ---- expertise ----
    setText($("#expertise .section-kicker span").eq(0), ex.kickerLeft);
    setText($("#expertise .section-kicker span").eq(1), ex.kickerRight);
    setHTML($("#expertise .section-heading"), rich(ex.heading));
    setText($(".expertise__head > p"), ex.text);
    setHTML($(".expertise-list"), (ex.items || []).map(function (it, i) {
      return '<article class="expertise-item reveal"><span class="expertise-num">' + pad(i + 1) + "</span><div><h3>" + esc(it.title) + "</h3><p>" + esc(it.text) + '</p></div><span class="expertise-arrow">↗</span></article>';
    }).join(""));
    setHTML($(".skill-cloud"), (ex.skills || []).map(function (k) { return "<span>" + esc(k) + "</span>"; }).join(""));

    // ---- work ----
    setText($("#work .section-kicker span").eq(0), w.kickerLeft);
    setText($("#work .section-kicker span").eq(1), w.kickerRight);
    setHTML($("#work .section-heading"), rich(w.heading));
    setText($(".work__heading > p"), w.text);
    setText($(".work-note"), w.note);
    setHTML($(".project-grid"), (w.projects || []).filter(function (p) { return p.show !== false; }).map(projectHTML).join(""));
    updateProjectCards();

    // ---- experience ----
    setText($("#experience .section-kicker span").eq(0), xp.kickerLeft);
    setText($("#experience .section-kicker span").eq(1), xp.kickerRight);
    setHTML($("#experience .section-heading"), rich(xp.heading));
    setHTML($(".timeline"), (xp.items || []).map(function (it) {
      return '<article class="timeline-item reveal"><span class="timeline-date">' + esc(it.date) + "</span><div><h3>" + esc(it.title) + "</h3>" +
        (it.company ? '<p class="timeline-company">' + esc(it.company) + "</p>" : "") + "<p>" + esc(it.text) + "</p></div></article>";
    }).join(""));

    // ---- contact ----
    setText($("#contact .section-kicker span").eq(0), ct.kickerLeft);
    setText($("#contact .section-kicker span").eq(1), ct.kickerRight);
    setText($(".contact-overline"), ct.overline);
    setHTML($(".contact-title"), rich(ct.title));
    setHTML($(".contact-email"), esc(ct.email) + " <span>↗</span>");
    $(".contact-email").attr("href", "mailto:" + ct.email).prop("hidden", !ct.email);
    setHTML($(".contact-phone"), "<small>" + esc(ct.phoneLabel) + "</small> " + esc(ct.phone) + " <span>↗</span>");
    $(".contact-phone").attr("href", "tel:" + String(ct.phone).replace(/[^\d+]/g, "")).prop("hidden", !ct.phone);
    setText($(".contact-bottom > p"), ct.bottomText);
    setHTML($(".social-links"), (ct.socials || []).map(socialHTML).join(""));

    // ---- footer ----
    setText($(".footer__inner > span").first(), s.footerText);
    setHTML($(".back-top"), esc(s.backToTop) + ' <span aria-hidden="true">↑</span>');

    // New elements must be visible when rendered after the intro animation.
    if (introDone || opts.live) {
      $(".reveal").css({ opacity: 1, transform: "none" });
      if (window.ScrollTrigger) { clearTimeout(applyContent._t); applyContent._t = setTimeout(function () { ScrollTrigger.refresh(); }, 120); }
    }
  }

  /* ======================================================================
     5. PUBLIC SITE BEHAVIOUR  (theme, cursor, header, menu, form, GSAP)
     ====================================================================== */
  // Theme preference
  try { if (localStorage.getItem("abrar-theme") === "light") document.documentElement.classList.add("light"); } catch (e) { /* ignore */ }
  const $themeButton = $('<button class="theme-toggle" type="button" aria-label="Toggle color theme"><span>◐</span><small>THEME</small></button>');
  $(".header-right").prepend($themeButton);
  $themeButton.on("click", function () {
    document.documentElement.classList.toggle("light");
    try { localStorage.setItem("abrar-theme", document.documentElement.classList.contains("light") ? "light" : "dark"); } catch (e) { /* ignore */ }
  });

  // Cursor orb
  if (!reducedMotion && window.matchMedia("(min-width: 861px) and (hover: hover) and (pointer: fine)").matches) {
    const $cursorOrb = $('<span class="cursor-orb" aria-hidden="true"></span>').appendTo($body);
    $(document).on("pointermove", function (event) {
      $cursorOrb.css({ left: event.clientX, top: event.clientY }).addClass("is-visible");
    });
    $(document).on("mouseenter", "a, button", function () { $cursorOrb.addClass("is-hovering"); });
    $(document).on("mouseleave", "a, button", function () { $cursorOrb.removeClass("is-hovering"); });
    $(document).on("mouseleave", function () { $cursorOrb.removeClass("is-visible"); });
  }

  // Project grid + "Load more"
  const $projectGrid = $(".project-grid");
  const $loadMore = $(".load-more");
  const desktopProjectLayout = window.matchMedia("(min-width: 861px)");
  let visibleProjectCount = 6;

  function updateProjectCards() {
    const isDesktop = desktopProjectLayout.matches;
    const $cards = $projectGrid.children(".project-card");
    $cards.each(function (index) {
      const $card = $(this);
      const shouldHide = isDesktop && index >= visibleProjectCount;
      if (shouldHide) $card.removeClass("reveal").css({ opacity: 1, transform: "none" });
      $card.prop("hidden", shouldHide);
    });
    $loadMore.prop("hidden", !isDesktop || $cards.length <= visibleProjectCount);
  }
  $loadMore.on("click", function () {
    visibleProjectCount = Math.min(visibleProjectCount + 6, $projectGrid.children(".project-card").length);
    updateProjectCards();
  });
  window.addEventListener("resize", updateProjectCards);

  // Smart sticky header
  let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  const scrollThreshold = 10;
  function handleHeaderVisibility(currentScrollY) {
    if ($body.hasClass("menu-open")) return;
    if (currentScrollY <= 60) { $header.removeClass("is-hidden"); lastScrollY = currentScrollY; return; }
    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;
    if (currentScrollY > lastScrollY && currentScrollY > 110) $header.addClass("is-hidden");
    else if (currentScrollY < lastScrollY) $header.removeClass("is-hidden");
    lastScrollY = currentScrollY;
  }
  window.addEventListener("scroll", function () {
    handleHeaderVisibility(window.pageYOffset || document.documentElement.scrollTop);
  }, { passive: true });

  // Mobile menu drawer
  function closeMenu() {
    $menu.removeClass("is-open").attr("aria-hidden", "true");
    $menuButton.attr("aria-expanded", "false").attr("aria-label", "Open navigation");
    $body.removeClass("menu-open");
    if (lenis) lenis.start();
  }
  $menuButton.on("click", function () {
    const open = $(this).attr("aria-expanded") !== "true";
    if (open) {
      $menu.addClass("is-open").attr("aria-hidden", "false");
      $(this).attr("aria-expanded", "true").attr("aria-label", "Close navigation");
      $body.addClass("menu-open");
      if (lenis) lenis.stop();
    } else closeMenu();
  });
  $menu.on("click", "a", closeMenu); // delegated: links are rebuilt from content
  $(document).on("keydown", function (event) { if (event.key === "Escape") closeMenu(); });

  // Contact form: posts to the endpoint set in the admin panel (Formspree,
  // Web3Forms ...). With no endpoint it opens the visitor's email app.
  const $contactForm = $("#contactForm");
  const $formStatus = $("#formStatus");
  $contactForm.on("submit", function (e) {
    e.preventDefault();
    const name = $.trim($("#senderName").val());
    const email = $.trim($("#senderEmail").val());
    const message = $.trim($("#senderMessage").val());
    const $btnText = $contactForm.find(".btn-text");
    $formStatus.removeClass("is-error");

    if (!name || !email || !message) {
      $formStatus.addClass("is-error").text("Please fill in your name, email, and project details.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $formStatus.addClass("is-error").text("Please enter a valid email address.");
      return;
    }

    const w3key = $.trim((content.contact && content.contact.web3formsKey) || "");
    const endpoint = w3key ? "https://api.web3forms.com/submit" : $.trim((content.contact && content.contact.formEndpoint) || "");
    if (!endpoint) {
      const to = (content.contact && content.contact.email) || "";
      location.href = "mailto:" + to + "?subject=" + encodeURIComponent("Project inquiry from " + name) +
        "&body=" + encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      $formStatus.text("Opening your email app…");
      return;
    }

    $btnText.text("Sending...");
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(w3key
        ? { access_key: w3key, subject: "New portfolio message from " + name, from_name: "Portfolio contact form", name: name, email: email, message: message }
        : { name: name, email: email, message: message })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (d) {
        if (!res.ok || d.success === false) throw new Error("bad status");
      });
    }).then(function () {
      $btnText.text("Message Sent ✓");
      $formStatus.text("Thank you, " + name + "! Your message has been received.");
      $contactForm[0].reset();
    }).catch(function () {
      $btnText.text("Send Message");
      $formStatus.addClass("is-error").text("Sorry, something went wrong. Please email me directly instead.");
    }).then(function () {
      setTimeout(function () { $btnText.text("Send Message"); }, 3500);
    });
  });

  // Smooth scroll for in-page links (delegated, works for rebuilt links)
  function scrollToTarget(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return false;
    if (lenis && !reducedMotion) {
      lenis.scrollTo(targetId === "#top" ? 0 : target, { offset: targetId === "#top" ? 0 : -70, duration: 1.25 });
    } else if (window.gsap && window.ScrollToPlugin && !reducedMotion) {
      gsap.to(window, { duration: 1.05, scrollTo: targetId === "#top" ? { y: 0 } : { y: target, offsetY: 70 }, ease: "power3.inOut" });
    } else {
      const top = targetId === "#top" ? 0 : target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: reducedMotion ? "auto" : "smooth" });
    }
    return true;
  }
  $(document).on("click", 'a[href^="#"]', function (event) {
    const id = this.getAttribute("href");
    if (!id || id.length < 2) return;
    if (scrollToTarget(id)) event.preventDefault();
  });

  // Intro animation + scroll reveals (run once content is rendered)
  function startExperience() {
    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (window.gsap && window.ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

    if (window.Lenis && window.gsap && !reducedMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        wheelMultiplier: 1
      });
      lenis.on("scroll", function (e) {
        if (window.ScrollTrigger) ScrollTrigger.update();
        handleHeaderVisibility(e.scroll);
      });
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    setTimeout(function () {
      $(".page-loader").addClass("is-done");
      introDone = true;
      if (!window.gsap || !window.ScrollTrigger || reducedMotion) {
        $(".reveal").css({ opacity: 1, transform: "none" });
        return;
      }
      gsap.from(".hero__eyebrow", { y: 18, opacity: 0, duration: .8, ease: "power3.out" });
      gsap.from(".title-inner", { yPercent: 110, duration: 1.15, stagger: .12, ease: "power4.out", delay: .12 });
      gsap.from(".hero__intro, .hero__bottom, .hero__portrait, .hero__footer", { y: 28, opacity: 0, duration: .9, stagger: .12, ease: "power3.out", delay: .35 });

      gsap.utils.toArray(".reveal").forEach(function (element) {
        if (element.closest(".hero")) return;
        gsap.fromTo(element, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: .85, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" }
        });
      });
      gsap.utils.toArray(".project-visual").forEach(function (element) {
        gsap.from(element, {
          clipPath: "inset(0 0 12% 0)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", toggleActions: "play none none reverse" }
        });
      });
    }, 650);
  }

  /* ======================================================================
     6. ADMIN PANEL
     ====================================================================== */
  const ADMIN_STORE = "abrar-admin-github";
  const TAB_SECTION = { general: "top", hero: "home", about: "about", expertise: "expertise", projects: "work", experience: "experience", contact: "contact" };

  const F = {
    h: function (label) { return { type: "heading", label: label }; },
    text: function (path, label, o) { return $.extend({ type: "text", path: path, label: label }, o); },
    area: function (path, label, o) { return $.extend({ type: "area", path: path, label: label, rows: 3 }, o); },
    rich: function (path, label, o) { return $.extend({ type: "rich", path: path, label: label, rows: 3 }, o); },
    check: function (path, label) { return { type: "check", path: path, label: label }; },
    color: function (path, label) { return { type: "color", path: path, label: label }; },
    lines: function (path, label, o) { return $.extend({ type: "lines", path: path, label: label, rows: 4 }, o); },
    image: function (path, label, o) { return $.extend({ type: "image", path: path, label: label, max: 1600 }, o); },
    select: function (path, label, options) { return { type: "select", path: path, label: label, options: options }; },
    list: function (path, label, o) { return $.extend({ type: "list", path: path, label: label }, o); }
  };

  const HELP_RICH = "Enter = new line  •  *word* = italic serif";
  const STYLE_OPTIONS = [["one", "Sand — browser mock"], ["two", "Cream — shop mock"], ["three", "Sage — architecture mock"], ["four", "Blue — browser mock"], ["five", "Warm — shop mock"], ["six", "Teal — architecture mock"]];
  const PLATFORM_OPTIONS = Object.keys(SOCIAL_LABELS).map(function (k) { return [k, SOCIAL_LABELS[k]]; });

  const TABS = [
    {
      id: "general", title: "General", fields: [
        F.h("Site"),
        F.text("site.title", "Browser tab title"),
        F.area("site.description", "SEO description"),
        F.text("site.brandLeft", "Logo — first part"),
        F.text("site.brandRight", "Logo — last part"),
        F.text("site.loaderText", "Loading screen text"),
        F.h("Header"),
        F.text("site.availability", "Availability badge text"),
        F.check("site.showAvailability", "Show availability badge"),
        F.list("nav", "Menu links & sections (drag or use ↑ ↓ to reorder)", { fixed: true, titleKey: "label", itemName: "Section", fields: [F.text("label", "Menu label"), F.check("show", "Show this section on the site")] }),
        F.h("Colors"),
        F.color("site.accentDark", "Accent color — dark theme"),
        F.color("site.accentLight", "Accent color — light theme"),
        F.h("Mobile menu & footer"),
        F.text("site.menuLocation", "Menu — bottom left"),
        F.text("site.menuTagline", "Menu — bottom right"),
        F.text("site.footerText", "Footer text"),
        F.text("site.backToTop", "“Back to top” label")
      ]
    },
    {
      id: "hero", title: "Hero", fields: [
        F.text("hero.eyebrow", "Eyebrow"),
        F.text("hero.year", "Year / badge"),
        F.text("hero.intro", "Greeting line"),
        F.text("hero.title1", "Title — line 1"),
        F.text("hero.title2", "Title — line 2"),
        F.text("hero.titleDot", "Accent dot after title", { hint: "Leave empty to remove" }),
        F.area("hero.text", "Short description"),
        F.rich("hero.ctaLabel", "Round button text", { rows: 2, hint: "Enter = new line" }),
        F.text("hero.ctaLink", "Round button link", { hint: "e.g. #work or https://…" }),
        F.h("Portrait"),
        F.image("hero.portrait", "Portrait image", { max: 1400 }),
        F.text("hero.portraitAlt", "Image alt text"),
        F.rich("hero.portraitNote", "Vertical note beside the portrait", { rows: 2, hint: "Enter = new line" }),
        F.h("Bottom bar"),
        F.text("hero.scrollText", "Left text"),
        F.text("hero.location", "Right text")
      ]
    },
    {
      id: "about", title: "About", fields: [
        F.text("about.kickerLeft", "Section label — left"),
        F.text("about.kickerRight", "Section label — right"),
        F.rich("about.heading", "Heading", { hint: HELP_RICH }),
        F.area("about.lead", "Lead paragraph"),
        F.area("about.text", "Body text", { rows: 6, hint: "Leave an empty line between paragraphs" }),
        F.text("about.linkLabel", "Link text"),
        F.text("about.linkUrl", "Link URL", { hint: "e.g. #contact" }),
        F.list("about.meta", "Info row", { titleKey: "label", itemName: "Item", blank: { label: "Label", value: "Value" }, fields: [F.text("label", "Label"), F.text("value", "Value")] })
      ]
    },
    {
      id: "expertise", title: "Expertise", fields: [
        F.text("expertise.kickerLeft", "Section label — left"),
        F.text("expertise.kickerRight", "Section label — right"),
        F.rich("expertise.heading", "Heading", { hint: HELP_RICH }),
        F.area("expertise.text", "Intro text"),
        F.list("expertise.items", "Expertise items", { titleKey: "title", itemName: "Item", blank: { title: "New expertise", text: "Describe it here." }, fields: [F.text("title", "Title"), F.area("text", "Description")] }),
        F.lines("expertise.skills", "Skill tags", { hint: "One per line (or comma separated)", rows: 6 })
      ]
    },
    {
      id: "projects", title: "Projects", fields: [
        F.text("work.kickerLeft", "Section label — left"),
        F.text("work.kickerRight", "Section label — right"),
        F.rich("work.heading", "Heading", { hint: HELP_RICH }),
        F.area("work.text", "Intro text"),
        F.text("work.note", "Small note under the grid", { hint: "Leave empty to hide" }),
        F.list("work.projects", "Projects", {
          titleKey: "title", itemName: "Project",
          blank: { show: true, title: "New project", category: "Category / Role", url: "https://", image: "", style: "one", mockBar: "", mockTag: "NEW PROJECT — 2026", mockHeadline: "Project\n*name.*", mockCaption: "Short caption" },
          fields: [
            F.check("show", "Show on the site"),
            F.text("title", "Project name"),
            F.text("category", "Category / role"),
            F.text("url", "Live project URL"),
            F.image("image", "Cover image (optional)", { max: 1400, hint: "If set, it replaces the illustrated mock-up below" }),
            F.select("style", "Mock-up style (used when no image)", STYLE_OPTIONS),
            F.text("mockBar", "Mock-up — browser bar text", { hint: "Only for the Sand / Blue browser styles" }),
            F.text("mockTag", "Mock-up — small label"),
            F.rich("mockHeadline", "Mock-up — headline", { rows: 2, hint: HELP_RICH }),
            F.text("mockCaption", "Mock-up — caption")
          ]
        })
      ]
    },
    {
      id: "experience", title: "Experience", fields: [
        F.text("experience.kickerLeft", "Section label — left"),
        F.text("experience.kickerRight", "Section label — right"),
        F.rich("experience.heading", "Heading", { hint: HELP_RICH }),
        F.list("experience.items", "Timeline", { titleKey: "title", itemName: "Entry", blank: { date: "2026 — Present", title: "Role title", company: "Company", text: "What you did." }, fields: [F.text("date", "Date"), F.text("title", "Title"), F.text("company", "Company / place"), F.area("text", "Description")] })
      ]
    },
    {
      id: "contact", title: "Contact", fields: [
        F.text("contact.kickerLeft", "Section label — left"),
        F.text("contact.kickerRight", "Section label — right"),
        F.text("contact.overline", "Small line above title"),
        F.rich("contact.title", "Big title", { rows: 2, hint: HELP_RICH }),
        F.text("contact.email", "Email"),
        F.text("contact.phone", "Phone / WhatsApp number"),
        F.text("contact.phoneLabel", "Phone badge label"),
        F.h("Contact form"),
        F.text("contact.web3formsKey", "Web3Forms access key", { hint: "Free: get a key at web3forms.com using your email. Messages then arrive in your inbox." }),
        F.text("contact.formEndpoint", "Other form endpoint URL (optional)", { hint: "Formspree / Web3Forms URL. Leave empty = opens visitor’s email app" }),
        F.h("Bottom"),
        F.area("contact.bottomText", "Bottom text"),
        F.list("contact.socials", "Social links", { titleKey: "platform", itemName: "Link", blank: { platform: "linkedin", url: "https://" }, fields: [F.select("platform", "Platform", PLATFORM_OPTIONS), F.text("url", "URL")] })
      ]
    },
    { id: "github", title: "GitHub", custom: true }
  ];

  let adminReady = false;
  let adminOpen = false;
  let dirty = false;
  let busy = false;
  let activeTab = "general";
  let fieldUid = 0;
  const openKeys = {};
  let syncedFromGitHub = false;

  /* ---------- GitHub connection ---------- */
  function guessRepo() {
    const m = location.hostname.match(/^([^.]+)\.github\.io$/i);
    if (!m) return { owner: "", repo: "" };
    const first = location.pathname.split("/").filter(Boolean)[0];
    return { owner: m[1], repo: first && !/\.html?$/i.test(first) ? first : m[1] + ".github.io" };
  }
  function getCfg() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(ADMIN_STORE) || "{}") || {}; } catch (e) { /* ignore */ }
    const g = guessRepo();
    return { owner: saved.owner || g.owner, repo: saved.repo || g.repo, branch: saved.branch || "main", token: saved.token || "" };
  }
  function saveCfg(cfg) {
    try { localStorage.setItem(ADMIN_STORE, JSON.stringify(cfg)); } catch (e) { toast("Could not store settings in this browser.", "error"); }
  }

  function explain(status, msg) {
    if (status === 401) return "GitHub rejected the token (wrong or expired). Create a new one in the GitHub & Backup tab.";
    if (status === 403) return "GitHub says no permission. The token needs “Contents: Read and write” on this repository. (" + msg + ")";
    if (status === 404) return "Repository or branch not found. Check owner / repo / branch, and that the token has access to this repo.";
    if (status === 409) return "Git conflict: " + msg + " (is the repository empty?)";
    return "GitHub error " + status + ": " + msg;
  }
  async function ghApi(path, o) {
    o = o || {};
    const cfg = getCfg();
    const headers = { "Accept": o.raw ? "application/vnd.github.raw+json" : "application/vnd.github+json", "Authorization": "Bearer " + cfg.token };
    if (o.body) headers["Content-Type"] = "application/json";
    let res;
    try {
      res = await fetch("https://api.github.com" + path, { method: o.method || "GET", headers: headers, body: o.body ? JSON.stringify(o.body) : undefined, cache: "no-store" });
    } catch (e) {
      throw new Error("Could not reach GitHub. Check your internet connection.");
    }
    if (!res.ok) {
      let msg = "";
      try { msg = (await res.json()).message || ""; } catch (e) { /* ignore */ }
      const err = new Error(explain(res.status, msg));
      err.status = res.status;
      throw err;
    }
    return o.raw ? res.text() : res.json();
  }
  function repoBase() {
    const c = getCfg();
    return "/repos/" + encodeURIComponent(c.owner) + "/" + encodeURIComponent(c.repo);
  }
  function branchRef() { return getCfg().branch.split("/").map(encodeURIComponent).join("/"); }

  function utf8ToB64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }

  async function ghReadContent() {
    try {
      const txt = await ghApi(repoBase() + "/contents/" + CONTENT_URL + "?ref=" + encodeURIComponent(getCfg().branch), { raw: true });
      return JSON.parse(txt);
    } catch (e) {
      if (e.status === 404) return null;
      throw e;
    }
  }

  // One atomic commit (content.json + any new images) via the Git Data API.
  async function ghCommit(files, message) {
    const base = repoBase();
    const ref = await ghApi(base + "/git/ref/heads/" + branchRef());
    const parentSha = ref.object.sha;
    const parent = await ghApi(base + "/git/commits/" + parentSha);
    const tree = [];
    for (let i = 0; i < files.length; i++) {
      const blob = await ghApi(base + "/git/blobs", { method: "POST", body: { content: files[i].content, encoding: "base64" } });
      tree.push({ path: files[i].path, mode: "100644", type: "blob", sha: blob.sha });
    }
    const newTree = await ghApi(base + "/git/trees", { method: "POST", body: { base_tree: parent.tree.sha, tree: tree } });
    const commit = await ghApi(base + "/git/commits", { method: "POST", body: { message: message, tree: newTree.sha, parents: [parentSha] } });
    await ghApi(base + "/git/refs/heads/" + branchRef(), { method: "PATCH", body: { sha: commit.sha } });
    return commit;
  }

  /* ---------- Image processing ---------- */
  function readAsDataURL(file) {
    return new Promise(function (resolve, reject) {
      const r = new FileReader();
      r.onload = function () { resolve(r.result); };
      r.onerror = function () { reject(new Error("Could not read the file.")); };
      r.readAsDataURL(file);
    });
  }
  function loadImage(file) {
    return new Promise(function (resolve, reject) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("That file is not a readable image.")); };
      img.src = url;
    });
  }
  async function processImage(file, max) {
    if (!/^image\//.test(file.type)) throw new Error("Please choose an image file.");
    if (/svg|gif/.test(file.type)) {
      if (file.size > 2 * 1024 * 1024) throw new Error("SVG/GIF must be under 2 MB.");
      return { dataUrl: await readAsDataURL(file), ext: /svg/.test(file.type) ? "svg" : "gif" };
    }
    const img = await loadImage(file);
    const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d");
    const keepAlpha = file.type === "image/png";
    if (!keepAlpha) { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); }
    ctx.drawImage(img, 0, 0, w, h);
    return { dataUrl: canvas.toDataURL(keepAlpha ? "image/png" : "image/jpeg", 0.86), ext: keepAlpha ? "png" : "jpg" };
  }

  /* ---------- Admin UI building blocks ---------- */
  const ADMIN_CSS = [
    ".adm,.adm *{box-sizing:border-box}",
    ".adm{position:fixed;top:0;right:0;bottom:0;width:min(440px,100vw);z-index:10000;background:#171716;color:#ecebe6;border-left:1px solid #2f2f2d;display:flex;flex-direction:column;font:13px/1.5 'Manrope',system-ui,sans-serif;box-shadow:-24px 0 60px rgba(0,0,0,.4);transition:transform .35s cubic-bezier(.22,1,.36,1);cursor:auto}",
    ".adm.is-collapsed{transform:translateX(104%)}",
    ".adm button{font-family:inherit;cursor:pointer}",
    ".adm-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid #2f2f2d}",
    ".adm-title{display:flex;flex-direction:column;gap:2px;min-width:0}.adm-title b{font-size:15px;letter-spacing:-.02em}",
    ".adm-status{font:10px 'DM Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#8f8e89}.adm-status.is-dirty{color:#ffb74d}.adm-status.is-ok{color:#d5ff45}",
    ".adm-actions{display:flex;align-items:center;gap:8px}",
    ".adm-btn{background:#2a2a28;color:#ecebe6;border:1px solid #3a3a37;padding:8px 14px;font-size:12px;font-weight:600;border-radius:6px;transition:background .2s,border-color .2s,opacity .2s}",
    ".adm-btn:hover{border-color:#d5ff45}.adm-btn[disabled]{opacity:.5;cursor:wait}",
    ".adm-btn--primary{background:#d5ff45;color:#111;border-color:#d5ff45}.adm-btn--primary:hover{opacity:.9}",
    ".adm-btn--danger{color:#ff8a80}.adm-btn--danger:hover{border-color:#ff8a80}",
    ".adm-icon{width:32px;height:32px;display:grid;place-items:center;background:transparent;color:#bdbcb6;border:1px solid #3a3a37;border-radius:6px;font-size:14px}.adm-icon:hover{color:#d5ff45;border-color:#d5ff45}",
    ".adm-tabs{display:flex;flex-wrap:wrap;gap:2px 0;padding:0 10px;border-bottom:1px solid #2f2f2d}",
    ".adm-tab{flex:0 0 auto;background:none;color:#8f8e89;padding:10px 9px;font-size:12px;font-weight:600;border-bottom:2px solid transparent;margin-bottom:-1px}.adm-tab:hover{color:#ecebe6}.adm-tab.is-active{color:#d5ff45;border-color:#d5ff45}",
    ".adm-body{flex:1;overflow-y:auto;padding:16px;overscroll-behavior:contain}",
    ".adm-body h4{font:10px 'DM Mono',monospace;letter-spacing:.1em;text-transform:uppercase;color:#d5ff45;margin:22px 0 10px;padding-top:14px;border-top:1px solid #2f2f2d}.adm-body>h4:first-child{margin-top:0;border-top:0;padding-top:0}",
    ".adm-f{display:flex;flex-direction:column;gap:5px;margin-bottom:13px}",
    ".adm-f label{font:10px 'DM Mono',monospace;letter-spacing:.07em;text-transform:uppercase;color:#a8a7a1}",
    ".adm-hint{font-size:11px;color:#77766f;line-height:1.4}",
    ".adm input[type=text],.adm input[type=password],.adm textarea,.adm select{width:100%;background:#0f0f0e;color:#ecebe6;border:1px solid #333330;border-radius:6px;padding:9px 11px;font:13px/1.45 'Manrope',system-ui,sans-serif;outline:none;transition:border-color .2s}",
    ".adm textarea{resize:vertical;min-height:60px}.adm input:focus,.adm textarea:focus,.adm select:focus{border-color:#d5ff45}",
    ".adm-check{display:flex;align-items:center;gap:9px;margin:2px 0 13px;font-size:13px;color:#ecebe6;cursor:pointer}.adm-check input{width:16px;height:16px;accent-color:#d5ff45}",
    ".adm-color{display:flex;align-items:center;gap:10px}.adm-color input[type=color]{width:44px;height:34px;padding:0;border:1px solid #333330;border-radius:6px;background:#0f0f0e}.adm-color code{font:12px 'DM Mono',monospace;color:#a8a7a1}",
    ".adm-img{display:flex;gap:12px;align-items:flex-start}.adm-thumb{width:84px;height:84px;flex:0 0 auto;border:1px dashed #3a3a37;border-radius:6px;background:#0f0f0e center/cover no-repeat;display:grid;place-items:center;color:#77766f;font-size:10px;text-align:center;overflow:hidden}",
    ".adm-img-side{flex:1;min-width:0;display:flex;flex-direction:column;gap:8px}.adm-img-btns{display:flex;gap:8px;flex-wrap:wrap}.adm-img-btns .adm-btn{padding:6px 11px}",
    ".adm-item{border:1px solid #2f2f2d;border-radius:8px;background:#1c1c1b;margin-bottom:10px}.adm-item[open]{border-color:#3a3a37}",
    ".adm-item>summary{list-style:none;display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer;user-select:none}.adm-item>summary::-webkit-details-marker{display:none}",
    ".adm-num{font:10px 'DM Mono',monospace;color:#d5ff45;width:20px}.adm-item-title{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600}",
    ".adm-item-ctrl{display:flex;gap:4px}.adm-mini{width:26px;height:26px;display:grid;place-items:center;background:#262624;color:#bdbcb6;border:1px solid #333330;border-radius:5px;font-size:12px}.adm-mini:hover{color:#d5ff45;border-color:#d5ff45}.adm-mini.is-del:hover{color:#ff8a80;border-color:#ff8a80}",
    ".adm-item-body{padding:4px 12px 2px;border-top:1px solid #2f2f2d;padding-top:14px}",
    ".adm-add{width:100%;border:1px dashed #3a3a37;background:transparent;color:#bdbcb6;padding:10px;border-radius:8px;font-size:12px;font-weight:600}.adm-add:hover{color:#d5ff45;border-color:#d5ff45}",
    ".adm-note{background:#1f1f1d;border:1px solid #2f2f2d;border-radius:8px;padding:12px 14px;font-size:12px;color:#a8a7a1;margin-bottom:14px;line-height:1.6}.adm-note a{color:#d5ff45;text-decoration:underline}.adm-note ol{margin:6px 0 0;padding-left:18px}",
    ".adm-row{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 14px}",
    ".adm-toast{position:absolute;left:12px;right:12px;bottom:12px;padding:11px 14px;border-radius:8px;background:#26301a;border:1px solid #d5ff45;color:#ecebe6;font-size:12px;line-height:1.5;opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .25s,transform .25s}",
    ".adm-toast.is-show{opacity:1;transform:none;pointer-events:auto}.adm-toast.is-error{background:#35201f;border-color:#ff8a80}",
    ".adm-fab{position:fixed;right:18px;bottom:18px;z-index:10000;background:#d5ff45;color:#111;border:0;border-radius:30px;padding:11px 18px;font:700 12px 'Manrope',system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.35);cursor:pointer}",
    ".adm-body{scrollbar-width:thin;scrollbar-color:var(--adm-accent,#d5ff45) #0f0f0e}",
    ".adm-body::-webkit-scrollbar,.adm-tabs::-webkit-scrollbar{width:9px;height:9px}.adm-body::-webkit-scrollbar-track{background:#0f0f0e;border-left:1px solid #2a2a28}",
    ".adm-body::-webkit-scrollbar-thumb{background:#3a3a37;border-radius:9px;border:2px solid #0f0f0e}.adm-body::-webkit-scrollbar-thumb:hover{background:var(--adm-accent,#d5ff45)}",
    ".adm-grip{cursor:grab;color:#77766f;font-size:15px;line-height:1;padding:2px 2px;margin-left:-4px}.adm-grip:hover{color:#d5ff45}",
    ".adm-item.is-dragging{opacity:.4}.adm-item.is-over{border-color:#d5ff45;box-shadow:0 -2px 0 #d5ff45}",
    ".adm-mini[disabled]{opacity:.35;cursor:default}.adm-mini[disabled]:hover{color:#bdbcb6;border-color:#333330}",
    ".adm-launch{position:fixed;right:18px;bottom:18px;z-index:9990;display:flex;align-items:center;gap:6px;padding:6px;background:rgba(17,17,17,.92);backdrop-filter:blur(10px);border:1px solid #2f2f2d;border-radius:40px;box-shadow:0 10px 36px rgba(0,0,0,.4);font:600 12px 'Manrope',system-ui,sans-serif}",
    ".adm-launch button{cursor:pointer;border:0;border-radius:30px;padding:10px 16px;font:inherit;transition:opacity .2s,background .2s}",
    ".adm-launch .adm-launch__open{background:#d5ff45;color:#111}.adm-launch .adm-launch__open:hover{opacity:.88}",
    ".adm-launch .adm-launch__out{background:transparent;color:#bdbcb6}.adm-launch .adm-launch__out:hover{color:#ff8a80}",
    ".adm-launch[hidden]{display:none}",
    "body.admin-open .page-loader{display:none}",
    "@media(max-width:560px){.adm{width:100vw}.adm input[type=text],.adm input[type=password],.adm textarea,.adm select{font-size:16px}}"
  ].join("").replace(/#d5ff45/g, "var(--adm-accent,#d5ff45)");

  function ensureAdminStyle() {
    if (!document.getElementById("adm-style")) $("head").append('<style id="adm-style">' + ADMIN_CSS + "</style>");
  }

  function toast(msg, type) {
    const $t = $("#admToast");
    $t.text(msg).toggleClass("is-error", type === "error").addClass("is-show");
    clearTimeout(toast._t);
    if (type !== "error") toast._t = setTimeout(function () { $t.removeClass("is-show"); }, 7000);
  }
  function setStatus() {
    const $s = $("#admStatus");
    if (busy) $s.attr("class", "adm-status").text("Working…");
    else if (dirty) $s.attr("class", "adm-status is-dirty").text("● Unpublished changes");
    else $s.attr("class", "adm-status is-ok").text("✓ Up to date");
  }
  function markDirty() { dirty = true; setStatus(); }

  let previewTimer = null;
  function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(function () { applyContent(content, { live: true }); }, 180);
  }

  function fieldHTML(f, path, extra) {
    extra = extra || "";
    const id = "adm-f" + (++fieldUid);
    const v = f.path !== undefined ? getPath(content, path) : undefined;
    const lab = f.label ? '<label for="' + id + '">' + esc(f.label) + "</label>" : "";
    const hint = f.hint ? '<small class="adm-hint">' + esc(f.hint) + "</small>" : "";
    const dp = ' data-path="' + esc(path) + '"' + extra;
    switch (f.type) {
      case "heading": return "<h4>" + esc(f.label) + "</h4>";
      case "text": return '<div class="adm-f">' + lab + '<input id="' + id + '" type="text" data-kind="text"' + dp + ' value="' + esc(v) + '" autocomplete="off">' + hint + "</div>";
      case "area":
      case "rich": return '<div class="adm-f">' + lab + '<textarea id="' + id + '" rows="' + (f.rows || 3) + '" data-kind="text"' + dp + ">" + esc(v) + "</textarea>" + hint + "</div>";
      case "lines": return '<div class="adm-f">' + lab + '<textarea id="' + id + '" rows="' + (f.rows || 4) + '" data-kind="lines"' + dp + ">" + esc((v || []).join("\n")) + "</textarea>" + hint + "</div>";
      case "check": return '<label class="adm-check"><input type="checkbox" data-kind="check"' + dp + (v ? " checked" : "") + "> " + esc(f.label) + "</label>";
      case "color": return '<div class="adm-f">' + lab + '<div class="adm-color"><input id="' + id + '" type="color" data-kind="color"' + dp + ' value="' + esc(safeColor(v, "#d5ff45")) + '"><code>' + esc(v) + "</code></div></div>";
      case "select": return '<div class="adm-f">' + lab + '<select id="' + id + '" data-kind="text"' + dp + ">" + f.options.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (o[0] === v ? " selected" : "") + ">" + esc(o[1]) + "</option>"; }).join("") + "</select></div>";
      case "image":
        return '<div class="adm-f">' + lab + '<div class="adm-img" data-imgwrap data-max="' + (f.max || 1600) + '" data-target="' + esc(path) + '">' +
          '<div class="adm-thumb"' + (v ? ' style="background-image:url(\'' + esc(String(srcOf(v)).replace(/'/g, "%27")) + "')\"" : "") + ">" + (v ? "" : "No image") + "</div>" +
          '<div class="adm-img-side"><input type="text" data-kind="text"' + dp + ' value="' + esc(v) + '" placeholder="path or URL" autocomplete="off">' +
          '<div class="adm-img-btns"><button type="button" class="adm-btn" data-act="pick">Upload image</button><button type="button" class="adm-btn adm-btn--danger" data-act="clearimg">Remove</button></div>' +
          '<input type="file" accept="image/*" data-file hidden></div></div>' + hint + "</div>";
      case "list": return listHTML(f, path);
    }
    return "";
  }

  function listHTML(f, path) {
    const arr = getPath(content, path) || [];
    const items = arr.map(function (it, i) {
      const ip = path + "[" + i + "]";
      const title = (it && it[f.titleKey]) || ((f.itemName || "Item") + " " + (i + 1));
      const ctrl = (f.fixed ? "" : '') +
        '<button type="button" class="adm-mini" data-act="up" data-list="' + esc(path) + '" data-i="' + i + '" title="Move up"' + (i === 0 ? " disabled" : "") + '>↑</button>' +
        '<button type="button" class="adm-mini" data-act="down" data-list="' + esc(path) + '" data-i="' + i + '" title="Move down"' + (i === arr.length - 1 ? " disabled" : "") + '>↓</button>' + (f.fixed ? "" :
        '<button type="button" class="adm-mini is-del" data-act="del" data-list="' + esc(path) + '" data-i="' + i + '" title="Delete">✕</button>');
      const body = f.fields.map(function (sf) {
        return fieldHTML(sf, ip + "." + sf.path, sf.path === f.titleKey ? " data-titlefield" : "");
      }).join("");
      return '<details class="adm-item" data-key="' + esc(ip) + '" data-list="' + esc(path) + '" data-i="' + i + '"><summary><span class="adm-grip" title="Drag to reorder">⠿</span><span class="adm-num">' + pad(i + 1) + '</span><span class="adm-item-title">' + esc(title) + '</span><span class="adm-item-ctrl">' + ctrl + "</span></summary><div class=\"adm-item-body\">" + body + "</div></details>";
    }).join("");
    const add = f.fixed ? "" : '<button type="button" class="adm-add" data-act="add" data-list="' + esc(path) + '">+ Add ' + esc((f.itemName || "item").toLowerCase()) + "</button>";
    return '<div class="adm-list"><h4>' + esc(f.label) + "</h4>" + items + add + "</div>";
  }

  function githubTabHTML() {
    const c = getCfg();
    const connected = !!c.token;
    return '<div class="adm-note"><b>' + (connected ? "✓ Token saved in this browser." : "Connect once to publish from the panel.") + "</b><br>" +
      'Publishing commits <code>data/content.json</code> (and uploaded images) straight to your repository, then GitHub Pages redeploys automatically.<ol>' +
      '<li>Open <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub → New fine-grained token</a></li>' +
      "<li>Repository access → <b>Only select repositories</b> → pick this portfolio repo</li>" +
      "<li>Permissions → Repository permissions → <b>Contents: Read and write</b></li>" +
      "<li>Generate, copy the token and paste it below</li></ol></div>" +
      '<div class="adm-f"><label for="gh-owner">GitHub username / owner</label><input id="gh-owner" type="text" value="' + esc(c.owner) + '" autocomplete="off"></div>' +
      '<div class="adm-f"><label for="gh-repo">Repository name</label><input id="gh-repo" type="text" value="' + esc(c.repo) + '" autocomplete="off"></div>' +
      '<div class="adm-f"><label for="gh-branch">Branch</label><input id="gh-branch" type="text" value="' + esc(c.branch) + '" autocomplete="off"></div>' +
      '<div class="adm-f"><label for="gh-token">Access token</label><input id="gh-token" type="password" value="' + esc(c.token) + '" placeholder="github_pat_…" autocomplete="off"><small class="adm-hint">Stored only in this browser (localStorage). Never put it in your code. Use a private device.</small></div>' +
      '<div class="adm-row"><button type="button" class="adm-btn adm-btn--primary" data-act="gh-save">Save & test connection</button>' +
      '<button type="button" class="adm-btn" data-act="gh-pull">Load latest from GitHub</button>' +
      '<button type="button" class="adm-btn adm-btn--danger" data-act="gh-forget">Forget token</button></div>' +
      "<h4>Backup</h4>" +
      '<div class="adm-row"><button type="button" class="adm-btn" data-act="export">Download content.json</button>' +
      '<button type="button" class="adm-btn" data-act="import">Import content.json</button>' +
      '<button type="button" class="adm-btn adm-btn--danger" data-act="reset">Reset to defaults</button>' +
      '<input type="file" accept="application/json,.json" id="adm-import" hidden></div>' +
      '<small class="adm-hint">Tip: uploaded images that you later stop using stay inside <code>' + UPLOAD_DIR + "/</code> — delete them from GitHub if you want to keep the repo small.</small>";
  }

  function renderTab(scrollTop) {
    const tab = TABS.filter(function (t) { return t.id === activeTab; })[0] || TABS[0];
    const $b = $("#admBody");
    const st = scrollTop !== undefined ? scrollTop : $b.scrollTop();
    const opened = {};
    $b.find("details[open]").each(function () { opened[this.dataset.key] = true; });
    $.extend(opened, openKeys);
    Object.keys(openKeys).forEach(function (k) { delete openKeys[k]; });

    $b.html(tab.custom ? githubTabHTML() : tab.fields.map(function (f) { return fieldHTML(f, f.path); }).join(""));
    $b.find("details").each(function () { if (opened[this.dataset.key]) this.open = true; });
    $b.scrollTop(st);
    $(".adm-tab").each(function () { $(this).toggleClass("is-active", this.dataset.tab === activeTab); });
  }

  function gotoTab(id, scroll) {
    activeTab = id;
    renderTab(0);
    if (scroll !== false && TAB_SECTION[id]) {
      const t = "#" + TAB_SECTION[id];
      if (document.querySelector(t)) scrollToTarget(t);
    }
  }

  /* ---------- Actions ---------- */
  function listOf(path) { return getPath(content, path); }

  async function pullLatest(silent) {
    const c = getCfg();
    if (!c.token || !c.owner || !c.repo) return false;
    try {
      const remote = await ghReadContent();
      if (remote) {
        content = deepMerge(DEFAULTS, remote);
        applyContent(content, { live: true });
        dirty = false;
        if (!silent) toast("Loaded the latest content from GitHub.");
      } else if (!silent) toast("No data/content.json on GitHub yet — your first Publish will create it.");
      return true;
    } catch (e) {
      if (!silent) toast(e.message, "error");
      return false;
    }
  }

  async function publish() {
    if (busy) return;
    const c = getCfg();
    if (!c.token || !c.owner || !c.repo) {
      gotoTab("github", false);
      toast("Connect GitHub first (username, repo and token), then press Publish again.", "error");
      return;
    }
    busy = true; setStatus();
    $("[data-act=publish]").prop("disabled", true).text("Publishing…");
    try {
      const json = JSON.stringify(content, null, 2) + "\n";
      const files = [{ path: CONTENT_URL, content: utf8ToB64(json) }];
      const sent = [];
      Object.keys(pendingFiles).forEach(function (p) {
        if (!pendingFiles[p].uploaded && json.indexOf(p) > -1) { files.push({ path: p, content: pendingFiles[p].base64 }); sent.push(p); }
      });
      await ghCommit(files, "Update site content via admin panel");
      sent.forEach(function (p) { pendingFiles[p].uploaded = true; });
      dirty = false;
      syncedFromGitHub = true;
      toast("Published ✓  GitHub Pages will show the changes in about 1–2 minutes.");
    } catch (e) {
      toast(e.message, "error");
    } finally {
      busy = false; setStatus();
      $("[data-act=publish]").prop("disabled", false).text("Publish");
    }
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(content, null, 2) + "\n"], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "content.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function closeAdmin() {
    if (dirty && !window.confirm("You have unpublished changes. Leave the admin panel anyway?")) return;
    adminOpen = false;
    $body.removeClass("admin-open");
    $("#admPanel").addClass("is-collapsed");
    $("#admFab").prop("hidden", true);
    showLauncher();
    if (location.hash === "#admin" || /[?&]admin(=|&|$)/.test(location.search)) {
      const q = location.search.replace(/[?&]admin(=[^&]*)?/, "").replace(/^&/, "?");
      history.replaceState(null, "", location.pathname + q);
    }
    if (dirty) {
      // Leaving with unpublished edits: put the public page back to what is published.
      dirty = false;
      loadRemoteContent().then(function (r) { content = deepMerge(DEFAULTS, r || {}); applyContent(content, { live: true }); });
    }
  }

  function buildAdmin() {
    ensureAdminStyle();
    const tabs = TABS.map(function (t) { return '<button type="button" class="adm-tab" data-tab="' + t.id + '" role="tab">' + esc(t.title) + "</button>"; }).join("");
    $body.append(
      '<aside class="adm is-collapsed" id="admPanel" data-lenis-prevent aria-label="Admin panel">' +
      '<header class="adm-head"><div class="adm-title"><b>Admin panel</b><span class="adm-status" id="admStatus"></span></div>' +
      '<div class="adm-actions"><button type="button" class="adm-btn adm-btn--primary" data-act="publish">Publish</button>' +
      '<button type="button" class="adm-icon" data-act="collapse" title="Hide panel (keep editing)">›</button>' +
      '<button type="button" class="adm-icon" data-act="exit" title="Exit admin">✕</button></div></header>' +
      '<nav class="adm-tabs" role="tablist">' + tabs + "</nav>" +
      '<div class="adm-body" id="admBody" data-lenis-prevent></div>' +
      '<div class="adm-toast" id="admToast" role="status" aria-live="polite"></div></aside>' +
      '<button type="button" class="adm-fab" id="admFab" hidden>Open admin</button>'
    );
    const $p = $("#admPanel");

    // typing into a field
    $p.on("input change", "[data-path]", function () {
      const $el = $(this), kind = $el.data("kind");
      let v;
      if (kind === "check") v = this.checked;
      else if (kind === "lines") v = this.value.split(/[\n,]+/).map(function (s) { return s.trim(); }).filter(Boolean);
      else v = this.value;
      setPath(content, $el.data("path"), v);
      if (kind === "color") $el.siblings("code").text(v);
      if ($el.is("[data-titlefield]")) $el.closest("details").find(".adm-item-title").first().text(v || "Untitled");
      if ($el.closest("[data-imgwrap]").length) {
        const $w = $el.closest("[data-imgwrap]");
        $w.find(".adm-thumb").css("background-image", v ? "url('" + String(srcOf(v)).replace(/'/g, "%27") + "')" : "").text(v ? "" : "No image");
      }
      markDirty();
      schedulePreview();
    });

    // drag & drop reordering (any list)
    let dragInfo = null;
    $p.on("mousedown touchstart", ".adm-grip", function () { $(this).closest("details").attr("draggable", "true"); });
    $p.on("dragstart", ".adm-item", function (e) {
      dragInfo = { list: this.dataset.list, i: Number(this.dataset.i) };
      $(this).addClass("is-dragging");
      try { e.originalEvent.dataTransfer.effectAllowed = "move"; e.originalEvent.dataTransfer.setData("text/plain", "x"); } catch (err) { /* ignore */ }
    });
    $p.on("dragover", ".adm-item", function (e) {
      if (!dragInfo || dragInfo.list !== this.dataset.list) return;
      e.preventDefault();
      $p.find(".is-over").removeClass("is-over");
      $(this).addClass("is-over");
    });
    $p.on("dragend", ".adm-item", function () { dragInfo = null; $(this).removeAttr("draggable"); $p.find(".is-over,.is-dragging").removeClass("is-over is-dragging"); });
    $p.on("drop", ".adm-item", function (e) {
      if (!dragInfo || dragInfo.list !== this.dataset.list) return;
      e.preventDefault();
      const arr = listOf(dragInfo.list), from = dragInfo.i, to = Number(this.dataset.i);
      dragInfo = null;
      if (from === to) { $p.find(".is-over,.is-dragging").removeClass("is-over is-dragging"); return; }
      const item = arr.splice(from, 1)[0];
      arr.splice(to, 0, item);
      openKeys[this.dataset.list + "[" + to + "]"] = true;
      markDirty(); renderTab(); applyContent(content, { live: true });
    });

    // tabs
    $p.on("click", ".adm-tab", function () { gotoTab(this.dataset.tab); });

    // buttons
    $p.on("click", "[data-act]", async function (e) {
      const act = this.dataset.act, $el = $(this);
      e.preventDefault();
      if (act === "publish") return publish();
      if (act === "collapse") { $p.addClass("is-collapsed"); $("#admFab").prop("hidden", false); return; }
      if (act === "exit") return closeAdmin();

      if (act === "add" || act === "up" || act === "down" || act === "del") {
        e.stopPropagation();
        const lp = $el.data("list"), arr = listOf(lp), i = Number($el.data("i"));
        if (act === "add") {
          const def = TABS.reduce(function (found, t) { return found || (t.fields || []).filter(function (f) { return f.type === "list" && f.path === lp; })[0]; }, null);
          arr.push(clone(def.blank));
          openKeys[lp + "[" + (arr.length - 1) + "]"] = true;
        } else if (act === "del") {
          if (!window.confirm("Delete this item?")) return;
          arr.splice(i, 1);
        } else {
          const j = act === "up" ? i - 1 : i + 1;
          if (j < 0 || j >= arr.length) return;
          const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
          openKeys[lp + "[" + j + "]"] = true;
        }
        markDirty(); renderTab(); applyContent(content, { live: true });
        return;
      }

      if (act === "pick") { $el.closest("[data-imgwrap]").find("[data-file]").trigger("click"); return; }
      if (act === "clearimg") {
        const $w = $el.closest("[data-imgwrap]");
        setPath(content, $w.data("target"), "");
        $w.find("input[type=text]").val("");
        $w.find(".adm-thumb").css("background-image", "").text("No image");
        markDirty(); applyContent(content, { live: true });
        return;
      }

      if (act === "gh-save") {
        const cfg = { owner: $.trim($("#gh-owner").val()), repo: $.trim($("#gh-repo").val()), branch: $.trim($("#gh-branch").val()) || "main", token: $.trim($("#gh-token").val()) };
        saveCfg(cfg);
        if (!cfg.token || !cfg.owner || !cfg.repo) { toast("Please fill in username, repository and token.", "error"); return; }
        try {
          const repo = await ghApi(repoBase());
          if (repo.permissions && repo.permissions.push === false) { toast("Connected, but this token cannot write to the repo. Give it “Contents: Read and write”.", "error"); return; }
          toast("Connected to " + repo.full_name + " ✓");
          if (!dirty) { await pullLatest(true); syncedFromGitHub = true; }
        } catch (err) { toast(err.message, "error"); }
        return;
      }
      if (act === "gh-pull") {
        if (dirty && !window.confirm("This replaces your unpublished changes with what is on GitHub. Continue?")) return;
        const ok = await pullLatest(false);
        if (ok) renderTab();
        return;
      }
      if (act === "gh-forget") {
        try { localStorage.removeItem(ADMIN_STORE); } catch (err) { /* ignore */ }
        renderTab(); toast("Token removed from this browser.");
        return;
      }
      if (act === "export") return downloadJSON();
      if (act === "import") { $("#adm-import").trigger("click"); return; }
      if (act === "reset") {
        if (!window.confirm("Reset ALL content to the built-in defaults? (Nothing is published until you press Publish.)")) return;
        content = clone(DEFAULTS); markDirty(); applyContent(content, { live: true }); renderTab();
      }
    });

    // image upload
    $p.on("change", "[data-file]", async function () {
      const file = this.files && this.files[0];
      const $w = $(this).closest("[data-imgwrap]");
      this.value = "";
      if (!file) return;
      try {
        toast("Optimising image…");
        const out = await processImage(file, Number($w.data("max")) || 1600);
        const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
        const path = UPLOAD_DIR + "/" + Date.now().toString(36) + "-" + base + "." + out.ext;
        pendingFiles[path] = { dataUrl: out.dataUrl, base64: out.dataUrl.split(",")[1], uploaded: false };
        setPath(content, $w.data("target"), path);
        $w.find("input[type=text]").val(path);
        $w.find(".adm-thumb").css("background-image", "url('" + out.dataUrl + "')").text("");
        markDirty(); applyContent(content, { live: true });
        toast("Image ready (" + Math.round(out.dataUrl.length * 0.75 / 1024) + " KB). It uploads when you press Publish.");
      } catch (err) { toast(err.message, "error"); }
    });

    // import JSON
    $p.on("change", "#adm-import", function () {
      const file = this.files && this.files[0];
      this.value = "";
      if (!file) return;
      const r = new FileReader();
      r.onload = function () {
        try {
          content = deepMerge(DEFAULTS, JSON.parse(r.result));
          markDirty(); applyContent(content, { live: true }); renderTab();
          toast("Imported. Press Publish to make it live.");
        } catch (err) { toast("That file is not valid JSON.", "error"); }
      };
      r.readAsText(file);
    });

    $("#admFab").on("click", function () { $p.removeClass("is-collapsed"); $(this).prop("hidden", true); });
    window.addEventListener("beforeunload", function (e) { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
    adminReady = true;
  }

  async function openAdmin() {
    if (adminOpen) return;
    if (!adminReady) buildAdmin();
    if (!isLoggedIn()) { location.replace(LOGIN_URL); return; }
    adminOpen = true;
    $("#admLaunch").prop("hidden", true);
    $body.addClass("admin-open");
    $(".page-loader").addClass("is-done");
    $("#admPanel").removeClass("is-collapsed");
    $("#admFab").prop("hidden", true);
    const connected = !!getCfg().token;
    activeTab = connected ? "general" : "github";
    renderTab(0);
    setStatus();
    if (!connected) toast("Welcome! First connect your GitHub repository & token (one-time).");
    else if (!syncedFromGitHub) { syncedFromGitHub = true; await pullLatest(true); if (!dirty) renderTab(0); }
  }

  /* ---------- Login gate (login page: /mahir-khan-admin/) ---------- */
  const SESSION_KEY = "abrar-admin-session";
  const LOGIN_URL = "mahir-khan-admin/";
  function isLoggedIn() {
    try { const s = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); return !!(s && s.exp > Date.now()); } catch (e) { return false; }
  }
  function logout() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* ignore */ }
    if (adminOpen) { dirty = false; closeAdmin(); }
    $("#admLaunch").remove();
  }
  function showLauncher() {
    if (!isLoggedIn()) return;
    ensureAdminStyle();
    let $l = $("#admLaunch");
    if (!$l.length) {
      $l = $('<div class="adm-launch" id="admLaunch"><button type="button" class="adm-launch__open">Open admin</button><button type="button" class="adm-launch__out" title="Log out">Log out</button></div>').appendTo($body);
      $l.on("click", ".adm-launch__open", function () { openAdmin(); });
      $l.on("click", ".adm-launch__out", logout);
    }
    $l.prop("hidden", adminOpen);
  }

  function checkAdminRoute() {
    const wantsAdmin = location.hash === "#admin" || /[?&]admin(=|&|$)/.test(location.search);
    if (wantsAdmin) {
      if (isLoggedIn()) openAdmin();
      else location.replace(LOGIN_URL);
      return;
    }
    showLauncher();
  }
  window.addEventListener("hashchange", checkAdminRoute);

  /* ======================================================================
     7. BOOT
     ====================================================================== */
  function loadRemoteContent() {
    return fetch(CONTENT_URL + "?v=" + Math.floor(Date.now() / 60000), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  const windowLoaded = new Promise(function (resolve) {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve);
  });
  let contentApplied = false;
  const remote = loadRemoteContent().then(function (data) {
    content = deepMerge(DEFAULTS, data || {});
    applyContent(content);
    contentApplied = true;
  });
  const slowFallback = new Promise(function (resolve) {
    setTimeout(function () {
      if (!contentApplied) { applyContent(content); contentApplied = true; }
      resolve();
    }, 3500);
  });

  Promise.race([remote, slowFallback]).then(function () { return windowLoaded; }).then(function () {
    startExperience();
    checkAdminRoute();
  });

  // Safety net if animation libraries are unavailable.
  if (!window.gsap || !window.ScrollTrigger) $(".reveal").css({ opacity: 1, transform: "none" });
})(jQuery);
