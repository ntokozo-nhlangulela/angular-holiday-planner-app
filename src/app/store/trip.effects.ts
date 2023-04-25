import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, first, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as TripsActions from '../store/trip.actions';
import { TripService } from '../services/trip.service';

@Injectable()
export class TripsEffects {
  tripsTrips$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TripsActions.getTrips),
      switchMap(() =>
        this.StoreService.getItineraries().pipe(
          first(),
          map((res) => TripsActions.getTripsSuccess({ trips: res })),
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
    private StoreService : TripService
  ) {}
}
