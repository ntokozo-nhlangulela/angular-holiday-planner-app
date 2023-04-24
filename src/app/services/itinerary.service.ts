import {inject, Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {Trip} from "../models/trip";
import {collection, collectionData, Firestore, getDocs, query, updateDoc, where} from "@angular/fire/firestore";
import {Itinerary} from "../models/itinenary";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ItenaryService {
  private itenariesCollection: AngularFirestoreCollection<Itinerary>;
  private itenaries: Observable<Itinerary[]>;
  private itenaryDoc!: AngularFirestoreDocument<Itinerary>;
  fire = inject(Firestore)
  constructor(private firestore: AngularFirestore, private router: Router) {
    this.itenariesCollection = firestore.collection('itenary');
    this.itenaries = this.itenariesCollection.valueChanges({ idField: 'id' });
  }

  getItenaries(): Observable<Itinerary[]> {
    return this.itenaries;
  }

  getItenaryById(itenaryId: string): Observable<Itinerary[]> {
    const tripRef = collection(this.fire, "itenary")
    const tripQuery = query(tripRef, where("itineraryId", '==' , itenaryId))
    return collectionData(tripQuery) as Observable<Itinerary[]>
  }

  async updateItenary(itenaryId: string, data: Itinerary): Promise<void> {
    const tripsRef = collection(this.fire, 'itenary');
    const tripQuery = query(tripsRef, where('itineraryId', '==', itenaryId));
    const querySnapshot = await getDocs(tripQuery);
    if (querySnapshot.empty) {
      throw new Error(`No iternary found with ID ${itenaryId}`);
    }
    const tripDocRef = querySnapshot.docs[0].ref;
    await updateDoc(tripDocRef, {
      itineraryName:data.itineraryName,
      itineraryStartTime: data.itineraryStartTime,
      itineraryCost:data.itineraryCost,
      tag: data.tag,
      itineraryStartLocation:data.itineraryStartLocation,
      itineraryEndLocation: data.itineraryEndLocation,
      notes:data.notes,

    });

    this.router.navigate(['dashboard'])
  }

  deleteItinerary(ItineraryId: string | undefined): Promise<void> {
    this.itenaryDoc = this.firestore.collection('itenary').doc(ItineraryId);
    return this.itenaryDoc.delete();
  }
  addItenary(data: Itinerary) {
    return new Promise<Itinerary>((resolve, reject) => {
      this.firestore
        .collection("itenary")
        .add(data)
        .then(res => { }, err => reject(err));
    }).catch(()=>{
      console.error('Unable to add itenary')
    })

  }
}
