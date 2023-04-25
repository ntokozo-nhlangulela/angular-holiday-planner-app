import { createFeature, createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/models/trip';
import * as TripsActions from '../store/trip.actions';

export const tripKey = 'trips';
export interface TripsState {
  trips: Trip[];
  activeTrips: Trip;
}
export const initialState: TripsState = {
  trips: [],
  activeTrips: { tripName: '', userId: '', description:'', departure: '', returnDate: '', tripId:'' },
};
export const reducer = createReducer(
  initialState,
  on(TripsActions.getTrips, (state) => ({ ...state})),
  on(TripsActions.getTripsSuccess, (state, { trips }) => ({
    ...state,
    trips,
  })),
  on(TripsActions.setSelectedTrip, (state, { selectedTrip }) => ({
    ...state,
    selectedTrip,
  }))
);
export const tripsFeature = createFeature({
  name: tripKey,
  reducer,
});
