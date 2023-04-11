import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { myApi } from '../requestMethod/requestMethod';
import cogoToast from "cogo-toast";


const initialState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async ({userData, history}) => {
    try {
      const res = await myApi.post("/auth/register", userData);
      localStorage.setItem("profile", JSON.stringify(res.data));
      console.log(res);

      cogoToast.success( res.data.message, {
        position: "bottom-right",
      });
      
      // return res.data;
      history.push("/welcome_page");

    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);

export const loginUser = createAsyncThunk("user/login",   async ({userData, history}) => {
    try {
      const res = await myApi.post("/auth/login", userData);
      localStorage.setItem("profile", JSON.stringify(res.data));
      console.log(res);

      cogoToast.success( res.data.message, {
        position: "bottom-right",
      });
      
      // return res.data;
      history.push('/')

    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);


export const updateUser = createAsyncThunk("user/update",   async ({userData, history, userId}) => {
    try {
      const res = await myApi.put("/auth/" + userId, userData);
      console.log(res);

      cogoToast.success( res.data.message, {
        position: "bottom-right",
      });
      
      // return res.data;
      history.push('/')

    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);


export const getUser = createAsyncThunk("user/get",   async ({userId, setUser}) => {
    try {
      const res = await myApi.get("/auth/" + userId);
      // console.log(res);
      setUser(res.data)

      // cogoToast.success( res.data.message, {
      //   position: "bottom-right",
      // });
      
      // return res.data;

    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        // cogoToast.loading("please wait...", {
        //   position: "bottom-right",
        // });
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
        // cogoToast.success("successful!", {
        //   position: "bottom-right",
        // });
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // cogoToast.error(`failed!`, {
        //   position: "bottom-right",
        // });
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
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default userSlice.reducer;