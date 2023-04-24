import { Component} from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {FormControl, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
   password: new FormControl('', [Validators.required,Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')])
})

  submitForm(): void {
    const email: string = this.signInForm.get('email')?.value ?? ''
    const password: string = this.signInForm.get('password')?.value ?? ''

   if(this.signInForm.valid){
    this.authService.signIn(email, password)
   }
  }

  constructor(private authService: AuthServiceService) {}


}
