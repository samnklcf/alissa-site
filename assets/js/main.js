/* Alissa IA – JS léger, sans dépendance. Le contenu reste lisible sans JS (SEO). */
(() => {
  const d = document;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Menu mobile ── */
  const btn = d.getElementById("menu-btn"), nav = d.getElementById("mobile-nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
      btn.querySelector(".i-open").classList.toggle("hidden", open);
      btn.querySelector(".i-close").classList.toggle("hidden", !open);
    });
  }

  /* ── Ombre du header au scroll ── */
  const header = d.getElementById("site-header");
  if (header) {
    const f = () => header.classList.toggle("is-stuck", window.scrollY > 8);
    f(); addEventListener("scroll", f, { passive: true });
  }

  /* ── Hero slider (autoplay, pause au survol/focus, clavier, swipe, reduced-motion) ── */
  const hero = d.getElementById("hero-slider");
  if (hero) {
    const slides = [...hero.querySelectorAll(".slide")], dots = [...hero.querySelectorAll(".dot")];
    const wrap = d.getElementById("hero-slides"), toggle = d.getElementById("hero-toggle");
    const DELAY = 7000;
    let i = 0, playing = !reduce, hold = false, last = 0, elapsed = 0;

    const live = () => wrap.setAttribute("aria-live", playing ? "off" : "polite");
    const go = (n) => {
      i = (n + slides.length) % slides.length; elapsed = 0; hero.style.setProperty("--p", 0);
      slides.forEach((s, k) => { s.classList.toggle("is-active", k === i); s.setAttribute("aria-hidden", String(k !== i)); });
      dots.forEach((b, k) => { b.classList.toggle("is-on", k === i); k === i ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current"); });
    };
    const setPlay = (v) => {
      playing = v; live();
      toggle.setAttribute("aria-label", v ? "Mettre le diaporama en pause" : "Lancer le diaporama");
      toggle.querySelector(".i-pause").classList.toggle("hidden", !v);
      toggle.querySelector(".i-play").classList.toggle("hidden", v);
    };
    const loop = (t) => {
      const dt = Math.min(t - (last || t), 100); last = t;
      if (playing && !hold && !d.hidden) {
        elapsed += dt; hero.style.setProperty("--p", Math.min(elapsed / DELAY, 1));
        if (elapsed >= DELAY) go(i + 1);
      }
      requestAnimationFrame(loop);
    };

    d.getElementById("hero-prev").addEventListener("click", () => go(i - 1));
    d.getElementById("hero-next").addEventListener("click", () => go(i + 1));
    toggle.addEventListener("click", () => setPlay(!playing));
    dots.forEach((b, k) => b.addEventListener("click", () => go(k)));
    hero.addEventListener("mouseenter", () => (hold = true));
    hero.addEventListener("mouseleave", () => (hold = false));
    hero.addEventListener("focusin", () => (hold = true));
    hero.addEventListener("focusout", () => (hold = false));
    hero.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(i - 1); else if (e.key === "ArrowRight") go(i + 1);
    });
    let x0 = null;
    hero.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
    }, { passive: true });

    go(0); setPlay(playing); requestAnimationFrame(loop);
  }

  /* ── Compteurs ── */
  const counters = d.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target, end = +el.dataset.count, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
        const t0 = performance.now(), dur = 1400;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
          el.textContent = pre + Math.round(end * e) + suf;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ── Formulaire de contact (Web3Forms) ── */
  const form = d.getElementById("contact-form");
  if (form) {
    const ENDPOINT = "https://api.web3forms.com/submit", WA = "https://wa.me/24174570040";
    const res = d.getElementById("form-result"), submit = d.getElementById("submit-btn");
    const txt = d.getElementById("btn-text"), ico = d.getElementById("btn-icon"), spin = d.getElementById("btn-spinner");
    const LABEL = txt.textContent;
    let busy = false, lastOk = 0, hideT;

    const show = (ok, msg, withWa) => {
      clearTimeout(hideT);
      res.textContent = msg;
      res.className = "mt-5 rounded-xl border p-4 text-center font-medium " +
        (ok ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-800");
      if (withWa) {
        const a = d.createElement("a");
        a.href = WA; a.target = "_blank"; a.rel = "noopener"; a.textContent = "nous écrire sur WhatsApp";
        a.className = "font-bold underline";
        res.append(" Vous pouvez aussi ", a, ".");
      }
      if (ok) hideT = setTimeout(() => res.classList.add("hidden"), 8000);
    };
    const loading = (on) => {
      busy = on; submit.disabled = on; submit.setAttribute("aria-busy", String(on));
      txt.textContent = on ? "Envoi en cours..." : LABEL;
      ico.classList.toggle("hidden", on); spin.classList.toggle("hidden", !on);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (busy) return;
      if (form.botcheck && form.botcheck.checked) { form.reset(); return; }          // robot : on ignore silencieusement
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (Date.now() - lastOk < 30000) { show(true, "Votre message a bien été envoyé. Merci de patienter avant d'en envoyer un autre."); return; }

      const data = Object.fromEntries(new FormData(form));
      ["name", "email", "phone", "message"].forEach((k) => (data[k] = String(data[k] || "").trim()));
      data.whatsapp = data.whatsapp ? "Oui" : "Non";
      data.subject = "[Site alissaia.com] " + (data.sujet || "Contact");
      delete data.botcheck;

      loading(true); res.classList.add("hidden");
      const ctrl = new AbortController(), to = setTimeout(() => ctrl.abort(), 15000);
      try {
        const r = await fetch(ENDPOINT, {
          method: "POST", signal: ctrl.signal,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        const j = await r.json().catch(() => ({}));
        if (r.ok && j.success !== false) {
          show(true, "Message envoyé avec succès. Nous vous répondons très vite.");
          form.reset(); lastOk = Date.now();
        } else {
          show(false, (j && j.message) ? "Envoi impossible : " + j.message + "." : "Envoi impossible pour le moment.", true);
        }
      } catch (err) {
        show(false, err && err.name === "AbortError" ? "Le serveur met trop de temps à répondre. Réessayez dans un instant." : "Connexion impossible. Vérifiez votre réseau et réessayez.", true);
      } finally {
        clearTimeout(to); loading(false);
      }
    });
  }
})();
