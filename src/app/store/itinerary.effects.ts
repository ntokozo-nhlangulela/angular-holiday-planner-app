import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, first, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as ItineraryActions from '../store/itinerary.actions';
import { ItineraryService } from '../services/itinerary.service';

@Injectable()
export class ItineraryEffects {
  itinerary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ItineraryActions.getItineraries),
      switchMap(() =>
        this.StoreService.getItenaries().pipe(
          first(),
          map((res) => ItineraryActions.getItinerariesSuccess({ itineraries: res })),
          catchError((error) => {
            console.error(error);
            return EMPTY;
          })
        )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private StoreService : ItineraryService
  ) {}
}
