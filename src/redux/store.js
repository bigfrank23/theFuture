import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import postsReducer from './postsSlice'

const reducer = {
  user: userReducer,
  posts: postsReducer
};

export default configureStore({
    reducer: reducer,
    devTools: true
})
