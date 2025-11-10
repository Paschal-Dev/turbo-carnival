/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJson, postJson } from '../api';

// 🟢 Fetch all registrations
export const fetchRegistrations = createAsyncThunk('admin/fetchRegistrations', async () => {
  const res = await getJson('/api/get_registrations.php');
  return res || []; // ✅ FIXED: Return res directly
});

// 🟢 Delete a registration
export const deleteRegistration = createAsyncThunk(
  'admin/deleteRegistration',
  async ({ id }: { id: number }) => {
    const res = await postJson('/api/delete_registration.php', { id });
    return res;
  }
);

// 🟢 Edit participant info
export const editParticipant = createAsyncThunk('admin/editParticipant', async (data: any) => {
  const res = await postJson('/api/edit_registration.php', data);
  return res;
});

const slice = createSlice({
  name: 'admin',
  initialState: { data: [] as any[], status: 'idle', error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export default slice.reducer;