import { createSlice } from '@reduxjs/toolkit';
import { addBarber, addService, cancelAppointment, deleteBarber, deleteService, editBarber, editService, getAppointmentsPerUser, getBarbers, getFavouriteBarbers, getSchedulePerBarber, getServices, leaveCommentBarber, likeBarber, makeAppointment } from './asyncThunks';
import { Barber, UpperBarber } from '../../types/Barber/Barber';
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
  lastBarber: string;
  favouriteBarbers: UpperBarber[],
  isFavouriteBarberMessage: string,
  editedBarberMessage: string,
  deletedBarberMessage: string,
  newService: string,
  newBarber: string,
  editedServiceMessage: string,
  deletedServiceMessage: string,
}

const initialState: InitState = {
  errorMessage: '',
  barbers: [],
  services: [],
  appointments: [],
  schedulePerBarber: [],
  lastReview: null,
  lastAppointment: null,
  lastBarber: '',
  favouriteBarbers: [],
  isFavouriteBarberMessage: '',
  editedBarberMessage: '',
  deletedBarberMessage: '',
  newService: '',
  newBarber: '',
  editedServiceMessage: '',
  deletedServiceMessage: '',
};

const slice = createSlice({
  name: 'commercial',
  initialState,
  reducers: {
    clearIsFavouriteBarberMessage: (state) => {
      state.isFavouriteBarberMessage = '';
    },
    clearLastDeletedBarberMessage: (state) => {
      state.deletedBarberMessage = '';
    },
    clearEditedBarberMessage: (state) => {
      state.deletedBarberMessage = '';
    },
    clearEditedServiceMessage: (state) => {
      state.editedServiceMessage = '';
    },
    clearDeletedServiceMessage: (state) => {
      state.deletedServiceMessage = '';
    },
    clearLastBarber: (state) => {
      state.newBarber = '';
    },
    clearLastService: (state) => {
      state.newService = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBarbers.fulfilled, (state, action) => {
        state.errorMessage = '';
        console.log(action);
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
        state.editedBarberMessage = action.payload;
      })
      .addCase(deleteBarber.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.deletedBarberMessage = action.payload;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.newService = action.payload;
      })
      .addCase(editService.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.editedServiceMessage = action.payload;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.deletedServiceMessage = action.payload;
      })
      .addCase(addBarber.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.newBarber = action.payload;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        console.log(action.payload);

      });
  },
});

export const { actions } = slice;
export default slice.reducer;
