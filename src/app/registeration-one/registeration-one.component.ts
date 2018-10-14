import { CustomValidation } from './../validation/custom-validation';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registeration-one',
  templateUrl: './registeration-one.component.html',
  styleUrls: ['./registeration-one.component.scss']
})
export class RegisterationOneComponent implements OnInit {
  registerationForm: FormGroup;
  isLoading = false ;
  isPasswordUpdated = false;
  errorsBooleanDefault = false ;
  formFields = {
    'emailField': '',
    'passwordField': ''
  };


  formErrorsCheck = {

    'reguired': false,
    'minlength': false,
    'smallChar': false,
    'capitalChar': false,
    'number': false,
    'specialChar': false,
  };

  validationMessages = {
    'emailField': {
      'reguired': 'Email address is required',
      'email': 'Invalid email format'
    },
    'passwordField': {
      'reguired': 'password is required',
      'minlength': 'password should be at least 8 charecters',
      'smallChar': 'at least one small char',
      'capitalChar': 'at least one capital char',
      'number': 'at least one number digit',
      'specialChar': 'at least one special char'
    }
  };
  constructor( private formBuilder: FormBuilder) {
    this.createRegisterationForm();
  }

  ngOnInit() {
  }

  createRegisterationForm(): void {
    this.registerationForm = this.formBuilder.group({
      emailField: ['', [Validators.required, Validators.email]],
      passwordField: ['', [
        Validators.required, Validators.minLength(8),
        CustomValidation.regexValidation( new RegExp('(?=.*[a-z])'), {'smallChar': 'smallChar'}),
        CustomValidation.regexValidation( new RegExp('(?=.*[A-Z])'), {'capitalChar': 'capitalChar'}),
        CustomValidation.regexValidation( new RegExp('(?=.*[0-9])'), {'number': 'number'}),
        CustomValidation.regexValidation( new RegExp('(?=.*[$@$!%#*?& ])'), {'specialChar': 'specialChar'})
      ]
    ]} );

    this.registerationForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any): void {


    if (!this.registerationForm) {return; }
    if ( this.registerationForm.get('passwordField').value !== '') {
      this.isPasswordUpdated = true; // to show check list for password and it will be reset after submit or reload page 
    }


    const form = this.registerationForm;

    // tslint:disable-next-line:forin
    for (const tempKey in this.formErrorsCheck) {
      this.formErrorsCheck[tempKey] = this.getPasswordDefaultBool();
    }

    // tslint:disable-next-line:forin
    for (const field in this.formFields) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
            this.formErrorsCheck[key] = true;
        }
      }
    }

}
getPasswordDefaultBool(): boolean {
  return  (this.registerationForm.get('passwordField').value === '' &&  this.isPasswordUpdated);
}
onSubmit(): void {
 alert('submitted');
  this.resetForm();
}
resetForm(): void {
  this.registerationForm .reset({
    emailField: '',
    passwordField: ''
  });
  this.isPasswordUpdated = false;
  this.errorsBooleanDefault = false ;
}
}
