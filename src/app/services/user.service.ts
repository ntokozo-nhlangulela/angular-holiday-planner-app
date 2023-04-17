import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root',
})

export class UserService {
    private UserCollection: AngularFirestoreCollection<any>;
    private Users: Observable<any[]>;
    private UserDoc!: AngularFirestoreDocument<any>;
    constructor(private firestore: AngularFirestore) {
        this.UserCollection = firestore.collection('user');
        this.Users = this.UserCollection.valueChanges({ email: 'email' });
    }
    addUser(data: any) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection("user")
                .add(data)
                .then(res => { }, err => reject(err));
        });
    }
    getUserByEmail(email: string): Observable<any> {
        return this.UserCollection.doc(email).valueChanges({ email: 'email' });
    }
    getUsers(): Observable<any[]> {
        return this.Users;
    }
}