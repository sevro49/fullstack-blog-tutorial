import { User } from '@/types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const LOGIN_URL = 'http://localhost:5000/api/auth/login';
const REGISTER_URL = 'http://localhost:5000/api/auth/register';
const LOGOUT_URL = 'http://localhost:5000/api/auth/logout';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string  | null; // Change this line to allow an object with 'error' property
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

const initialState: AuthState = { 
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
};

// Update the registerUser and loginUser thunks to correctly type the error
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(REGISTER_URL, userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'An unknown error occurred'); // Return an object with 'error'
      }
      return rejectWithValue('An unknown error occurred'); // Handle unexpected errors
    }
  }
);

export const loginUser = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string }, // fulfilled payload type
  LoginCredentials, // thunk argument type
  { rejectValue: { error: string } } // reject payload type
>(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ error: error.response?.data || 'An unknown error occurred' });
      }
      return rejectWithValue({ error: 'An unknown error occurred' });
    }
  }
);

export const logoutUser = createAsyncThunk<
  boolean, // Fulfilled payload türü
  void, // Thunk argument türü
  { rejectValue: { error: string } } // Rejected payload türü
>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(LOGOUT_URL, {}, { withCredentials: true });

      return true; // Fulfilled durumunda `boolean` döner
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({ error: error.response?.data || 'An unknown error occurred' });
      }
      return rejectWithValue({ error: 'An unknown error occurred' });
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.status = 'succeeded';
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.status = 'succeeded';
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload.error; // Burada artık 'error' objesi erişilebilir
        } else {
          state.error = 'An unknown error occurred'; // Eğer hata yoksa default değer
        }
      })
      
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Logout failed';
      });
  }
})
export const { loginSuccess, loginFailure, logoutSuccess, logoutFailure
  , registerSuccess, registerFailure } = authSlice.actions;

export default authSlice.reducer;