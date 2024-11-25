import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '@/types/types';
import axios, { AxiosError } from 'axios';

const GET_ALL_BLOGS_URL = 'http://localhost:5000/api/blogs';

interface BlogState {
  blogs: Blog[] | null; // Blog verisi dizisi
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  blogs: [], // Başlangıçta boş bir dizi
  status: 'idle',
  error: null,
};

// API'den blogları çekmek için thunk
export const getAllBlogs = createAsyncThunk(
  'blog/getAllBlogs', // Aksiyon adı
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(GET_ALL_BLOGS_URL, { withCredentials: true });
      return response.data.blogs; // API'den gelen blog verisini döndür
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'An unknown error occurred');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    getAllBlogsSuccess: (state, action: PayloadAction<Blog[]>) => {
      state.blogs = action.payload; // Gelen blogları state'e ekle
      state.status = 'succeeded';
      state.error = null;
    },
    getAllBlogsFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload; // API'den gelen blogları state'e ekle
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { getAllBlogsSuccess, getAllBlogsFailure } = blogSlice.actions;

export default blogSlice.reducer;
