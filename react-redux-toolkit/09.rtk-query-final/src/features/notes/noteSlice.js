import { createSlice, createSelector } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: { notes: [] },
  reducers: {
    setNotes: (state, action) => {
      state.notes = [...action.payload];
    }
  },
});

export const { setNotes } = notesSlice.actions;

export const selectAllNotes = (state) => state.notes.notes;

export const selectNoteById = createSelector(
  [selectAllNotes, (state, noteId) => noteId],
  (notes, noteId) => notes.filter(({ id }) => id === noteId)
);

export default notesSlice.reducer;