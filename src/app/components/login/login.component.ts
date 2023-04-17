import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  isLoading: boolean = false;
  isForgotPassword = false;
  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private authService: AuthService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')]],
    });
  }

  get email(): AbstractControl<any, any> {
    return this.form.get('email')!;
  }

  get password(): AbstractControl<any, any> {
    return this.form.get('password')!;
  }

  async onSubmit() {
    this.isLoading = true;
    if (this.form.valid) {
      console.log(this.form.value.email);
      await this.authService.SignIn(this.form.value.email, this.form.value.password).then(() => {
        alert("Logged in Successfully");
        this.isLoading = false;
      }).catch(() => {
        this.isLoading = true;
        alert("Failed to login")
      })

      this.bsModalRef.hide();

    }
    console.log(this.authService.isLoggedIn)
  }

  toggle() {
    this.isForgotPassword = !this.isForgotPassword;
  }
  forgotPassword() {
    this.isLoading = true;
    this.authService.ForgotPassword('ntokozodlamini5@gmail.com').then(() => {
      this.isLoading = false;
    }).catch(() => {
      this.isLoading = true;

    });

    this.bsModalRef.hide();
  }
}
