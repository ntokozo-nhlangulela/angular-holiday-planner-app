import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItineraries from '../store/itinerary.reducers';

export const selectItinerariesState = createFeatureSelector<fromItineraries.ItinerariesState>(
  fromItineraries.itineraryKey
);

export const selectItineraries = createSelector(
  selectItinerariesState,
  (state) => state.itineraries
);

export const selectSelectedItinerary = createSelector(
  selectItinerariesState,
  (state) => state.activeItinenary
);
