import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { textonlyValidation } from 'src/validations/text-only-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')]],
      firstName: ['', [Validators.required, Validators.minLength(2), textonlyValidation()]],
      lastName: ['', [Validators.required, Validators.minLength(2), textonlyValidation()]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('^[+]?[0-9]+$')]],
    });

  }
  get firstName(): AbstractControl<any, any> {
    return this.form.get('firstName')!;
  }
  get lastName(): AbstractControl<any, any> {
    return this.form.get('lastName')!;
  }

  get email(): AbstractControl<any, any> {
    return this.form.get('email')!;
  }

  get phone(): AbstractControl<any, any> {
    return this.form.get('phone')!;
  }

  get password(): AbstractControl<any, any> {
    return this.form.get('password')!;
  }
  ngOnInit(): void {
    this.firstName.valueChanges
      .subscribe((x) => { console.log(x) });
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value.email);
      this.authService.SignUp(this.form.value.email, this.form.value.password).then(() => {
        alert("Logged in Successfully");

      }).catch(() => {
        alert("Failed to login")
      })
      let user = {
        userId: Math.random().toFixed(0),
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone
      }

      this.userService.addUser(user);
      this.authService.SendVerificationMail();
      this.bsModalRef.hide();
    }
  }

}
