import {createAction, props} from "@ngrx/store";
import {Trip} from "../models/trip";

export const getTrips = createAction('[Trips] Get Trips');
export const getTripsSuccess = createAction(
  '[Trips] Get Successful Trip',
  props<{ trips: Trip[] }>()
);
export const setSelectedTrip = createAction(
  '[Trips] Set Selected Trip',
  props<{ selectedTrip: Trip }>()
);
