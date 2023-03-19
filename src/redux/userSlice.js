import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { myApi } from '../requestMethod/requestMethod';

const initialState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const res = await myApi.post("/auth/register", userData);
    localStorage.setItem("profile", JSON.stringify(res.data));
    console.log(res);
    return res.data;
  }
);

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  const res = await myApi.post("/auth/login", userData);
  localStorage.setItem("profile", JSON.stringify(res.data));
  return res.data;
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;