import {inject, Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Trip} from "../models/trip";
import {
  collection,
  collectionData,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class TripService {
  fire = inject(Firestore)
  private tripsCollection: AngularFirestoreCollection<Trip>;
  private trips: Observable<Trip[]>;
  private tripsDoc!: AngularFirestoreDocument<Trip>;

  constructor(private firestore: AngularFirestore, private router: Router) {

    this.tripsCollection = firestore.collection('Trips');
    this.trips = this.tripsCollection.valueChanges({ idField: 'id' });
  }

  getTrips(): Observable<Trip[]> {
    return this.trips;
  }
  getTripById(tripId: string): Observable<Trip[]> {
   const tripRef = collection(this.fire, "Trips")
    const tripQuery = query(tripRef, where("tripId", '==' , tripId))
    return collectionData(tripQuery) as Observable<Trip[]>
  }

  async updateTrip(tripId: string, data: Trip): Promise<void> {
    const tripsRef = collection(this.fire, 'Trips');
    const tripQuery = query(tripsRef, where('tripId', '==', tripId));
    const querySnapshot = await getDocs(tripQuery);
    if (querySnapshot.empty) {
      throw new Error(`No trip found with ID ${tripId}`);
    }
    const tripDocRef = querySnapshot.docs[0].ref;
    await updateDoc(tripDocRef, {
      tripName:data.tripName,
      departure: data.departure,
      returnDate: data.returnDate,
      description:data.description
    });
    this.router.navigate(['dashboard'])
}
  deleteTrip(tripId: string | undefined): Promise<void> {
    this.tripsDoc = this.firestore.collection('Trips').doc(tripId);
    return this.tripsDoc.delete();
  }
  addTrip(data: Trip) {
    return new Promise<Trip>((resolve, reject) => {
      this.firestore
        .collection("Trips")
        .add(data)
        .then(res => { }, err => reject(err));
    }).then(()=>{
      this.router.navigate(['dashboard'])
    })

  }
}
