/**
 * Typed API client for backend_api.
 *
 * The backend base URL is configured via NEXT_PUBLIC_API_BASE_URL.
 * IMPORTANT: Because this is a frontend app, the base URL must be reachable from the user's browser.
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
  status: number;
  url: string;
  bodyText?: string;

  constructor(message: string, params: { status: number; url: string; bodyText?: string }) {
    super(message);
    this.name = "ApiError";
    this.status = params.status;
    this.url = params.url;
    this.bodyText = params.bodyText;
  }
}

function getApiBaseUrl(): string {
  // NEXT_PUBLIC_* variables are exposed to the browser by Next.js.
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!fromEnv) {
    // Fallback: allow relative calls for same-origin deployments (e.g., when proxied).
    return "";
  }
  return fromEnv.replace(/\/+$/, "");
}

async function safeReadText(res: Response): Promise<string | undefined> {
  try {
    return await res.text();
  } catch {
    return undefined;
  }
}

async function request<TResponse>(
  path: string,
  init: {
    method: HttpMethod;
    query?: Record<string, string | number | boolean | undefined | null>;
    body?: unknown;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  }
): Promise<TResponse> {
  const baseUrl = getApiBaseUrl();

  const url = new URL(`${baseUrl}${path}`, baseUrl ? undefined : window.location.origin);
  if (init.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(init.headers ?? {}),
  };

  const res = await fetch(url.toString(), {
    method: init.method,
    headers,
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    signal: init.signal,
    // If backend uses cookies for auth, this should be "include".
    // For token-based auth, leave as default and pass Authorization header.
    credentials: "include",
  });

  if (!res.ok) {
    const bodyText = await safeReadText(res);
    throw new ApiError(`API request failed (${res.status})`, {
      status: res.status,
      url: url.toString(),
      bodyText,
    });
  }

  // Some endpoints may return empty body.
  const text = await safeReadText(res);
  if (!text) return undefined as TResponse;

  try {
    return JSON.parse(text) as TResponse;
  } catch {
    // If backend returns plain text, allow caller to type as string.
    return text as unknown as TResponse;
  }
}

/**
 * Minimal typed client. The downloaded OpenAPI currently only exposes GET /.
 * Keep this client extensible; as backend grows, add typed wrappers here.
 */
export const apiClient = {
  // PUBLIC_INTERFACE
  async healthCheck(signal?: AbortSignal): Promise<unknown> {
    /** Calls backend health check endpoint. */
    return request<unknown>("/", { method: "GET", signal });
  },
};
