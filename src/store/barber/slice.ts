import { createSlice } from '@reduxjs/toolkit';
import { getBarbers } from './asyncThunks';

const slice = createSlice({
  name: 'barber',
  initialState: {
    barbers: [],
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBarbers.fulfilled, (state, action) => {
        state.errorMessage = '';

        state.barbers = action.payload?.data;
        console.log(action);
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
