/* 비밀번호 화면: content.enc.js(암호화된 콘텐츠)를 비밀번호로 풀어서 사이트를 표시 */
(function () {
  const KEY = "jbc-unlock";
  const store = { get(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v, remember) { try { (remember ? localStorage : sessionStorage).setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch (e) {} } };

  // 관리 화면의 미리보기(같은 브라우저의 초안)
  try {
    if (/[?&]preview=1/.test(location.search)) {
      const d = localStorage.getItem("jbc-admin-draft");
      if (d) return window.JBC_BOOT(JSON.parse(d));
    }
  } catch (e) {}

  const pack = window.SITE_ENC;
  const en = /^en/.test(navigator.language || "") && !/[?&]lang=ja/.test(location.search);
  const T = en
    ? { title: "Members only", lead: "Please enter the members' password to view this site.", ph: "Password", btn: "Enter", remember: "Remember on this device", wrong: "Incorrect password.", none: "Site content has not been set up yet.", contact: "Forgot the password? Contact" }
    : { title: "会員専用サイト", lead: "閲覧には会員用パスワードが必要です。", ph: "パスワード", btn: "ログイン", remember: "この端末で記憶する", wrong: "パスワードが違います。", none: "サイトのコンテンツがまだ設定されていません。", contact: "パスワードのお問い合わせ:" };

  async function tryStored() {
    const s = store.get(KEY);
    if (!s || !pack) return false;
    try { const data = await JBCCrypto.decryptWithKey(pack, await JBCCrypto.importKey(s)); window.JBC_BOOT(data); return true; }
    catch (e) { store.del(KEY); return false; }
  }

  function showGate() {
    document.body.innerHTML = `
    <div class="gate">
      <svg class="bg" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="ga" cx="80%" cy="15%" r="70%"><stop offset="0" stop-color="#d4622a" stop-opacity=".38"/><stop offset="1" stop-color="#d4622a" stop-opacity="0"/></radialGradient>
        <radialGradient id="gb" cx="10%" cy="100%" r="60%"><stop offset="0" stop-color="#3f7d4e" stop-opacity=".38"/><stop offset="1" stop-color="#3f7d4e" stop-opacity="0"/></radialGradient></defs>
        <rect width="1400" height="900" fill="url(#ga)"/><rect width="1400" height="900" fill="url(#gb)"/></svg>
      <form class="gate-card" id="gf" autocomplete="on">
        <svg width="52" height="52" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#1d1b17"/>
          <path d="M20 8c5 6 8 10 8 15a8 8 0 0 1-16 0c0-5 3-9 8-15z" fill="#d4622a"/><path d="M20 18c2.6 3 4 5 4 7.4a4 4 0 0 1-8 0c0-2.4 1.4-4.4 4-7.4z" fill="#f4efe4"/>
          <rect x="9" y="31" width="22" height="2.4" rx="1.2" fill="#3f7d4e"/></svg>
        <div class="eyebrow" style="color:var(--ember)">Japan Biochar Consortium</div>
        <h1>${T.title}</h1>
        <p>${pack ? T.lead : T.none}</p>
        ${pack ? `<input type="text" name="username" value="member" autocomplete="username" hidden>
        <input id="pw" type="password" placeholder="${T.ph}" autocomplete="current-password" required autofocus>
        <label class="rem"><input type="checkbox" id="rem"> ${T.remember}</label>
        <button class="btn btn-primary" id="go" type="submit">${T.btn} →</button>
        <div class="err" id="err" role="alert"></div>` : ""}
        <div class="contact">${T.contact} <a href="mailto:rbrc@st.ritsumei.ac.jp">rbrc@st.ritsumei.ac.jp</a></div>
      </form>
    </div>`;
    const f = document.getElementById("gf");
    if (!pack) return;
    f.onsubmit = async (e) => {
      e.preventDefault();
      const btn = document.getElementById("go"), err = document.getElementById("err");
      btn.disabled = true; err.textContent = "";
      try {
        const { data, key } = await JBCCrypto.decrypt(pack, document.getElementById("pw").value);
        store.set(KEY, await JBCCrypto.exportKey(key), document.getElementById("rem").checked);
        window.JBC_BOOT(data);
      } catch (x) {
        err.textContent = T.wrong; btn.disabled = false;
        f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake");
      }
    };
  }

  // 로그아웃: 주소 끝에 #logout
  if (location.hash === "#logout") { store.del(KEY); history.replaceState(null, "", location.pathname); }
  tryStored().then((ok) => { if (!ok) showGate(); });
})();
