import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISuggestion } from "../interfaces";

interface ISuggestionsState {
  suggestions: ISuggestion[] | null;
}

const initialState: ISuggestionsState = {
  suggestions: null,
};

const SuggestionSlice = createSlice({
  name: "Suggestions",
  initialState,
  reducers: {
    setSuggestions: (state, action: PayloadAction<ISuggestion[]>) => {
      state.suggestions = action.payload;
    },
    resetSuggestions: (state) => {
      state.suggestions = null;
    },
    followSuggestion: (state, action) => {
      if (state.suggestions)
        state.suggestions = state.suggestions.map((suggestion) => {
          if (suggestion.id === action.payload.suggestionId) {
            suggestion.isFollowed = true;
            return suggestion;
          }
          return suggestion;
        });
    },
    unfollowSuggestion: (state, action) => {
      if (state.suggestions)
        state.suggestions = state.suggestions.map((suggestion) => {
          if (suggestion.id === action.payload.suggestionId) {
            suggestion.isFollowed = false;
            return suggestion;
          }
          return suggestion;
        });
    },
  },
});

export const {
  setSuggestions,
  resetSuggestions,
  followSuggestion,
  unfollowSuggestion,
} = SuggestionSlice.actions;

export default SuggestionSlice.reducer;
