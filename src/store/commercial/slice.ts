import { createSlice } from '@reduxjs/toolkit';
import { getBarbers, getSchedulePerBarber, getServices, makeAppointment } from './asyncThunks';

const slice = createSlice({
  name: 'commercial',
  initialState: {
    errorMessage: '',
    barbers: [],
    services: [],
    appointments: [],
    schedulePerBarber: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBarbers.fulfilled, (state, action) => {
        state.errorMessage = '';

        state.barbers = action.payload?.data;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.errorMessage = '';

        state.services = action.payload?.data;
      })
      .addCase(makeAppointment.fulfilled, (state, action) => {
        state.errorMessage = '',
        console.log(action);
        
        state.appointments = action.payload.data;
      })
      .addCase(getSchedulePerBarber.fulfilled, (state, action) => {
        state.errorMessage = '',
        state.schedulePerBarber = action.payload;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
