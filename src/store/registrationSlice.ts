/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/store/registrationSlice.ts
import { createAsyncThunk, createSlice, type SerializedError } from '@reduxjs/toolkit';
import { postJson } from '../api';
import Swal from 'sweetalert2';

export const submitRegistration = createAsyncThunk('registration/submit', async (formData: any, { rejectWithValue }) => {
  try {
    const payload = {
      event_id: formData.event_id,
      event_title: formData.event_title,
      event_name: formData.event_name,
      event_type: formData.event_type,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      school: formData.school,
      dob: formData.dob,
      address: formData.address,
      sex: formData.sex,
      nationality: formData.nationality,
      guardian_name: formData.guardian_name,
      guardian_email: formData.guardian_email,
      additional_info: formData.additional_info,
      team_members: formData.team_members || [],
    };

    console.log('=== SLICE PAYLOAD TO SERVER ===');
    console.log(JSON.stringify(payload, null, 2));

    const res = await postJson('/api/register.php', payload);

    if (res?.error) {
      // Show detailed error message from backend
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        html: `
          <div>
            <p><strong>${res.error}</strong></p>
            <p>${res.message}</p>
            <p>Please try again with different options.</p>
          </div>
        `,
        confirmButtonColor: '#d33',
      });
      return rejectWithValue(res.message);
    }

    // Success alert
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      html: `
        <div>
          <p>Your registration has been submitted successfully!</p>
          <p><strong>Registration Number:</strong> ${res.registration_number}</p>
          <p><strong>Event:</strong> ${res.event_name}</p>
          <p><strong>Event Type:</strong> ${res.event_type}</p>
          ${res.team_id ? `<p><strong>Team ID:</strong> ${res.team_id}</p>` : ''}
        </div>
      `,
      confirmButtonColor: '#3085d6',
    });

    return res;
  } catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err?.message || 'Something went wrong. Please try again.',
    });
    return rejectWithValue(err.message);
  }
});

interface RegistrationState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  last: any;
  error: SerializedError | null;
}

const initialState: RegistrationState = {
  status: 'idle',
  last: null,
  error: null,
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitRegistration.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(submitRegistration.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.last = action.payload;
      state.error = null;
    });
    builder.addCase(submitRegistration.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error ?? null;
    });
  },
});

export default slice.reducer;