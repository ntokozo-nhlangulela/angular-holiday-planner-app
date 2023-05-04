import {inject, Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {collection, collectionData, Firestore, getDocs, query, updateDoc, where} from "@angular/fire/firestore";
import {Itinerary} from "../models/itinenary";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private itineraryCollection: AngularFirestoreCollection<Itinerary>;
  private itineraries$: Observable<Itinerary[]>;
  private itineraryDoc!: AngularFirestoreDocument<Itinerary>;
  fire = inject(Firestore)
  constructor(private firestore: AngularFirestore, private router: Router) {
    this.itineraryCollection = firestore.collection('itenary');
    this.itineraries$ = this.itineraryCollection.valueChanges({ idField: 'id' });
  }
  addItinerary(data: Itinerary) {
    return new Promise<Itinerary>((resolve, reject) => {
      this.firestore
        .collection("itenary")
        .add(data)
        .then(res => { }, err => reject(err));
    }).catch(()=>{
      alert('Unable to add itenary')
    })
  }
  getItenaries(): Observable<Itinerary[]> {
    return this.itineraries$;
  }
  getItenaryById(itineraryId: string): Observable<Itinerary[]> {
    const itineraryRef = collection(this.fire, "itenary")
    const itineraryQuery = query(itineraryRef, where("itineraryId", '==' , itineraryId))
    return collectionData(itineraryQuery) as Observable<Itinerary[]>
  }
  async updateItenary(itineraryId: string, data: Itinerary): Promise<void> {
    const itineraryRef = collection(this.fire, 'itenary');
    const itineraryQuery = query(itineraryRef, where('itineraryId', '==', itineraryId));
    const querySnapshot = await getDocs(itineraryQuery);
    if (querySnapshot.empty) {
      throw new Error(`No itinerary found with ID ${itineraryId}`);
    }
    const itineraryDocRef = querySnapshot.docs[0].ref;
    await updateDoc(itineraryDocRef, {
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
  deleteItinerary(itineraryId: string | undefined): Promise<void> {
    this.itineraryDoc = this.firestore.collection('itenary').doc(itineraryId);
    return this.itineraryDoc.delete();
  }
}
