import { NextResponse } from "next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;

if (!baseUrl) throw new Error("NEON_AUTH_BASE_URL is not set");

/** Prefix Neon Auth uses on its own origin. */
const UPSTREAM_PREFIX = "__Secure-neon-auth";
/** Prefix used on this site so the cookie is first-party. */
const LOCAL_PREFIX = "neon-auth";

const ALLOWED_PATH = /^[A-Za-z0-9_./-]+$/;
const FORWARDED_REQUEST_HEADERS = [
  "accept",
  "accept-language",
  "content-type",
  "origin",
  "referer",
  "user-agent",
  "x-forwarded-for",
];

function isSecureRequest(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0]?.trim() === "https";
  return new URL(request.url).protocol === "https:";
}

/** Map this site's cookie names back to the names Neon Auth expects. */
function toUpstreamCookieHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  return cookieHeader
    .split(";")
    .map((part) => {
      const trimmed = part.trim();
      if (trimmed.startsWith(`${LOCAL_PREFIX}.`)) {
        return `${UPSTREAM_PREFIX}${trimmed.slice(LOCAL_PREFIX.length)}`;
      }
      return null;
    })
    .filter((part): part is string => Boolean(part))
    .join("; ");
}

/**
 * Rewrite a Neon Auth Set-Cookie so it belongs to this origin.
 * `__Secure-` is dropped because browsers reject that prefix over http,
 * which is how local development runs. Secure cookies stay Secure on https.
 */
function toLocalSetCookie(cookie: string, secure: boolean): string {
  let value = cookie.startsWith(`${UPSTREAM_PREFIX}.`)
    ? `${LOCAL_PREFIX}.${cookie.slice(UPSTREAM_PREFIX.length + 1)}`
    : cookie;

  if (!secure) value = value.replace(/;\s*Secure/gi, "");
  value = value.replace(/;\s*Partitioned/gi, "").replace(/SameSite=None/gi, "SameSite=Lax");
  return value;
}

async function proxy(request: Request, path: string[]): Promise<Response> {
  const joined = path.join("/");
  if (!joined || !ALLOWED_PATH.test(joined) || joined.split("/").some((part) => part === "..")) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const target = new URL(`${baseUrl!.replace(/\/+$/, "")}/${joined}`);
  target.search = new URL(request.url).search;

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const cookie = toUpstreamCookieHeader(request.headers.get("cookie"));
  if (cookie) headers.set("cookie", cookie);

  const method = request.method.toUpperCase();
  const body = method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

  let upstream: Response;
  try {
    upstream = await fetch(target, { method, headers, body, redirect: "manual", cache: "no-store" });
  } catch {
    return NextResponse.json({ message: "Auth service unavailable" }, { status: 503 });
  }

  const responseHeaders = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);
  responseHeaders.set("cache-control", "no-store");

  const secure = isSecureRequest(request);
  for (const cookieHeader of upstream.headers.getSetCookie()) {
    responseHeaders.append("set-cookie", toLocalSetCookie(cookieHeader, secure));
  }

  const location = upstream.headers.get("location");
  if (location) responseHeaders.set("location", location);

  const payload = method === "HEAD" ? null : await upstream.arrayBuffer();
  return new Response(payload, { status: upstream.status, headers: responseHeaders });
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}

export async function PUT(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}

export async function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}

export async function DELETE(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, (await context.params).path);
}
