/** API client for XAMPP PHP + MySQL backend */

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const API_BASE = `${base}/api`;

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: 'applicant' | 'employer' | 'admin';
}

export interface AuthProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'applicant' | 'employer' | 'admin';
  location?: string | null;
  avatar?: string | null;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}/${path.replace(/^\//, '')}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      (data as { error?: string }).error || res.statusText || 'Request failed',
      res.status
    );
  }
  return data as T;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path),
  post: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  put: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'PUT', body: JSON.stringify(body ?? {}) }),
};

/** @deprecated Firebase removed — use api client */
export function handleApiError(error: unknown, context: string) {
  console.error(`API Error (${context}):`, error);
  throw error instanceof Error ? error : new Error(String(error));
}
