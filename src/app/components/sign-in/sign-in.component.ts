import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

class AppState {
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private authService: AuthService, private store: Store<AppState>) {}
  signInForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')])
})

  submitForm(): void {
    const email: string = this.signInForm.get('email')?.value ?? ''
    const password: string = this.signInForm.get('password')?.value ?? ''
    this.store
   if(this.signInForm.valid){
    this.authService.signIn(email, password)
   }
  }
}
