import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user} from "@angular/fire/auth";
import { Router } from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  auth: Auth = inject(Auth);

  user$ = user(this.auth);

  constructor(
    private router: Router,
    private authentication: Auth
  ) {
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.authentication, email, password).then(()=>{
      this.router.navigate(['dashboard'])
    })
      .catch(()=>{
        return alert('Something went wrong please try signing-in with an existing account.');
      })
  }
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.authentication, email, password)
      .then(() => this.router.navigate(['sign-in']))
      .catch(() => {
        return window.alert('Oops an error has occured, Please try again using a valid email and password.');
      })
  }
  SignOut() {
    signOut(this.authentication)
      .then(()=>{
        this.router.navigate(['sign-in'])
      }).catch(() => {
      return window.alert('Oops an error has occured, please refresh your browser.');})
  }
  getUserData() {
    const userData = this.user$;
    return userData as Observable<any>;
  }
}
