import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

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
    if(!this.registrationForm.valid) return;

    console.log(this.registrationForm.value);
  }
}
