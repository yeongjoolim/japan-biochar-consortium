/* Japan Biochar Consortium – site renderer (no build step, no server needed) */
window.JBC_BOOT = function (SITE) {
  "use strict";

  /* ---------- data ---------- */
  let DATA = SITE;
  // 관리 화면의 [미리보기]에서 열면 저장 전 초안을 보여줌
  try {
    if (/[?&]preview=1/.test(location.search)) {
      const d = localStorage.getItem("jbc-admin-draft");
      if (d) DATA = JSON.parse(d);
    }
  } catch (e) {}

  const UI = {
    ja: {
      home: "ホーム", groups: "研究会", symposium: "シンポジウム", articles: "記事", contact: "お問い合わせ",
      latest: "新着情報", latestEn: "Latest", viewAll: "すべて見る", readMore: "詳しく見る",
      groupsLead: "テーマごとの研究会で、バイオ炭の製造から利用、制度・市場までを議論しています。",
      symLead: "毎年開催するシンポジウムの案内と、過去の資料・録画をまとめています。",
      artLead: "ニュース、研究会・イベントの報告、コラムなど、コンソーシアムの最新情報。",
      all: "すべて", search: "キーワードで検索", noPosts: "該当する記事はありません。",
      bodyEmpty: "本文は準備中です。", upcoming: "開催予定", past: "過去のシンポジウム", materials: "資料・録画",
      reports: "活動報告", posts: "件", aboutEyebrow: "About", aboutTitle: "炭素を土に還し、地域と産業をつなぐ。",
      aboutText: "研究者・企業・自治体が参加し、バイオ炭の研究と社会実装に関する知見を共有するコンソーシアムです。研究会やシンポジウムを通じて、製造技術、農地・緑地での活用、規格、炭素クレジットなどのテーマに取り組んでいます。",
      backList: "一覧に戻る", notFound: "ページが見つかりません。", membersNote: "会員向けサイト",
      footerNote: "本サイトの内容はコンソーシアム会員向けに提供しています。", menu: "メニュー"
    },
    en: {
      home: "Home", groups: "Working Groups", symposium: "Symposium", articles: "Articles", contact: "Contact",
      latest: "Latest updates", latestEn: "Latest", viewAll: "View all", readMore: "Read more",
      groupsLead: "Thematic working groups discuss biochar from production and use to policy and markets.",
      symLead: "Announcements for our annual symposium, plus materials and recordings from past years.",
      artLead: "News, reports from working groups and events, columns and more from the consortium.",
      all: "All", search: "Search by keyword", noPosts: "No matching articles.",
      bodyEmpty: "Full text coming soon.", upcoming: "Upcoming", past: "Past symposia", materials: "Materials & recordings",
      reports: "Activity reports", posts: "posts", aboutEyebrow: "About", aboutTitle: "Returning carbon to the soil, connecting regions and industry.",
      aboutText: "A consortium of researchers, companies and local governments sharing knowledge on biochar research and its implementation in society. Through working groups and symposia we address production technology, use in farmland and green spaces, standards, and carbon credits.",
      backList: "Back to list", notFound: "Page not found.", membersNote: "Members' site",
      footerNote: "Content on this site is provided for consortium members.", menu: "Menu"
    }
  };

  /* ---------- language ---------- */
  let lang = "ja";
  try { lang = localStorage.getItem("jbc-lang") || (navigator.language || "ja").slice(0, 2); } catch (e) {}
  const qs = new URLSearchParams(location.search);
  if (qs.get("lang")) lang = qs.get("lang");
  if (lang !== "en") lang = "ja";
  const t = (k) => UI[lang][k];
  const L = (o) => (o == null ? "" : typeof o === "string" ? o : (o[lang] || o.ja || o.en || ""));

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cats = () => DATA.categories || [];
  const cat = (id) => cats().find((c) => c.id === id);
  const groups = () => cats().filter((c) => c.type === "group");
  const posts = () => (DATA.posts || []).slice().sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const fmtDate = (d) => {
    if (!d) return "";
    const [y, m, day] = d.split("-").map(Number);
    if (lang === "ja") return `${y}年${m}月${day}日`;
    return new Date(y, m - 1, day).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
  };
  const PALETTE = ["#d4622a", "#3f7d4e", "#b08a3e", "#4f6d8a", "#8a4f6d", "#5d7a6b", "#a5523a"];
  const hash = (s) => { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
  const colorFor = (id) => PALETTE[hash(id) % PALETTE.length];

  // 画像が無い記事のための自動カバー(カテゴリ色の抽象パターン)
  function autoCover(seed, label) {
    const h = hash(seed), c1 = colorFor(seed), c2 = PALETTE[(h >> 3) % PALETTE.length];
    let dots = "";
    for (let i = 0; i < 14; i++) {
      const x = (h * (i + 7) * 37) % 400, y = (h * (i + 3) * 53) % 225, r = 6 + ((h >> i) % 40);
      dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 3 ? "#fff" : c2}" opacity="${(0.05 + (i % 5) * 0.03).toFixed(2)}"/>`;
    }
    return `<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="g${h}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d1b17"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs>
      <rect width="400" height="225" fill="url(#g${h})"/>${dots}
      <text x="22" y="200" fill="#fff" opacity=".85" font-family="Noto Serif JP,serif" font-size="15" font-weight="600">${esc(label || "")}</text></svg>`;
  }
  const coverHTML = (item, label) => item.cover ? `<img src="${esc(item.cover)}" alt="" loading="lazy">` : autoCover(item.id, label);

  function tagHTML(id, link = true) {
    const c = cat(id); if (!c) return "";
    const cls = c.type === "group" ? "tag g" : id === "event-notice" || id === "symposium" ? "tag e" : "tag";
    return link ? `<a class="${cls}" href="#/articles?cat=${encodeURIComponent(id)}">${esc(L(c))}</a>` : `<span class="${cls}">${esc(L(c))}</span>`;
  }

  // 本文: 簡易マークダウン (## 見出し / ### / - 箇条書き / > 引用 / [文字](URL) / ![](画像) / **太字**)
  function md(src) {
    if (!src || !src.trim()) return "";
    const inline = (s) => esc(s)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return src.replace(/\r/g, "").split(/\n{2,}/).map((b) => {
      const lines = b.split("\n");
      if (/^### /.test(b)) return `<h3>${inline(b.slice(4))}</h3>`;
      if (/^## /.test(b)) return `<h2>${inline(b.slice(3))}</h2>`;
      if (lines.every((l) => /^[-*] /.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`;
      if (lines.every((l) => /^> ?/.test(l))) return `<blockquote>${lines.map((l) => inline(l.replace(/^> ?/, ""))).join("<br>")}</blockquote>`;
      return `<p>${lines.map(inline).join("<br>")}</p>`;
    }).join("");
  }

  const postCard = (p) => {
    const first = cat(p.categories && p.categories[0]);
    return `<a class="card fade" href="#/post/${encodeURIComponent(p.id)}">
      <div class="cover">${coverHTML(p, first ? L(first) : "")}</div>
      <div class="body"><div class="meta"><time>${fmtDate(p.date)}</time></div>
        <h3>${esc(L(p.title))}</h3>${L(p.summary) ? `<p>${esc(L(p.summary))}</p>` : ""}
        <div class="meta">${(p.categories || []).map((id) => tagHTML(id, false)).join("")}</div></div></a>`;
  };
  const postRow = (p) => `<a class="row" href="#/post/${encodeURIComponent(p.id)}">
      <time>${fmtDate(p.date)}</time>
      <div><h3>${esc(L(p.title))}</h3><div class="meta" style="margin-top:6px">${(p.categories || []).map((id) => tagHTML(id, false)).join("")}</div></div>
      <span class="arr">→</span></a>`;

  const pageHero = (eyebrow, title, lead, crumbs) => `<section class="phero">
      <svg class="bg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${heroArt(1200, 300, 0.5)}</svg>
      <div class="wrap fade"><div class="crumbs">${crumbs || `<a href="#/">${t("home")}</a>`}</div>
      <div class="eyebrow" style="margin-top:14px">${esc(eyebrow)}</div><h1>${esc(title)}</h1>${lead ? `<p>${esc(lead)}</p>` : ""}</div></section>`;

  // 炭の粒子と土の層をイメージした背景アート
  function heroArt(w, h, k = 1) {
    let s = `<defs><radialGradient id="glow" cx="80%" cy="20%" r="70%"><stop offset="0" stop-color="#d4622a" stop-opacity="${0.35 * k}"/><stop offset="1" stop-color="#d4622a" stop-opacity="0"/></radialGradient>
      <radialGradient id="glow2" cx="10%" cy="100%" r="60%"><stop offset="0" stop-color="#3f7d4e" stop-opacity="${0.35 * k}"/><stop offset="1" stop-color="#3f7d4e" stop-opacity="0"/></radialGradient></defs>
      <rect width="${w}" height="${h}" fill="url(#glow)"/><rect width="${w}" height="${h}" fill="url(#glow2)"/>`;
    for (let i = 0; i < 6; i++) {
      const y = h * (0.55 + i * 0.09);
      s += `<path d="M0 ${y} C ${w * 0.25} ${y - 30 + i * 6}, ${w * 0.6} ${y + 26 - i * 4}, ${w} ${y - 10}" stroke="#f4efe4" stroke-opacity="${0.05 + i * 0.012}" fill="none" stroke-width="1"/>`;
    }
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 70; i++) {
      const x = rnd() * w, y = rnd() * h, r = 0.8 + rnd() * 2.6;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${rnd() > 0.82 ? "#f08a4b" : "#f4efe4"}" opacity="${(0.12 + rnd() * 0.35).toFixed(2)}"/>`;
    }
    return s;
  }

  /* ---------- views ---------- */
  function viewHome() {
    const S = DATA.site, ps = posts();
    const upcoming = (DATA.symposia || []).find((s) => s.status === "upcoming");
    const groupCount = (gid) => ps.filter((p) => (p.categories || []).includes(gid)).length;
    return `
    <section class="hero">
      <svg class="bg" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${heroArt(1400, 700)}</svg>
      <div class="wrap fade">
        <div class="eyebrow">${esc(L(S.name))} · ${t("membersNote")}</div>
        <h1>${esc(L(S.tagline))}</h1>
        <p class="lead">${esc(L(S.intro))}</p>
        <div class="btns"><a class="btn btn-primary" href="#/articles">${t("latest")} →</a><a class="btn btn-ghost" href="#/groups">${t("groups")}</a></div>
        <div class="stats">${(S.stats || []).map((x) => `<div class="stat"><b>${esc(lang === "en" && x.valueEn ? x.valueEn : x.value)}</b><span>${esc(L(x.label))}</span></div>`).join("")}</div>
      </div>
    </section>

    <section class="blk"><div class="wrap">
      <div class="sec-head"><div><div class="eyebrow">${t("latestEn")}</div><h2>${t("latest")}</h2></div><a class="more" href="#/articles">${t("viewAll")} →</a></div>
      <div class="grid g3">${ps.slice(0, 3).map(postCard).join("")}</div>
      <div class="rows" style="margin-top:34px">${ps.slice(3, 8).map(postRow).join("")}</div>
    </div></section>

    <section class="blk band"><div class="wrap">
      <div><div class="eyebrow" style="color:var(--leaf)">${t("aboutEyebrow")}</div><h2>${t("aboutTitle")}</h2><p>${t("aboutText")}</p>
        <div class="btns" style="margin-top:26px"><a class="btn btn-primary" href="#/groups">${t("groups")} →</a></div></div>
      ${cycleSVG()}
    </div></section>

    <section class="blk"><div class="wrap">
      <div class="sec-head"><div><div class="eyebrow">Working Groups</div><h2>${t("groups")}</h2></div><a class="more" href="#/groups">${t("viewAll")} →</a></div>
      <div class="grid g3">${groups().map((g, i) => groupCard(g, i, groupCount(g.id))).join("")}</div>
    </div></section>

    ${upcoming ? `<section class="blk" style="padding-top:0"><div class="wrap">
      <div class="sec-head"><div><div class="eyebrow">Symposium</div><h2>${t("symposium")}</h2></div><a class="more" href="#/symposium">${t("viewAll")} →</a></div>
      ${symFeature(upcoming)}</div></section>` : ""}`;
  }

  function cycleSVG() {
    const lab = lang === "ja" ? ["バイオマス", "炭化", "土壌施用", "炭素貯留"] : ["Biomass", "Pyrolysis", "Soil", "Storage"];
    const pos = [[210, 60], [360, 210], [210, 360], [60, 210]];
    return `<svg class="cycle" viewBox="0 0 420 420" role="img" aria-label="biochar cycle">
      <circle cx="210" cy="210" r="150" fill="none" stroke="#3f7d4e" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 8"/>
      <circle cx="210" cy="210" r="70" fill="#1d1b17"/>
      <text x="210" y="205" text-anchor="middle" fill="#fff" font-family="Noto Serif JP,serif" font-size="20" font-weight="600">Biochar</text>
      <text x="210" y="230" text-anchor="middle" fill="#f08a4b" font-size="12" letter-spacing="2">CO₂ → C</text>
      ${pos.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="44" fill="${i % 2 ? "#3f7d4e" : "#fffdf8"}" stroke="#3f7d4e" stroke-width="2"/>
        <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="${i % 2 ? "#fff" : "#2c5d38"}">${lab[i]}</text>`).join("")}
    </svg>`;
  }

  const groupCard = (g, i, n) => `<a class="gcard fade" href="#/groups/${encodeURIComponent(g.id)}">
      <span class="dot" style="background:${colorFor(g.id)}"></span>
      <div class="num">${String(i + 1).padStart(2, "0")}</div>
      <div><h3>${esc(lang === "ja" ? g.ja : g.en)}</h3><div class="en">${esc(lang === "ja" ? g.en : g.ja)}</div></div>
      ${L(g.desc) ? `<p>${esc(L(g.desc))}</p>` : ""}
      <div class="cnt">${t("reports")} ${n} ${lang === "ja" ? t("posts") : ""} →</div></a>`;

  const symFeature = (s) => `<a class="sym-feature fade" href="#/symposium/${encodeURIComponent(s.id)}">
      <div class="cover">${coverHTML(s, s.year)}</div>
      <div class="in"><span class="badge">${t("upcoming")}</span><h3>${esc(L(s.title))}</h3>
      ${L(s.summary) ? `<p>${esc(L(s.summary))}</p>` : ""}${s.date ? `<p>${fmtDate(s.date)}</p>` : ""}
      <span class="more" style="color:var(--ember-2)">${t("readMore")} →</span></div></a>`;

  function viewGroups() {
    const ps = posts();
    const reports = ps.filter((p) => (p.categories || []).some((id) => cat(id) && cat(id).type === "group"));
    return pageHero("Working Groups", t("groups"), t("groupsLead")) + `
      <section class="blk"><div class="wrap">
        <div class="grid g3">${groups().map((g, i) => groupCard(g, i, ps.filter((p) => (p.categories || []).includes(g.id)).length)).join("")}</div>
      </div></section>
      <section class="blk" style="padding-top:0"><div class="wrap">
        <div class="sec-head"><div><div class="eyebrow">Reports</div><h2>${t("reports")}</h2></div></div>
        <div class="rows">${reports.map(postRow).join("") || `<div class="empty">${t("noPosts")}</div>`}</div>
      </div></section>`;
  }

  function viewGroup(id) {
    const g = cat(id); if (!g) return viewNotFound();
    const list = posts().filter((p) => (p.categories || []).includes(id));
    return pageHero("Working Group", lang === "ja" ? g.ja : g.en, L(g.desc),
      `<a href="#/">${t("home")}</a> / <a href="#/groups">${t("groups")}</a>`) + `
      <section class="blk"><div class="wrap">
        <div class="sec-head"><div><div class="eyebrow">Reports</div><h2>${t("reports")}</h2></div></div>
        ${list.length ? `<div class="grid g3">${list.map(postCard).join("")}</div>` : `<div class="empty">${t("noPosts")}</div>`}
        <a class="back" href="#/groups">← ${t("backList")}</a>
      </div></section>`;
  }

  function viewSymposium() {
    const all = DATA.symposia || [];
    const up = all.filter((s) => s.status === "upcoming");
    const past = all.filter((s) => s.status !== "upcoming").sort((a, b) => (b.year || "0").localeCompare(a.year || "0"));
    return pageHero("Symposium", t("symposium"), t("symLead")) + `
      <section class="blk"><div class="wrap">
        ${up.map(symFeature).join('<div style="height:22px"></div>')}
        <div class="sec-head" style="margin-top:${up.length ? 70 : 0}px"><div><div class="eyebrow">Archive</div><h2>${t("past")}</h2></div></div>
        <div class="timeline">${past.map((s) => `<div class="tl fade"><a href="#/symposium/${encodeURIComponent(s.id)}">
          ${s.year ? `<div class="yr">${esc(s.year)}</div>` : ""}<h3>${esc(L(s.title))}</h3>
          ${L(s.summary) ? `<p style="margin:6px 0 0;color:var(--muted);font-size:14px">${esc(L(s.summary))}</p>` : ""}</a></div>`).join("")}</div>
      </div></section>`;
  }

  function viewSym(id) {
    const s = (DATA.symposia || []).find((x) => x.id === id); if (!s) return viewNotFound();
    const body = md(L(s.body));
    return pageHero(s.status === "upcoming" ? t("upcoming") : "Symposium " + (s.year || ""), L(s.title), s.date ? fmtDate(s.date) : "",
      `<a href="#/">${t("home")}</a> / <a href="#/symposium">${t("symposium")}</a>`) + `
      <div class="wrap"><article class="article fade">
        ${s.cover ? `<div class="cover"><img src="${esc(s.cover)}" alt=""></div>` : ""}
        <div class="prose">${body || `<div class="empty">${t("bodyEmpty")}</div>`}</div>
        ${(s.links || []).length ? `<h2 style="font-family:var(--ff-serif);margin-top:40px">${t("materials")}</h2><div class="links">${s.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener"><span>${esc(L(l.label))}</span><span>↗</span></a>`).join("")}</div>` : ""}
        <a class="back" href="#/symposium">← ${t("backList")}</a>
      </article></div>`;
  }

  let artState = { cat: "", q: "", page: 1 };
  const PER = 9;
  function viewArticles(params) {
    artState.cat = params.get("cat") || "";
    const topics = cats().filter((c) => c.type === "topic"), gs = groups();
    const chip = (id, label) => `<a class="chip ${artState.cat === id ? "on" : ""}" href="#/articles${id ? "?cat=" + encodeURIComponent(id) : ""}">${esc(label)}</a>`;
    return pageHero("Articles", t("articles"), t("artLead")) + `
      <section class="blk"><div class="wrap">
        <input class="search" id="q" type="search" placeholder="${t("search")}" value="${esc(artState.q)}">
        <div class="filters">${chip("", t("all"))}${topics.map((c) => chip(c.id, L(c))).join("")}</div>
        <div class="filters" style="margin-top:-18px">${gs.map((c) => chip(c.id, L(c))).join("")}</div>
        <div id="artlist"></div>
      </div></section>`;
  }
  function renderArtList() {
    const box = $("#artlist"); if (!box) return;
    const q = artState.q.trim().toLowerCase();
    let list = posts().filter((p) => !artState.cat || (p.categories || []).includes(artState.cat));
    if (q) list = list.filter((p) => [p.title.ja, p.title.en, L(p.summary), L(p.body)].join(" ").toLowerCase().includes(q));
    const pages = Math.max(1, Math.ceil(list.length / PER));
    artState.page = Math.min(artState.page, pages);
    const slice = list.slice((artState.page - 1) * PER, artState.page * PER);
    box.innerHTML = slice.length ? `<div class="grid g3">${slice.map(postCard).join("")}</div>
      ${pages > 1 ? `<div class="pager">${Array.from({ length: pages }, (_, i) => `<button class="${i + 1 === artState.page ? "on" : ""}" data-p="${i + 1}">${i + 1}</button>`).join("")}</div>` : ""}`
      : `<div class="empty">${t("noPosts")}</div>`;
    box.querySelectorAll("[data-p]").forEach((b) => b.onclick = () => { artState.page = +b.dataset.p; renderArtList(); window.scrollTo({ top: 260, behavior: "smooth" }); });
  }

  function viewPost(id) {
    const p = (DATA.posts || []).find((x) => x.id === id); if (!p) return viewNotFound();
    const body = md(L(p.body));
    const related = posts().filter((x) => x.id !== p.id && (x.categories || []).some((c) => (p.categories || []).includes(c))).slice(0, 3);
    return pageHero(fmtDate(p.date), L(p.title), "", `<a href="#/">${t("home")}</a> / <a href="#/articles">${t("articles")}</a>`) + `
      <div class="wrap"><article class="article fade">
        <div class="meta" style="margin-bottom:26px">${(p.categories || []).map((c) => tagHTML(c)).join("")}</div>
        ${p.cover ? `<div class="cover"><img src="${esc(p.cover)}" alt=""></div>` : ""}
        <div class="prose">${body || (L(p.summary) ? `<p>${esc(L(p.summary))}</p>` : `<div class="empty">${t("bodyEmpty")}</div>`)}</div>
        <a class="back" href="#/articles">← ${t("backList")}</a>
      </article></div>
      ${related.length ? `<section class="blk" style="padding-top:0"><div class="wrap"><div class="sec-head"><h2>${t("latest")}</h2></div><div class="grid g3">${related.map(postCard).join("")}</div></div></section>` : ""}`;
  }

  const viewNotFound = () => pageHero("404", t("notFound"), "") + `<div class="wrap"><a class="back" href="#/">← ${t("home")}</a><div style="height:80px"></div></div>`;

  /* ---------- shell ---------- */
  function shell() {
    const S = DATA.site;
    document.body.innerHTML = `
      <header class="hdr" id="hdr"><div class="wrap">
        <a class="brand" href="#/">
          <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#1d1b17"/>
            <path d="M20 8c5 6 8 10 8 15a8 8 0 0 1-16 0c0-5 3-9 8-15z" fill="#d4622a"/><path d="M20 18c2.6 3 4 5 4 7.4a4 4 0 0 1-8 0c0-2.4 1.4-4.4 4-7.4z" fill="#f4efe4"/>
            <rect x="9" y="31" width="22" height="2.4" rx="1.2" fill="#3f7d4e"/></svg>
          <span><small>${esc(L(S.shortName))} · ${t("membersNote")}</small>${esc(L(S.name))}</span></a>
        <nav class="nav" id="nav">
          <a href="#/" data-r="">${t("home")}</a><a href="#/groups" data-r="groups">${t("groups")}</a>
          <a href="#/symposium" data-r="symposium">${t("symposium")}</a><a href="#/articles" data-r="articles">${t("articles")}</a>
        </nav>
        <div class="lang" role="group" aria-label="Language"><button data-l="ja">日本語</button><button data-l="en">EN</button></div>
        <button class="menu-btn" id="menuBtn" aria-label="${t("menu")}"><svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 4h14M2 9h14M2 14h14" stroke="#16140f" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      </div></header>
      <main id="main"></main>
      <footer class="ftr"><div class="wrap">
        <div class="top">
          <div><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:10px">${esc(L(S.name))}</div><p style="margin:0;max-width:30em">${esc(L(S.intro))}</p></div>
          <div><h4>Menu</h4><ul><li><a href="#/">${t("home")}</a></li><li><a href="#/groups">${t("groups")}</a></li><li><a href="#/symposium">${t("symposium")}</a></li><li><a href="#/articles">${t("articles")}</a></li></ul></div>
          <div><h4>${t("contact")}</h4><ul><li><a href="mailto:${esc(S.email)}">${esc(S.email)}</a></li></ul></div>
        </div>
        <div class="bottom"><span>© ${new Date().getFullYear()} ${esc(L(S.name))}</span><span>${t("footerNote")} · <a href="#logout" onclick="try{localStorage.removeItem('jbc-unlock');sessionStorage.removeItem('jbc-unlock')}catch(e){};location.hash='logout';location.reload();return false">${lang==="ja"?"ログアウト":"Log out"}</a></span></div>
      </div></footer>`;
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach((b) => {
      b.classList.toggle("on", b.dataset.l === lang);
      b.onclick = () => { lang = b.dataset.l; try { localStorage.setItem("jbc-lang", lang); } catch (e) {} shell(); route(); };
    });
    $("#menuBtn").onclick = () => $("#nav").classList.toggle("open");
  }

  function route() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, query] = raw.split("?");
    const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
    const params = new URLSearchParams(query || "");
    let html, title = L(DATA.site.name);
    switch (parts[0]) {
      case undefined: case "": html = viewHome(); break;
      case "groups": html = parts[1] ? viewGroup(parts[1]) : viewGroups(); title = t("groups") + " | " + title; break;
      case "symposium": html = parts[1] ? viewSym(parts[1]) : viewSymposium(); title = t("symposium") + " | " + title; break;
      case "articles": html = viewArticles(params); title = t("articles") + " | " + title; break;
      case "post": html = viewPost(parts[1]); title = t("articles") + " | " + title; break;
      default: html = viewNotFound();
    }
    $("#main").innerHTML = html;
    document.title = title;
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", a.dataset.r === (parts[0] === "post" ? "articles" : parts[0] || "")));
    $("#nav").classList.remove("open");
    if (parts[0] === "articles") {
      renderArtList();
      $("#q").addEventListener("input", (e) => { artState.q = e.target.value; artState.page = 1; renderArtList(); });
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", () => { const h = $("#hdr"); if (h) h.classList.toggle("scrolled", scrollY > 8); });
  shell(); route();
};
