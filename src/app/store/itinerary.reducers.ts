import { createFeature, createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/models/trip';
import * as ItinerariesActions from '../store/trip.actions';
import {Itinerary} from "../models/itinenary";

export const itineraryKey = 'itinerary';
export interface ItinerariesState {
  itineraries: Itinerary[];
  activeItinenary: Itinerary;
}
export const initialState: ItinerariesState = {
  itineraries: [],
  activeItinenary: { itineraryName: '', itineraryCost : 0, tag:'',
    notes : '', itineraryStartLocation: '', itineraryEndLocation:'',
    itineraryStartTime:'', itineraryEndTime:'', currency:'', tripId:'', itineraryId:'', },
};
export const reducer = createReducer(
  initialState,
  on(ItinerariesActions.getTrips, (state) => ({ ...state})),
  on(ItinerariesActions.getTripsSuccess, (state, { trips }) => ({
    ...state,
    trips,
  })),
  on(ItinerariesActions.setSelectedTrip, (state, { selectedTrip }) => ({
    ...state,
    selectedTrip,
  }))
);
export const tripsFeature = createFeature({
  name: itineraryKey,
  reducer,
});
