import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISuggestion } from '../interfaces';

interface ISuggestionsState {
  suggestions: ISuggestion[];
}

const initialState: ISuggestionsState = {
  suggestions: [],
};

const SuggestionSlice = createSlice({
  name: 'Suggestions',
  initialState,
  reducers: {
    setSuggestions: (state, action: PayloadAction<ISuggestion[]>) => {
      state.suggestions = action.payload;
    },
  },
});

export const { setSuggestions } = SuggestionSlice.actions;

export default SuggestionSlice.reducer;
