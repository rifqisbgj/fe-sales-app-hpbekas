import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiAdapter from "../api/apiAdapter";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  //   mengembalikan state ke awal
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    // jika login user berhasil
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      //   ambil data dari LoginUser
      state.user = action.payload;
    });
    // jika LoginUser gagal
    builder.addCase(LoginUser.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        /* set data jika terdapat error pada LoginUser, yg telah diset pada
        thunkApi.rejectWithValue(msg)
        */
        (state.message = action.payload);
    });

    // jika proses pengambilan data user pending
    builder.addCase(GetUserByToken.pending, (state) => {
      state.isLoading = true;
    });
    // jika get user by decode refreshToken berhasil
    builder.addCase(GetUserByToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload.data;
    });
    // jika pengambilan data user gagal
    builder.addCase(GetUserByToken.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.message = action.payload);
    });

    builder.addCase(Logout.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.message = action.payload.message;
    });
  },
});

// action LoginUser
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkApi) => {
    try {
      // proses login ke api
      const res = await apiAdapter.post(
        "/users/login",
        {
          // set dengan data user req
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        const msg = error.response.data.message;
        return thunkApi.rejectWithValue(msg);
      }
    }
  }
);

// action Get Data User by Refresh Token
export const GetUserByToken = createAsyncThunk(
  "user/GetUserByToken",
  async (_, thunkApi) => {
    try {
      // proses login ke api
      const res = await apiAdapter.get("/users/token", {
        withCredentials: true,
      });
      return jwtDecode(res.data.data.token);
    } catch (error) {
      if (error.response) {
        const msg = error.response.data.message;
        return thunkApi.rejectWithValue(msg);
      }
    }
  }
);

// action Log out user
export const Logout = createAsyncThunk(
  "user/Logout",
  async (user, thunkApi) => {
    try {
      // proses login ke api
      const res = await apiAdapter.post(
        "/users/logout",
        {
          email: user.email,
        },
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        const msg = error.response.data.message;
        return thunkApi.rejectWithValue(msg);
      }
    }
  }
);

export const { reset } = authSlice.actions;
export default authSlice.reducer;
