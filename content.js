/* ============================================================
   사이트 콘텐츠 데이터 (이 파일만 바꾸면 사이트 내용이 바뀝니다)
   - 직접 편집하거나, admin.html(관리 화면)에서 편집 후 [content.js 내보내기]로 덮어쓰세요.
   - 기사 본문(body)은 비워 두었습니다. 원고를 넣어 주세요.
   ============================================================ */
window.SITE_CONTENT = {
  "site": {
    "name": { "ja": "Japan Biochar Consortium", "en": "Japan Biochar Consortium" },
    "shortName": { "ja": "JBC", "en": "JBC" },
    "tagline": {
      "ja": "バイオ炭の研究と社会実装を、会員とともに。",
      "en": "Advancing biochar research and real-world deployment, together with our members."
    },
    "intro": {
      "ja": "本サイトは、コンソーシアム会員の皆様とバイオ炭研究・社会実装に関する知見を共有するための会員サイトです。",
      "en": "This members' site is where the consortium shares knowledge on biochar research and its implementation in society."
    },
    "email": "rbrc@st.ritsumei.ac.jp",
    "stats": [
      { "value": "6", "label": { "ja": "研究会", "en": "Working groups" } },
      { "value": "2024–", "label": { "ja": "年次シンポジウム", "en": "Annual symposium" } },
      { "value": "隔週", "valueEn": "Bi-weekly", "label": { "ja": "バイオ炭ニュース", "en": "Biochar news digest" } }
    ]
  },

  /* type: "group" = 研究会, "topic" = 記事カテゴリ */
  "categories": [
    { "id": "production",   "type": "group", "ja": "バイオ炭製造・農地施用研究会", "en": "Biochar Production & Farmland Application",
      "desc": { "ja": "バイオ炭の製造と農地への施用に関する研究会です。", "en": "Working group on biochar production and its application to farmland." } },
    { "id": "standards",    "type": "group", "ja": "バイオ炭規格研究会", "en": "Biochar Standards",
      "desc": { "ja": "バイオ炭の品質・規格に関する研究会です。", "en": "Working group on biochar quality and standards." } },
    { "id": "parks",        "type": "group", "ja": "公園緑地・緑地帯研究会", "en": "Parks & Green Belts",
      "desc": { "ja": "公園緑地・緑地帯でのバイオ炭活用に関する研究会です。", "en": "Working group on biochar use in parks and green belts." } },
    { "id": "credit",       "type": "group", "ja": "国際炭素クレジット市場研究会", "en": "International Carbon Credit Markets",
      "desc": { "ja": "国際的な炭素クレジット市場に関する研究会です。", "en": "Working group on international carbon credit markets." } },
    { "id": "regional",     "type": "group", "ja": "地域モデル研究会", "en": "Regional Models",
      "desc": { "ja": "地域におけるバイオ炭活用モデルに関する研究会です。", "en": "Working group on regional models for biochar use." } },
    { "id": "fiber",        "type": "group", "ja": "繊維炭化研究会", "en": "Fiber Carbonization",
      "desc": { "ja": "繊維の炭化に関する研究会です。", "en": "Working group on the carbonization of fibers." } },

    { "id": "news",          "type": "topic", "ja": "ニュース",       "en": "News" },
    { "id": "event-notice",  "type": "topic", "ja": "イベント告知",   "en": "Event Announcements" },
    { "id": "event-report",  "type": "topic", "ja": "イベント開催報告", "en": "Event Reports" },
    { "id": "symposium",     "type": "topic", "ja": "シンポジウム",   "en": "Symposium" },
    { "id": "visit",         "type": "topic", "ja": "企業訪問記録",   "en": "Company Visits" },
    { "id": "column",        "type": "topic", "ja": "研究員コラム",   "en": "Researcher Columns" },
    { "id": "admin",         "type": "topic", "ja": "運営関係",       "en": "Operations" }
  ],

  /* 記事 (ニュース・研究会報告など)。cover: 画像URL(任意) / body: 本文 (## 見出し, - 箇条書き, [文字](URL), ![説明](画像URL)) */
  "posts": [
    { "id": "news-2026-0916", "date": "2026-10-07", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 9/16-30", "en": "Biochar News Digest: Sep 16–30" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0901", "date": "2026-09-29", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 9/01-15", "en": "Biochar News Digest: Sep 1–15" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "symposium-2027-notice", "date": "2026-09-16", "categories": ["event-report", "symposium"],
      "title": { "ja": "シンポジウム2027 開催予定", "en": "Symposium 2027 Scheduled" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0817", "date": "2026-09-07", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 8/17-31", "en": "Biochar News Digest: Aug 17–31" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0801", "date": "2026-08-28", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 8/1-16", "en": "Biochar News Digest: Aug 1–16" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "okisu-rice-2026", "date": "2026-08-21", "categories": ["news"],
      "title": { "ja": "バイオ炭施用農地での新米販売（おきす）", "en": "New-Crop Rice from Biochar-Amended Farmland Goes on Sale (Okisu)" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0716", "date": "2026-08-14", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 7/16-31", "en": "Biochar News Digest: Jul 16–31" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0701", "date": "2026-07-21", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 7/1-15", "en": "Biochar News Digest: Jul 1–15" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "inventory-param-2026", "date": "2026-07-17", "categories": ["news"],
      "title": { "ja": "インベントリ報告書のパラメータ変更", "en": "Parameter Changes in the GHG Inventory Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0615", "date": "2026-07-04", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 6/15-30", "en": "Biochar News Digest: Jun 15–30" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "accounts-fy2025", "date": "2026-06-24", "categories": ["admin"],
      "title": { "ja": "2025年度 会計報告", "en": "FY2025 Financial Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "news-2026-0601", "date": "2026-06-16", "categories": ["news"],
      "title": { "ja": "国内外バイオ炭ニュース 6/1-14", "en": "Biochar News Digest: Jun 1–14" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },

    { "id": "ws-2024-0904", "date": "2024-09-04", "categories": ["event-report", "parks", "production"],
      "title": { "ja": "ワークショップ開催報告", "en": "Workshop Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "ws-2024-0517", "date": "2024-05-17", "categories": ["parks", "event-report"],
      "title": { "ja": "ワークショップ開催報告", "en": "Workshop Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "ws-2023-1222", "date": "2023-12-22", "categories": ["production", "event-report"],
      "title": { "ja": "ワークショップ開催報告", "en": "Workshop Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "ws-2023-1127", "date": "2023-11-27", "categories": ["fiber", "event-report"],
      "title": { "ja": "ワークショップ開催報告", "en": "Workshop Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "ws-2023-1120-regional", "date": "2023-11-20", "categories": ["regional", "event-report"],
      "title": { "ja": "ワークショップ開催報告", "en": "Workshop Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" },
    { "id": "ws-2023-1120-standards", "date": "2023-11-20", "categories": ["standards", "credit", "event-report"],
      "title": { "ja": "ワークショップ開催報告", "en": "Workshop Report" }, "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "cover": "" }
  ],

  /* シンポジウム。status: "upcoming"(開催予定) / "past"(開催済み)。links: 資料・録画リンク */
  "symposia": [
    { "id": "sym-2027", "year": "2027", "status": "upcoming", "date": "",
      "title": { "ja": "シンポジウム2027 開催予定", "en": "Symposium 2027 (Upcoming)" },
      "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "links": [], "cover": "" },
    { "id": "sym-agri-future", "year": "", "status": "past", "date": "",
      "title": { "ja": "持続可能な農業の未来を考えるシンポジウム", "en": "Symposium on the Future of Sustainable Agriculture" },
      "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "links": [], "cover": "" },
    { "id": "sym-2026", "year": "2026", "status": "past", "date": "",
      "title": { "ja": "シンポジウム2026 資料（録画一部）", "en": "Symposium 2026: Materials (Selected Recordings)" },
      "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "links": [], "cover": "" },
    { "id": "sym-2025", "year": "2025", "status": "past", "date": "",
      "title": { "ja": "シンポジウム2025 資料（録画一部）", "en": "Symposium 2025: Materials (Selected Recordings)" },
      "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "links": [], "cover": "" },
    { "id": "sym-2024", "year": "2024", "status": "past", "date": "",
      "title": { "ja": "シンポジウム2024 資料（録画一部）", "en": "Symposium 2024: Materials (Selected Recordings)" },
      "summary": { "ja": "", "en": "" }, "body": { "ja": "", "en": "" }, "links": [], "cover": "" }
  ]
};
