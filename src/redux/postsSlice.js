import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { myApi } from "../requestMethod/requestMethod";
import cogoToast from "cogo-toast";


const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const createPost = createAsyncThunk(
  "post/create",
  async ({ content, username, setContent, userImg, imageUrl, videoUrl, setImageUrl, setVideoUrl, history }) => {
    try {
      const res = await myApi.post("/post/", {content, username, userImg, photo: imageUrl, video: videoUrl});
      console.log(res);
      setContent('');
      setImageUrl(null)
      setVideoUrl(null)
      cogoToast.success(res.data.message, {
        position: "bottom-right",
      });

      // return res.data;
    //   history.push("/welcome_page");
    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);


export const getPosts = createAsyncThunk(
  "post/get_posts",
  async ({ setTotalPages, currentPage, setPosts, posts, history }) => {
    try {
      const res = await myApi.get(`/post?page=${currentPage}`);
      console.log(res);
      // setPosts(posts.concat(res.data.items));
      if (currentPage === 1) {
        setPosts(res.data.items);
      } else {
        setPosts(res.data.items);
        // setPosts([]);
        // setPosts((posts) => [...posts, ...res.data.items]);
      }
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);


export const getPost = createAsyncThunk(
  "post/get_post",
  async ({ setLoadMore, setTotalPages, currentPage, setPost, postId, posts, history }) => {
    try {
      const res = await myApi.get('/post/' + postId);
      console.log(res);
      setPost(res.data);
    } catch (error) {
      console.log(error);
      cogoToast.error(error.response.data.message || error.message, {
        position: "bottom-right",
      });
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.currentUser = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default postsSlice.reducer;