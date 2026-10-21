/* 콘텐츠 암호화/복호화 (Web Crypto: PBKDF2-SHA256 + AES-GCM). 비밀번호는 어디에도 저장되지 않습니다. */
window.JBCCrypto = (function () {
  const ITER = 250000;
  const enc = new TextEncoder(), dec = new TextDecoder();
  const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  async function deriveKey(password, salt, iter) {
    const base = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
    return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, base,
      { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  }
  async function encrypt(obj, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt, ITER);
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(JSON.stringify(obj)));
    return { v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), data: b64(ct) };
  }
  async function decryptWithKey(pack, key) {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(pack.iv) }, key, unb64(pack.data));
    return JSON.parse(dec.decode(pt));
  }
  async function decrypt(pack, password) {
    const key = await deriveKey(password, unb64(pack.salt), pack.iter || ITER);
    const data = await decryptWithKey(pack, key); // 비밀번호가 틀리면 여기서 예외
    return { data, key };
  }
  // 「この端末で記憶」用: 비밀번호 대신 파생 키만 보관 (콘텐츠를 다시 암호화하면 자동으로 무효)
  const exportKey = async (key) => b64(await crypto.subtle.exportKey("raw", key));
  const importKey = (s) => crypto.subtle.importKey("raw", unb64(s), "AES-GCM", false, ["decrypt"]);
  return { encrypt, decrypt, decryptWithKey, exportKey, importKey };
})();
