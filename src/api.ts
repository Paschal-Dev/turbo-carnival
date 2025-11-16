// frontend/src/api.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = import.meta.env.DEV
  ? 'https://goldstreamacademy.com/goldstream-backend' // full backend URL for dev
  : 'https://goldstreamacademy.com/goldstream-backend'; // same for production

export async function postJson(path: string, data: any) {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error('Non-JSON response:', text);
    return { error: 'Invalid server response', raw: text };
  }
}

export async function getJson(path: string) {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
