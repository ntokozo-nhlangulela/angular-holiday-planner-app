import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  constructor( private authService: AuthService, private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }
  get email(): AbstractControl<User, User> {
    return this.signUpForm.get('email')!;
  }
  get password(): AbstractControl<User, User> {
    return this.signUpForm.get('password')!;
  }
  submitForm(): void {
      const email: string = this.signUpForm.value.email;
      const password: string = this.signUpForm.value.password;
    if(this.signUpForm.valid){
      this.authService.signUp(email, password)
    }
  }
}
