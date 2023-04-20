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
  password : new FormControl('', [Validators.required]),
  email : new FormControl('', [Validators.required])
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
