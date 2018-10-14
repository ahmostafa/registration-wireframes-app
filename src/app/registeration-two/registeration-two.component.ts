import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
// tslint:disable-next-line:import-spacing
import  * as zxcvbn   from 'zxcvbn';

@Component({
  selector: 'app-registeration-two',
  templateUrl: './registeration-two.component.html',
  styleUrls: ['./registeration-two.component.scss']
})
export class RegisterationTwoComponent implements OnInit {
  private colors = ['#DDD'/* gray default*/, '#F00'/*red */,  '#FF0'/**yellow */, '#0F0'/**dark green */];
  private strengthTest = ['Invalid', 'Week', 'medium', 'Strong'];
  barLabel = '';
  bar0: string;
  bar1: string;
  bar2: string;

  registerationForm: FormGroup;
  isLoading = false ;
  passwordStrength = 0;
  formFields = {
    'emailField': '',
    'passwordField': ''
  };
  constructor(private formBuilder: FormBuilder) {
    this.createRegisterationForm();
   }

  ngOnInit() {
  }
  createRegisterationForm(): void {
    this.registerationForm = this.formBuilder.group({
      emailField: ['', [Validators.required, Validators.email]],
      passwordField: ['', [Validators.required, Validators.minLength(8),
        this.passwordStrenghtValidation(  {'strength': 'strength'})
      ]
    ]} );

    this.registerationForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }


  passwordStrenghtValidation( error: ValidationErrors, minimumStrength = 2): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      this.passwordStrength = this.getPasswordStrength(control.value);
      console.log(`Strength = ${this.passwordStrength}`);
      return this.passwordStrength >= minimumStrength ? null : error;
     } ;
  }


  getPasswordStrength(password: string): number {
    const est = zxcvbn(password || '');
    const result = est.score;
    return result;
  }

  onValueChanged(data?: any): void {

    if (!this.registerationForm) {return; }

    this.updateStrengthMeter();

}

updateStrengthMeter(): void {
  this.setStrengthBarColor(3 , this.colors[0]);
if ( this.passwordStrength < 2) {
    this.barLabel = this.strengthTest[0];
 } else if ( this.passwordStrength < 3 ) {
    this.setStrengthBarColor(1, this.colors[1]);
    this.barLabel = this.strengthTest[1];
 } else if ( this.passwordStrength < 4 ) {
  this.setStrengthBarColor(2, this.colors[2]);
  this.barLabel = this.strengthTest[2];
 } else  {
  this.setStrengthBarColor(3, this.colors[3]);
  this.barLabel = this.strengthTest[3];
 }
}

setStrengthBarColor(barsCount: number, color: string): void {
  for (let _n = 0; _n < barsCount; _n++) {
    this['bar' + _n] = color;
}
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
this.barLabel = '';
this.passwordStrength = 0;
this.updateStrengthMeter();
   }
}
