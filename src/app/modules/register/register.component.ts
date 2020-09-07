import { Component, Injectable, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from './custom-validators';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [HttpClientModule]
})
export class RegisterComponent {
  public frmSignup: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        full_name: [
          null,
          Validators.compose([Validators.required])
        ],
        org: [
          null,
          Validators.compose([Validators.required])
        ],
        user_type: [
          null,
          Validators.compose([Validators.required])
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            CustomValidators.patternValidator(/[A-Z]/, {
              hasUpperCase: true
            }),
            CustomValidators.patternValidator(/[a-z]/, {
              hasLowerCase: true
            }),
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() {
    this.frmSignup.valueChanges.subscribe(console.log);
    var registrationData = this.frmSignup.value
    console.log(registrationData)
    this.http.post("http://127.0.0.1:5000/register", registrationData)
      .subscribe((result) => {
        console.warn("result", result)
      })

  }
}