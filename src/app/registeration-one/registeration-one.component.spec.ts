import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationOneComponent } from './registeration-one.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('RegisterationOneComponent', () => {
  let component: RegisterationOneComponent;
  let fixture: ComponentFixture<RegisterationOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
      ],
      declarations: [ RegisterationOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Password Ahmed is invalid password', () => {
    component.registerationForm.get('passwordField').setValue('Ahmed');
    expect(component.registerationForm.get('passwordField').invalid).toBe(true);
  });
  it('Password Aa1# is invalid password', () => {
    component.registerationForm.get('passwordField').setValue('Aa1#');
    expect(component.registerationForm.get('passwordField').invalid).toBe(true);
  });
  it('Password Aa1234#@ is valid password', () => {
    component.registerationForm.get('passwordField').setValue('Aa1234#@');
    expect(component.registerationForm.get('passwordField').invalid).toBe(false);
  });

  it('Password amma2d is invalid email', () => {
    component.registerationForm.get('emailField').setValue('amma2d');
    expect(component.registerationForm.get('emailField').invalid).toBe(true);
  });

  it('Password amma2d@asd.com is valid email', () => {
    component.registerationForm.get('emailField').setValue('amma2d@asd.com');
    expect(component.registerationForm.get('emailField').invalid).toBe(false);
  });

  it('Password amma2d@axd is valid email', () => {
    component.registerationForm.get('emailField').setValue('amma2d@axd');
    expect(component.registerationForm.get('emailField').invalid).toBe(false);
  });


});
