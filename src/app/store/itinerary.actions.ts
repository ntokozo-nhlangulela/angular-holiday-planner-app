import {createAction, props} from "@ngrx/store";
import {Itinerary} from "../models/itinenary";

export const getItineraries = createAction('[Itineraries] Get Itineraries');
export const getItinerariesSuccess = createAction(
  '[Itineraries] Get Successful Itineraries',
  props<{ itineraries: Itinerary[] }>()
);
export const setSelectedItineraries = createAction(
  '[Itineraries] Set Selected Itineraries',
  props<{ selectedItinerary: Itinerary[] }>()
);
