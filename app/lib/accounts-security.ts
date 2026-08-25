export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return origin === new URL(request.url).origin;
}

export function parsePkrToPaisa(value: unknown) {
  const normalized = String(value ?? "").replace(/,/g, "").trim();
  if (!/^\d{1,12}(\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, fraction = ""] = normalized.split(".");
  const paisa = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(paisa) && paisa > 0 ? paisa : null;
}

export function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export function validDate(value: unknown) {
  const text = String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const date = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  const earliest = new Date("2020-01-01T00:00:00Z");
  const latest = new Date();
  latest.setUTCDate(latest.getUTCDate() + 1);
  return date >= earliest && date <= latest ? text : null;
}
