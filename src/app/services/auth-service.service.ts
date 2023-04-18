import { Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {



  constructor(
    private router: Router,
    private authentication: Auth
  ) {

  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.authentication, email, password)
      //ToDo add route to change to homepage.
      .catch(()=>{
        return window.alert('Oops an error has occured');
      })
  }
  // Sign up with email/password
  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.authentication, email, password)
      .then(() => this.router.navigate(['sign-in'])) //change to login
      .catch(() => {
        return window.alert('Oops an error has occured');
      })
  }
  // Sign out
  SignOut() {
    signOut(this.authentication)
      .then(()=>{
        this.router.navigate(['sign-in'])
      })
  }
}
