import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (state, action) => {
      const id = action.payload;

      if (!state[id]) {
        state[id] = { likes: 0 };
      }
      state[id].likes += 1;
    },
    savePost: (state, action) => {
      const id = action.payload;

      if (!state[id]) {
        state[id] = { likes: 0, saved: false };
      }

      state[id].saved = !state[id].saved; // Toggle saved state
    },

    addComments: (state, action) => {
      const { id, comment } = action.payload;

      if (!state[id]) {
        state[id] = { likes: 0, saved: false, comments: [] };
      }
      state[id].comments.push(comment);
    },
  },
});

export const { likePost, savePost, addComments } = postSlice.actions;

export default postSlice.reducer;
