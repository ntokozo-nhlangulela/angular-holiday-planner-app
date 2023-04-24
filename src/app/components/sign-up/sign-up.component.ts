import { Component} from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    password : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required])
  })

  submitForm(): void {
    const email: string = this.signUpForm.get('email')?.value ?? ''
    const password: string = this.signUpForm.get('password')?.value ?? ''
    if(this.signUpForm.valid){
      this.authService.signUp(email, password)

    }
  }

  constructor( private authService: AuthServiceService) {}

}
