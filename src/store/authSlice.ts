// frontend/src/store/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postJson, getJson } from '../api';

// === LOGIN ===
// In authSlice.ts - this transforms the response
export const login = createAsyncThunk(
  'auth/login',
  async (payload: { username: string; password: string }) => {
    const res = await postJson('/api/login.php', payload);

    // This transforms {success: true, token: '...'} to {ok: true}
    if (res?.success) {
      localStorage.setItem('adminToken', res.token);
      localStorage.setItem('adminUser', JSON.stringify(res.admin));
      return { ok: true, user: res.admin }; // ← This creates {ok: true}
    }

    return { ok: false, error: res?.message || 'Invalid credentials' };
  }
);

// === CHECK SESSION ===
export const checkSession = createAsyncThunk('auth/check', async () => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');

  if (token && user) {
    return { ok: true, user: JSON.parse(user) };
  }

  const res = await getJson('/api/check_session.php');
  return { ok: res?.success || false, user: res?.admin || null };
});

// === LOGOUT ===
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  await postJson('/api/logout.php', {});
  return { ok: true };
});

// === SLICE ===
const slice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    user: null as null | { id: number; username: string },
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.ok) {
        state.loggedIn = true;
        state.user = action.payload.user;
      } else {
        state.loggedIn = false;
        state.user = null;
      }
    });

    builder.addCase(checkSession.fulfilled, (state, action) => {
      if (action.payload?.ok) {
        state.loggedIn = true;
        state.user = action.payload.user;
      } else {
        state.loggedIn = false;
        state.user = null;
      }
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loggedIn = false;
      state.user = null;
    });
  },
});

export default slice.reducer;
