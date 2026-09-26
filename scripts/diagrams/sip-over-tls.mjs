#!/usr/bin/env node
// Generates the SIP-over-TLS sequence diagram used by the "SIP over TLS" blog
// post, one SVG per locale, into public/blog/sip-over-tls/<code>.svg.
//
// The SVGs are committed (like the screenshots), so this only needs re-running
// when a label changes:  node scripts/diagrams/sip-over-tls.mjs
//
// Drawn on a fixed light card: an <img> can't follow the site's .dark class.
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const OUT = join(fileURLToPath(import.meta.url), "../../../public/blog/sip-over-tls");
mkdirSync(OUT, { recursive: true });

const W = 760, H = 612;
const L = 170, R = 590, MID = (L + R) / 2;
const ACCENT = "#2d5bff", GRAY = "#6b7280", INK = "#111827", MUTED = "#6b7280";
const SANS = "Inter, -apple-system, 'Segoe UI', Roboto, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const T = {
  en: {
    left: ["WaveKat Voice", "your computer"],
    right: ["SIP provider", "sip.example.com:5061"],
    p1: "1  TLS HANDSHAKE",
    p2: "2  SIP OVER THE ENCRYPTED CONNECTION",
    tcp: [["TCP connect", SANS], [" · port 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + certificate chain", SANS]],
    check: "Verify: trusted CA + SIP domain",
    keys: [["Session keys agreed", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], [" (challenge)", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], [" (incoming call)", SANS]],
  },
  "zh-Hans": {
    left: ["WaveKat Voice", "你的电脑"],
    right: ["SIP 服务商", "sip.example.com:5061"],
    p1: "1  TLS 握手",
    p2: "2  SIP 消息在加密连接中传输",
    tcp: [["TCP 连接", SANS], [" · 5061 端口", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + 证书链", SANS]],
    check: "校验：受信任 CA + SIP 域名",
    keys: [["协商会话密钥", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], ["（质询）", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], ["（来电）", SANS]],
  },
  "zh-Hant": {
    left: ["WaveKat Voice", "你的電腦"],
    right: ["SIP 供應商", "sip.example.com:5061"],
    p1: "1  TLS 交握",
    p2: "2  SIP 訊息在加密連線中傳輸",
    tcp: [["TCP 連線", SANS], [" · 連接埠 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + 憑證鏈", SANS]],
    check: "驗證：受信任 CA + SIP 網域",
    keys: [["協商工作階段金鑰", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], ["（質詢）", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], ["（來電）", SANS]],
  },
  ja: {
    left: ["WaveKat Voice", "あなたのコンピューター"],
    right: ["SIP プロバイダー", "sip.example.com:5061"],
    p1: "1  TLS ハンドシェイク",
    p2: "2  暗号化された接続で SIP を送受信",
    tcp: [["TCP 接続", SANS], [" · ポート 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + 証明書チェーン", SANS]],
    check: "検証：信頼された CA + SIP ドメイン",
    keys: [["セッション鍵を合意", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], ["（チャレンジ）", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], ["（着信）", SANS]],
  },
  ko: {
    left: ["WaveKat Voice", "내 컴퓨터"],
    right: ["SIP 제공업체", "sip.example.com:5061"],
    p1: "1  TLS 핸드셰이크",
    p2: "2  암호화된 연결로 SIP 전송",
    tcp: [["TCP 연결", SANS], [" · 포트 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + 인증서 체인", SANS]],
    check: "검증: 신뢰할 수 있는 CA + SIP 도메인",
    keys: [["세션 키 합의", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], [" (챌린지)", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], [" (수신 전화)", SANS]],
  },
  de: {
    left: ["WaveKat Voice", "Ihr Computer"],
    right: ["SIP-Anbieter", "sip.example.com:5061"],
    p1: "1  TLS-HANDSHAKE",
    p2: "2  SIP ÜBER DIE VERSCHLÜSSELTE VERBINDUNG",
    tcp: [["TCP-Verbindung", SANS], [" · Port 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + Zertifikatskette", SANS]],
    check: "Prüfung: vertrauenswürdige CA + SIP-Domain",
    keys: [["Sitzungsschlüssel ausgehandelt", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], [" (Challenge)", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], [" (eingehender Anruf)", SANS]],
  },
  es: {
    left: ["WaveKat Voice", "su equipo"],
    right: ["Proveedor SIP", "sip.example.com:5061"],
    p1: "1  NEGOCIACIÓN TLS",
    p2: "2  SIP POR LA CONEXIÓN CIFRADA",
    tcp: [["Conexión TCP", SANS], [" · puerto 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + cadena de certificados", SANS]],
    check: "Verificación: CA de confianza + dominio SIP",
    keys: [["Claves de sesión acordadas", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], [" (desafío)", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], [" (llamada entrante)", SANS]],
  },
  fr: {
    left: ["WaveKat Voice", "votre ordinateur"],
    right: ["Opérateur SIP", "sip.example.com:5061"],
    p1: "1  NÉGOCIATION TLS",
    p2: "2  SIP SUR LA CONNEXION CHIFFRÉE",
    tcp: [["Connexion TCP", SANS], [" · port 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + chaîne de certificats", SANS]],
    check: "Vérification : CA de confiance + domaine SIP",
    keys: [["Clés de session négociées", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], [" (défi)", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], [" (appel entrant)", SANS]],
  },
  it: {
    left: ["WaveKat Voice", "il tuo computer"],
    right: ["Operatore SIP", "sip.example.com:5061"],
    p1: "1  HANDSHAKE TLS",
    p2: "2  SIP SULLA CONNESSIONE CIFRATA",
    tcp: [["Connessione TCP", SANS], [" · porta 5061", SANS]],
    hello: [["ClientHello", MONO]],
    cert: [["ServerHello", MONO], [" + catena di certificati", SANS]],
    check: "Verifica: CA attendibile + dominio SIP",
    keys: [["Chiavi di sessione concordate", SANS]],
    reg: [["REGISTER", MONO]],
    chal: [["401 Unauthorized", MONO], [" (sfida)", SANS]],
    auth: [["REGISTER", MONO], [" + ", SANS], ["Authorization", MONO]],
    ok: [["200 OK", MONO]],
    invite: [["INVITE", MONO], [" (chiamata in arrivo)", SANS]],
  },
};

// Rough rendered width of the verify note at 12.5px: CJK glyphs are ~1em,
// Latin ~0.55em. Only has to be close enough to pad the box.
const noteW = (s) =>
  Math.max(230, Math.round([...s].reduce((w, c) => w + (/[\u3000-\u9fff\uac00-\ud7af\uff00-\uffef]/.test(c) ? 12.5 : 6.9), 0)) + 28);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const label = (parts, y, color) =>
  `<text x="${MID}" y="${y - 9}" text-anchor="middle" font-size="14" fill="${color}" xml:space="preserve">` +
  parts.map(([t, f]) => `<tspan font-family="${f}">${esc(t)}</tspan>`).join("") +
  `</text>`;

// dir: "r" = left→right, "l" = right→left, "b" = both
function msg(parts, y, dir, enc) {
  const c = enc ? ACCENT : GRAY;
  const m = enc ? "a" : "g";
  const [x1, x2] = dir === "l" ? [R - 2, L + 2] : [L + 2, R - 2];
  const start = dir === "b" ? ` marker-start="url(#${m})"` : "";
  return (
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${c}" stroke-width="${enc ? 2 : 1.5}"${start} marker-end="url(#${m})"/>` +
    label(parts, y, enc ? INK : "#374151")
  );
}

function head(x, [title, sub]) {
  return (
    `<rect x="${x - 110}" y="24" width="220" height="58" rx="10" fill="#f9fafb" stroke="#d1d5db"/>` +
    `<text x="${x}" y="49" text-anchor="middle" font-family="${SANS}" font-size="15" font-weight="600" fill="${INK}">${esc(title)}</text>` +
    `<text x="${x}" y="69" text-anchor="middle" font-family="${sub.includes(".") ? MONO : SANS}" font-size="12" fill="${MUTED}">${esc(sub)}</text>`
  );
}

function lock(x, y) {
  return (
    `<g fill="none" stroke="${ACCENT}" stroke-width="1.6">` +
    `<path d="M${x + 2.5} ${y + 6} v-2.5 a3.5 3.5 0 0 1 7 0 v2.5"/>` +
    `<rect x="${x}" y="${y + 6}" width="12" height="9" rx="2" fill="${ACCENT}"/></g>`
  );
}

function svg(lang) {
  const t = T[lang];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
<defs>
  <marker id="g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${GRAY}"/></marker>
  <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${ACCENT}"/></marker>
</defs>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="16" fill="#ffffff" stroke="#e5e7eb"/>
${head(L, t.left)}
${head(R, t.right)}
<rect x="20" y="102" width="${W - 40}" height="232" rx="10" fill="#f9fafb" stroke="#e5e7eb"/>
<rect x="20" y="350" width="${W - 40}" height="242" rx="10" fill="#eef2ff" stroke="#c7d2fe"/>
<line x1="${L}" y1="82" x2="${L}" y2="${H - 20}" stroke="#9ca3af" stroke-dasharray="4 4"/>
<line x1="${R}" y1="82" x2="${R}" y2="${H - 20}" stroke="#9ca3af" stroke-dasharray="4 4"/>
<rect x="21" y="110" width="${W - 42}" height="24" fill="#f9fafb"/>
<text x="36" y="126" font-family="${SANS}" font-size="11.5" font-weight="600" letter-spacing="0.6" fill="${MUTED}">${esc(t.p1)}</text>
<rect x="21" y="358" width="${W - 42}" height="24" fill="#eef2ff"/>
${lock(36, 362)}
<text x="56" y="376" font-family="${SANS}" font-size="11.5" font-weight="600" letter-spacing="0.6" fill="${ACCENT}">${esc(t.p2)}</text>
${msg(t.tcp, 164, "r", false)}
${msg(t.hello, 204, "r", false)}
${msg(t.cert, 244, "l", false)}
<rect x="${L - 4}" y="258" width="${noteW(t.check)}" height="26" rx="6" fill="#ffffff" stroke="#d1d5db"/>
<text x="${L - 4 + noteW(t.check) / 2}" y="275.5" text-anchor="middle" font-family="${SANS}" font-size="12.5" fill="#374151">${esc(t.check)}</text>
${msg(t.keys, 316, "b", false)}
${msg(t.reg, 414, "r", true)}
${msg(t.chal, 454, "l", true)}
${msg(t.auth, 494, "r", true)}
${msg(t.ok, 534, "l", true)}
${msg(t.invite, 574, "l", true)}
</svg>
`;
}

for (const lang of Object.keys(T)) writeFileSync(`${OUT}/${lang}.svg`, svg(lang));
console.log("wrote", Object.keys(T));
