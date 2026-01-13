(() => { // Inicia escopo isolado para evitar variáveis globais
  const qs = (sel, el = document) => el.querySelector(sel); // Helper para selecionar um elemento
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel)); // Helper para selecionar um elemento

  const year = qs("#year"); // Seleciona o elemento do ano no rodapé
  if (year) year.textContent = String(new Date().getFullYear()); // Define o ano atual automaticamente

  const header = qs(".header"); // Linha de lógica JavaScript
  const headerOffset = () => (header ? header.getBoundingClientRect().height : 0); // Linha de lógica JavaScript

  const navToggle = qs(".nav__toggle"); // Linha de lógica JavaScript
  const navMenu = qs("#navMenu"); // Linha de lógica JavaScript
  const navLinks = qsa(".nav__link, .nav__cta"); // Linha de lógica JavaScript

  const setMenuOpen = (open) => { // Linha de lógica JavaScript
    if (!navToggle || !navMenu) return; // Condicional de segurança/controle de fluxo
    navMenu.classList.toggle("is-open", open); // Linha de lógica JavaScript
    navToggle.setAttribute("aria-expanded", String(open)); // Linha de lógica JavaScript
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu"); // Linha de lógica JavaScript
  }; // Estrutura de bloco

  if (navToggle) { // Condicional de segurança/controle de fluxo
    navToggle.addEventListener("click", () => { // Registra um evento de interação do usuário
      const isOpen = navMenu?.classList.contains("is-open"); // Linha de lógica JavaScript
      setMenuOpen(!isOpen); // Linha de lógica JavaScript
    }); // Estrutura de bloco
  } // Estrutura de bloco

  navLinks.forEach((a) => a.addEventListener("click", () => setMenuOpen(false))); // Registra um evento de interação do usuário

  document.addEventListener("click", (e) => { // Registra um evento de interação do usuário
    if (!navMenu || !navToggle) return; // Condicional de segurança/controle de fluxo
    const target = e.target; // Linha de lógica JavaScript
    const clickInside = navMenu.contains(target) || navToggle.contains(target); // Linha de lógica JavaScript
    if (!clickInside) setMenuOpen(false); // Condicional de segurança/controle de fluxo
  }); // Estrutura de bloco

  const smoothJump = (hash) => { // Linha de lógica JavaScript
    const el = qs(hash); // Linha de lógica JavaScript
    if (!el) return; // Condicional de segurança/controle de fluxo
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 12; // Linha de lógica JavaScript
    window.scrollTo({ top: y, behavior: "smooth" }); // Rola a página com comportamento suave
  }; // Estrutura de bloco

  qsa('a[href^="#"]').forEach((a) => { // Linha de lógica JavaScript
    a.addEventListener("click", (e) => { // Registra um evento de interação do usuário
      const href = a.getAttribute("href"); // Linha de lógica JavaScript
      if (!href || href === "#") return; // Condicional de segurança/controle de fluxo
      e.preventDefault(); // Linha de lógica JavaScript
      smoothJump(href); // Linha de lógica JavaScript
      history.replaceState(null, "", href); // Linha de lógica JavaScript
    }); // Estrutura de bloco
  }); // Estrutura de bloco

  const sections = qsa("main section[id]"); // Linha de lógica JavaScript
  const linkById = new Map(); // Linha de lógica JavaScript
  qsa(".nav__link").forEach((a) => { // Linha de lógica JavaScript
    const href = a.getAttribute("href"); // Linha de lógica JavaScript
    if (href?.startsWith("#")) linkById.set(href.slice(1), a); // Condicional de segurança/controle de fluxo
  }); // Estrutura de bloco

  const io = new IntersectionObserver((entries) => { // Configura observador para scrollspy/animações
    entries.forEach((entry) => { // Linha de lógica JavaScript
      const id = entry.target.getAttribute("id"); // Linha de lógica JavaScript
      const link = id ? linkById.get(id) : null; // Linha de lógica JavaScript
      if (!link) return; // Condicional de segurança/controle de fluxo
      if (entry.isIntersecting) { // Condicional de segurança/controle de fluxo
        qsa(".nav__link").forEach((l) => l.classList.remove("is-active")); // Linha de lógica JavaScript
        link.classList.add("is-active"); // Linha de lógica JavaScript
      } // Estrutura de bloco
    }); // Estrutura de bloco
  }, { rootMargin: "-50% 0px -45% 0px", threshold: 0.02 }); // Linha de lógica JavaScript
  sections.forEach((s) => io.observe(s)); // Linha de lógica JavaScript

  const revealEls = qsa(".reveal"); // Linha de lógica JavaScript
  const revealIO = new IntersectionObserver((entries) => { // Configura observador para scrollspy/animações
    entries.forEach((entry) => { // Linha de lógica JavaScript
      if (entry.isIntersecting) { // Condicional de segurança/controle de fluxo
        entry.target.classList.add("is-in"); // Linha de lógica JavaScript
        revealIO.unobserve(entry.target); // Linha de lógica JavaScript
      } // Estrutura de bloco
    }); // Estrutura de bloco
  }, { threshold: 0.12 }); // Linha de lógica JavaScript
  revealEls.forEach((el) => revealIO.observe(el)); // Linha de lógica JavaScript

  const modal = qs("#infoModal"); // Linha de lógica JavaScript
  const modalTitle = qs("#modalTitle"); // Linha de lógica JavaScript
  const modalBody = qs("#modalBody"); // Linha de lógica JavaScript

  const services = { // Linha de lógica JavaScript
    automation: { title: "AI & Workflow Automation", body: "<p>We automate repetitive operations across your tools, with logging and error handling.</p><ul><li>Approvals, notifications, reporting</li><li>Data sync between systems</li><li>Scheduled tasks and alerts</li></ul>" }, // Linha de lógica JavaScript
    integrations: { title: "Integrations & APIs", body: "<p>We connect platforms using stable APIs and webhooks, reducing duplicates and manual updates.</p><ul><li>CRM / ERP / eCommerce sync</li><li>WhatsApp, chat, email flows</li><li>Payment, invoicing, reconciliation</li></ul>" }, // Linha de lógica JavaScript
    webapps: { title: "Web Apps & Dashboards", body: "<p>Internal tools and dashboards built for speed, clarity, and maintainability.</p><ul><li>Admin panels and portals</li><li>Real-time metrics and alerts</li><li>Role-based access options</li></ul>" }, // Linha de lógica JavaScript
    commerce: { title: "Commerce & Payment Automations", body: "<p>Automation around checkout, payments, fulfillment, and support workflows.</p><ul><li>Abandoned cart & follow-ups</li><li>Payment failure recovery</li><li>Order status and delivery notifications</li></ul>" }, // Linha de lógica JavaScript
    devops: { title: "Cloud & DevOps", body: "<p>Deployments and monitoring that keep your services online and secure.</p><ul><li>CI/CD setup</li><li>Backups and observability</li><li>Security hardening basics</li></ul>" }, // Linha de lógica JavaScript
    support: { title: "Support & Optimization", body: "<p>Keep workflows reliable and improve performance over time.</p><ul><li>Maintenance plans</li><li>SLA options</li><li>Performance tuning and reviews</li></ul>" }, // Linha de lógica JavaScript
  }; // Estrutura de bloco

  const projects = { // Linha de lógica JavaScript
    ops: { title: "Ops Workflow Automation", body: "<p><strong>Problem:</strong> approvals and reporting were manual and inconsistent.</p><p><strong>Solution:</strong> automated approvals, scheduled reporting, and error alerts.</p><p><strong>Outcome:</strong> -42% manual tasks and faster weekly reporting.</p><p class=\"muted\"><strong>Stack:</strong> Webhooks, Node/Python, automation workflows, dashboard.</p>" }, // Linha de lógica JavaScript
    api: { title: "API Integration Hub", body: "<p><strong>Problem:</strong> data was split across CRM, ERP, and eCommerce.</p><p><strong>Solution:</strong> integration layer + validation + deduplication.</p><p><strong>Outcome:</strong> fewer errors and predictable operations.</p><p class=\"muted\"><strong>Stack:</strong> REST APIs, queues, logs, monitoring.</p>" }, // Linha de lógica JavaScript
    dash: { title: "Revenue Dashboard", body: "<p><strong>Problem:</strong> decisions were made with delayed spreadsheets.</p><p><strong>Solution:</strong> real-time KPIs, alerts, and a single view of revenue drivers.</p><p><strong>Outcome:</strong> faster decision-making and fewer surprises.</p><p class=\"muted\"><strong>Stack:</strong> Postgres, dashboards, scheduled jobs.</p>" }, // Linha de lógica JavaScript
    support: { title: "Customer Support Routing", body: "<p><strong>Problem:</strong> requests were manually triaged and often delayed.</p><p><strong>Solution:</strong> auto-routing, tagging, and priority rules.</p><p><strong>Outcome:</strong> response time improved by 31%.</p>" }, // Linha de lógica JavaScript
    data: { title: "Data Quality Checks", body: "<p><strong>Problem:</strong> bad data caused downstream issues and rework.</p><p><strong>Solution:</strong> scheduled validation checks and alerts.</p><p><strong>Outcome:</strong> fewer incidents and faster reporting.</p>" }, // Linha de lógica JavaScript
    pay: { title: "Payments & Reconciliation", body: "<p><strong>Problem:</strong> reconciliation was manual and slow.</p><p><strong>Solution:</strong> automated matching, export, and exception alerts.</p><p><strong>Outcome:</strong> faster month-end close and fewer mistakes.</p>" }, // Linha de lógica JavaScript
  }; // Estrutura de bloco

  const openModal = ({ title, body }) => { // Linha de lógica JavaScript
    if (!modal || !modalTitle || !modalBody) return; // Condicional de segurança/controle de fluxo
    modalTitle.textContent = title; // Linha de lógica JavaScript
    modalBody.innerHTML = body; // Linha de lógica JavaScript
    modal.showModal(); // Abre o modal nativo do HTML
  }; // Estrutura de bloco

  const closeModal = () => { // Linha de lógica JavaScript
    if (!modal) return; // Condicional de segurança/controle de fluxo
    modal.close(); // Fecha o modal
  }; // Estrutura de bloco

  qsa("[data-service]").forEach((btn) => { // Linha de lógica JavaScript
    btn.addEventListener("click", () => { // Registra um evento de interação do usuário
      const key = btn.getAttribute("data-service"); // Linha de lógica JavaScript
      if (!key || !services[key]) return; // Condicional de segurança/controle de fluxo
      openModal(services[key]); // Linha de lógica JavaScript
    }); // Estrutura de bloco
  }); // Estrutura de bloco

  qsa("[data-project]").forEach((btn) => { // Linha de lógica JavaScript
    btn.addEventListener("click", () => { // Registra um evento de interação do usuário
      const key = btn.getAttribute("data-project"); // Linha de lógica JavaScript
      if (!key || !projects[key]) return; // Condicional de segurança/controle de fluxo
      openModal(projects[key]); // Linha de lógica JavaScript
    }); // Estrutura de bloco
  }); // Estrutura de bloco

  qsa("[data-close-modal]").forEach((btn) => btn.addEventListener("click", () => closeModal())); // Registra um evento de interação do usuário

  if (modal) { // Condicional de segurança/controle de fluxo
    modal.addEventListener("click", (e) => { // Registra um evento de interação do usuário
      const rect = modal.getBoundingClientRect(); // Linha de lógica JavaScript
      const isInDialog = rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width; // Linha de lógica JavaScript
      if (!isInDialog) closeModal(); // Condicional de segurança/controle de fluxo
    }); // Estrutura de bloco
  } // Estrutura de bloco

  const filterBtns = qsa(".chip[data-filter]"); // Linha de lógica JavaScript
  const projectsEls = qsa(".project[data-category]"); // Linha de lógica JavaScript

  const setActiveFilter = (key) => { // Linha de lógica JavaScript
    filterBtns.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-filter") === key)); // Linha de lógica JavaScript
    projectsEls.forEach((p) => { // Linha de lógica JavaScript
      const cat = p.getAttribute("data-category"); // Linha de lógica JavaScript
      p.style.display = key === "all" || cat === key ? "" : "none"; // Linha de lógica JavaScript
    }); // Estrutura de bloco
  }; // Estrutura de bloco

  filterBtns.forEach((b) => b.addEventListener("click", () => setActiveFilter(b.getAttribute("data-filter") || "all"))); // Registra um evento de interação do usuário

  const tTrack = qs("#testimonialTrack"); // Linha de lógica JavaScript
  const tPrev = qs("#tPrev"); // Linha de lógica JavaScript
  const tNext = qs("#tNext"); // Linha de lógica JavaScript
  const tDots = qs("#tDots"); // Linha de lógica JavaScript

  const tSlides = tTrack ? qsa(".testimonial", tTrack) : []; // Linha de lógica JavaScript
  let tIndex = 0; // Linha de lógica JavaScript

  const renderDots = () => { // Linha de lógica JavaScript
    if (!tDots) return; // Condicional de segurança/controle de fluxo
    tDots.innerHTML = ""; // Linha de lógica JavaScript
    tSlides.forEach((_, i) => { // Linha de lógica JavaScript
      const dot = document.createElement("button"); // Linha de lógica JavaScript
      dot.type = "button"; // Linha de lógica JavaScript
      dot.className = "dotbtn" + (i === tIndex ? " is-active" : ""); // Linha de lógica JavaScript
      dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`); // Linha de lógica JavaScript
      dot.addEventListener("click", () => goTo(i)); // Registra um evento de interação do usuário
      tDots.appendChild(dot); // Linha de lógica JavaScript
    }); // Estrutura de bloco
  }; // Estrutura de bloco

  const goTo = (i) => { // Linha de lógica JavaScript
    if (!tTrack) return; // Condicional de segurança/controle de fluxo
    tIndex = (i + tSlides.length) % tSlides.length; // Linha de lógica JavaScript
    tTrack.style.transform = `translateX(-${tIndex * 100}%)`; // Linha de lógica JavaScript
    renderDots(); // Linha de lógica JavaScript
  }; // Estrutura de bloco

  if (tSlides.length) { // Condicional de segurança/controle de fluxo
    renderDots(); // Linha de lógica JavaScript
    tPrev?.addEventListener("click", () => goTo(tIndex - 1)); // Registra um evento de interação do usuário
    tNext?.addEventListener("click", () => goTo(tIndex + 1)); // Registra um evento de interação do usuário
    const viewport = qs(".carousel__viewport"); // Linha de lógica JavaScript
    viewport?.addEventListener("keydown", (e) => { // Registra um evento de interação do usuário
      if (e.key === "ArrowLeft") goTo(tIndex - 1); // Condicional de segurança/controle de fluxo
      if (e.key === "ArrowRight") goTo(tIndex + 1); // Condicional de segurança/controle de fluxo
    }); // Estrutura de bloco
  } // Estrutura de bloco

  const accordion = qs("[data-accordion]"); // Linha de lógica JavaScript
  if (accordion) { // Condicional de segurança/controle de fluxo
    const triggers = qsa(".accordion__trigger", accordion); // Linha de lógica JavaScript
    triggers.forEach((btn) => { // Linha de lógica JavaScript
      btn.addEventListener("click", () => { // Registra um evento de interação do usuário
        const expanded = btn.getAttribute("aria-expanded") === "true"; // Linha de lógica JavaScript
        triggers.forEach((b) => { // Linha de lógica JavaScript
          b.setAttribute("aria-expanded", "false"); // Linha de lógica JavaScript
          const panel = b.nextElementSibling; // Linha de lógica JavaScript
          if (panel) panel.hidden = true; // Condicional de segurança/controle de fluxo
        }); // Estrutura de bloco
        btn.setAttribute("aria-expanded", String(!expanded)); // Linha de lógica JavaScript
        const panel = btn.nextElementSibling; // Linha de lógica JavaScript
        if (panel) panel.hidden = expanded; // Condicional de segurança/controle de fluxo
      }); // Estrutura de bloco
    }); // Estrutura de bloco
  } // Estrutura de bloco

  const form = qs("#contactForm"); // Linha de lógica JavaScript
  const status = qs("#formStatus"); // Linha de lógica JavaScript

  const setError = (name, msg) => { // Linha de lógica JavaScript
    const el = qs(`[data-error-for="${name}"]`); // Linha de lógica JavaScript
    if (el) el.textContent = msg; // Condicional de segurança/controle de fluxo
  }; // Estrutura de bloco

  const clearErrors = () => { // Linha de lógica JavaScript
    qsa("[data-error-for]").forEach((el) => (el.textContent = "")); // Linha de lógica JavaScript
    if (status) status.textContent = ""; // Condicional de segurança/controle de fluxo
  }; // Estrutura de bloco

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Linha de lógica JavaScript

  if (form) { // Condicional de segurança/controle de fluxo
    form.addEventListener("submit", (e) => { // Registra um evento de interação do usuário
      e.preventDefault(); // Linha de lógica JavaScript
      clearErrors(); // Linha de lógica JavaScript

      const data = new FormData(form); // Lê os dados do formulário
      const hp = String(data.get("website") || "").trim(); // Linha de lógica JavaScript
      if (hp) return; // Condicional de segurança/controle de fluxo

      const name = String(data.get("name") || "").trim(); // Linha de lógica JavaScript
      const email = String(data.get("email") || "").trim(); // Linha de lógica JavaScript
      const type = String(data.get("type") || "").trim(); // Linha de lógica JavaScript
      const budget = String(data.get("budget") || "").trim(); // Linha de lógica JavaScript
      const message = String(data.get("message") || "").trim(); // Linha de lógica JavaScript
      const company = String(data.get("company") || "").trim(); // Linha de lógica JavaScript

      let ok = true; // Linha de lógica JavaScript

      if (!name) { setError("name", "Please enter your name."); ok = false; } // Condicional de segurança/controle de fluxo
      if (!email || !isEmail(email)) { setError("email", "Please enter a valid email."); ok = false; } // Condicional de segurança/controle de fluxo
      if (!type) { setError("type", "Please choose a project type."); ok = false; } // Condicional de segurança/controle de fluxo
      if (!budget) { setError("budget", "Please choose a budget range."); ok = false; } // Condicional de segurança/controle de fluxo
      if (!message) { setError("message", "Please write a short message."); ok = false; } // Condicional de segurança/controle de fluxo

      if (!ok) { // Condicional de segurança/controle de fluxo
        if (status) status.textContent = "Please review the highlighted fields."; // Condicional de segurança/controle de fluxo
        return; // Sai da função cedo quando necessário
      } // Estrutura de bloco

      const subject = encodeURIComponent(`[GrandLegend Tech] New project inquiry — ${type}`); // Linha de lógica JavaScript
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\nProject type: ${type}\nBudget: ${budget}\n\nMessage:\n${message}\n`); // Linha de lógica JavaScript

      window.location.href = `mailto:boscaratopietro@gmail.com?subject=${subject}&body=${body}`; // Envia via mailto abrindo o cliente de e-mail

      if (status) status.textContent = "Opening your email client… If it does not open, please email hello@grandlegend.tech."; // Condicional de segurança/controle de fluxo
      form.reset(); // Linha de lógica JavaScript
    }); // Estrutura de bloco
  } // Estrutura de bloco
})(); // Finaliza o escopo isolado
