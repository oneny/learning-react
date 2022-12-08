import { apiSlice } from '../../app/api/apiSlice';

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: 'Note', id: 'LIST' },
              ...result.map((id) => ({ type: 'Note', id })),
            ]
          : [{ type: 'Note', id: 'LIST' }];
      },
    }),
  }),
});

export const {} = notesApiSlice;
