/* =========================================================
   Portfolio — interactions & animations
   ========================================================= */

// Rôles affichés avec l'effet machine à écrire (modifiez librement)
const ROLES = ["Full-Stack", "passionnée de code", "curieuse & motivée", "prête pour un premier poste"];

// Optionnel : créez un formulaire gratuit sur https://formspree.io et collez l'URL ici.
// Laissé vide, le formulaire ouvre la messagerie de l'internaute.
const FORMSPREE_URL = "";
const CONTACT_EMAIL = "sabrinekessentini5@gmail.com";

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Thème (mémorisé) ---------- */
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
  else if (window.matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";
} catch (e) {}
$("#themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

/* ---------- Préchargeur ---------- */
document.body.classList.add("loading");
window.addEventListener("load", () => {
  setTimeout(() => {
    $("#loader").classList.add("hidden");
    document.body.classList.remove("loading");
    document.body.classList.add("ready");
    typeLoop();
  }, reduceMotion ? 0 : 1300);
});

/* ---------- Machine à écrire ---------- */
function typeLoop() {
  const el = $("#typed");
  let r = 0, i = 0, deleting = false;
  const tick = () => {
    const word = ROLES[r];
    el.textContent = word.slice(0, i);
    if (!deleting && i < word.length) { i++; setTimeout(tick, 80); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1600); }
    else if (i > 0) { i--; setTimeout(tick, 40); }
    else { deleting = false; r = (r + 1) % ROLES.length; setTimeout(tick, 300); }
  };
  tick();
}

/* ---------- Apparition au scroll + compteurs ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    $$("[data-count]", e.target).forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
$$(".reveal").forEach((el) => io.observe(el));

function countUp(el) {
  const target = +el.dataset.count;
  const start = performance.now();
  const dur = 1600;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Scroll : progression, nav, lien actif, timeline ---------- */
const nav = $("#nav");
const progress = $("#progress");
const sections = $$("main section[id]");
const navLinks = $$(".nav__links a");
const timeline = $("#timeline");
const timelineFill = $("#timelineFill");
let lastY = 0;

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (y / max) * 100 + "%";

  // Masque la nav en descendant, la réaffiche en remontant
  nav.classList.toggle("hide", y > lastY && y > 300 && !$("#navLinks").classList.contains("open"));
  lastY = y;

  // Lien actif
  let current = "";
  sections.forEach((s) => { if (y >= s.offsetTop - innerHeight / 3) current = s.id; });
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

  // Remplissage de la ligne du parcours
  const rect = timeline.getBoundingClientRect();
  const ratio = Math.min(Math.max((innerHeight * 0.6 - rect.top) / rect.height, 0), 1);
  timelineFill.style.height = ratio * 100 + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const burger = $("#burger");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  $("#navLinks").classList.toggle("open");
});
navLinks.forEach((a) => a.addEventListener("click", () => {
  burger.classList.remove("open");
  $("#navLinks").classList.remove("open");
}));

/* ---------- Curseur personnalisé ---------- */
if (finePointer && !reduceMotion) {
  const cursor = $("#cursor"), dot = $("#cursorDot");
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  window.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  (function follow() {
    cx += (mx - cx) * 0.15; cy += (my - cy) * 0.15;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();
  $$("a, button, .tilt").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

/* ---------- Effets souris : boutons magnétiques, cartes 3D, portrait ---------- */
if (finePointer && !reduceMotion) {
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
  });

  $$(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", px * 100 + "%");
      card.style.setProperty("--my", py * 100 + "%");
      card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * 8}deg) rotateX(${(0.5 - py) * 8}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });

  const portrait = $("#portrait");
  const hero = $(".hero");
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    portrait.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });
  hero.addEventListener("mouseleave", () => (portrait.style.transform = ""));
}

/* ---------- Filtre des projets ---------- */
$$(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".project").forEach((p) => {
      const show = f === "all" || p.dataset.cat === f;
      p.classList.toggle("is-hidden", !show);
      if (show) {
        p.classList.remove("visible");
        requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add("visible")));
      }
    });
  });
});

/* ---------- Formulaire de contact ---------- */
$("#contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const btn = $("button", form);

  if (FORMSPREE_URL) {
    btn.textContent = "Envoi…";
    try {
      const res = await fetch(FORMSPREE_URL, { method: "POST", body: data, headers: { Accept: "application/json" } });
      btn.textContent = res.ok ? "Message envoyé ✓" : "Erreur, réessayez";
      if (res.ok) form.reset();
    } catch {
      btn.textContent = "Erreur, réessayez";
    }
    return;
  }

  const subject = encodeURIComponent(`Contact portfolio — ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} — ${data.get("email")}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

/* ---------- Année du footer ---------- */
$("#year").textContent = new Date().getFullYear();
