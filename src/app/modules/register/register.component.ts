import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public frmSignup: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }
    
}
