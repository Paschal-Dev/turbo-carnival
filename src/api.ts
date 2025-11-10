/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
// export async function getJson(path: string) {
//   const res = await fetch(path, { 
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//     }
//   });
//   const text = await res.text();
//   try {
//     return JSON.parse(text);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (e) {
//     return text;
//   }
// }

// In your api.ts or AdminDashboard.tsx
const API_BASE = import.meta.env.DEV 
  ? 'http://localhost/goldstream-backend'  // Direct backend in dev
  : '/api';  // Proxy in production

export async function postJson(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export async function getJson(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}