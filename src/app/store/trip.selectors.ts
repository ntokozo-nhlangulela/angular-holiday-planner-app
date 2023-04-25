import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTrips from '../store/trip.reducers';

export const selectTripsState = createFeatureSelector<fromTrips.TripsState>(
  fromTrips.tripKey
);

export const selectTrips = createSelector(
  selectTripsState,
  (state) => state.trips
);

export const selectSelectedTrip = createSelector(
  selectTripsState,
  (state) => state.activeTrips
);
