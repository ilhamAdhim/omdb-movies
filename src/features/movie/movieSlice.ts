import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppMovieState {
  // ! (Possible changes) We use IMovieItemSavedLocal because we want to store the state that has been compared from OmdbAPI with our localStorage
  dataMovies: IMovieItemSavedLocal[] | undefined;
  status: "idle" | "loading" | "failed" | "initial-load";
  searchValue: string;
}

const initialState: AppMovieState = {
  dataMovies: [],
  status: "initial-load",
  searchValue: "",
};

export const movieSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      state.status = action.payload;
    },
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateMovies: (state, action: PayloadAction<IMovieItemSavedLocal[]>) => {
      state.dataMovies = action.payload;
    },
  },
});

export const { updateStatus, updateSearchValue, updateMovies } =
  movieSlice.actions;

export default movieSlice.reducer;
