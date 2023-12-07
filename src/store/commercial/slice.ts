import { createSlice } from '@reduxjs/toolkit';
import { editBarber, getAppointmentsPerUser, getBarbers, getFavouriteBarbers, getSchedulePerBarber, getServices, leaveCommentBarber, likeBarber, makeAppointment } from './asyncThunks';
import { Barber } from '../../types/Barber/Barber';
import { Appointment, FullAppointment } from '../../types/Appointment/Appointment';
import { Service } from '../../types/Service/Service';
import { Review } from '../../types/Review/Review';

interface InitState {
  errorMessage: string;
  barbers: Barber[];
  appointments: FullAppointment[];
  services: Service[];
  schedulePerBarber: Date[];
  lastReview: Review | null;
  lastAppointment: Appointment | null;
  favouriteBarbers: Barber[],
  isFavouriteBarberMessage: string,
  editedBarber: Barber | null,
}

const initialState: InitState = {
  errorMessage: '',
  barbers: [],
  services: [],
  appointments: [],
  schedulePerBarber: [],
  lastReview: null,
  lastAppointment: null,
  favouriteBarbers: [],
  isFavouriteBarberMessage: '',
  editedBarber: null,
};

const slice = createSlice({
  name: 'commercial',
  initialState,
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
        state.errorMessage = '';

        state.lastAppointment = action.payload.data;
      })
      .addCase(getSchedulePerBarber.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.schedulePerBarber = action.payload;
      })
      .addCase(leaveCommentBarber.fulfilled, (state, action) => {
        state.errorMessage = '';
        console.log(action);

        state.lastReview = action.payload;
      })
      .addCase(getAppointmentsPerUser.fulfilled, (state, action) => {
        state.errorMessage = '';
        console.log(action);
        state.appointments = action.payload;
      })
      .addCase(getFavouriteBarbers.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.favouriteBarbers = action.payload;
      })
      .addCase(likeBarber.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.isFavouriteBarberMessage = action.payload;
      })
      .addCase(editBarber.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.editedBarber = action.payload;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
