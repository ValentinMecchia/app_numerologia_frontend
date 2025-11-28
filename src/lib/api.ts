type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions extends RequestInit {
  method?: HttpMethod;
  skipRefresh?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const ACCESS_KEY = 'pe_access_token';
const REFRESH_KEY = 'pe_refresh_token';

export function storeTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_KEY);
}

function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
}

export async function apiFetch<T = unknown>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !options.skipRefresh) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return apiFetch(path, { ...options, skipRefresh: true });
    }
  }

  if (!response.ok) {
    const errorBody = await safeJson(response);
    throw new Error(errorBody?.message ?? 'Error inesperado');
  }

  return safeJson(response) as Promise<T>;
}

async function tryRefreshToken() {
  const token = getRefreshToken();
  if (!token) return false;
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: token }),
  });
  if (!response.ok) {
    clearTokens();
    return false;
  }
  const data = await response.json();
  storeTokens(data.tokens.accessToken, data.tokens.refreshToken);
  return true;
}

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}
