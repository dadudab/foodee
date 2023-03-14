import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, throwError } from 'rxjs';
import { AuthResponse, AuthService } from '../auth.service';
import { User, UserRegistrationData } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  error?: string;

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get firstName() {
    return this.registrationForm.controls.firstName;
  }

  get lastName() {
    return this.registrationForm.controls.lastName;
  }

  get city() {
    return this.registrationForm.controls.city;
  }

  get address() {
    return this.registrationForm.controls.address;
  }

  get postalCode() {
    return this.registrationForm.controls.postalCode;
  }

  get phoneNumber() {
    return this.registrationForm.controls.phoneNumber;
  }

  get email() {
    return this.registrationForm.controls.email;
  }

  get password() {
    return this.registrationForm.controls.password;
  }

  onSubmit() {
    if (!this.registrationForm.valid) return;
    this.error = '';

    const newUser: UserRegistrationData = this.createRegistrationUserData(
      this.registrationForm
    );

    this.authService
      .registerUser(newUser)
      .pipe(
        map((res: HttpResponse<AuthResponse>) => {
          this.router.navigate(['/menu']);
        }),
        catchError((error) => {
          this.error = error;
          return of();
        })
      )
      .subscribe();
  }

  createRegistrationUserData(form: any): UserRegistrationData {
    return {
      firstName: form.controls.firstName.value,
      lastName: form.controls.lastName.value,
      city: form.controls.city.value,
      address: form.controls.address.value,
      postalCode: form.controls.postalCode.value,
      phoneNumber: form.controls.phoneNumber.value,
      email: form.controls.email.value,
      password: form.controls.password.value,
    };
  }
}
