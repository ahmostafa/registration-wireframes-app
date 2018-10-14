import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationTwoComponent } from './registeration-two.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
describe('RegisterationTwoComponent', () => {
  let component: RegisterationTwoComponent;
  let fixture: ComponentFixture<RegisterationTwoComponent>;

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
      declarations: [ RegisterationTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('password aA!@ strength is 1', () => {
    expect(component.getPasswordStrength('aA!@')).toBe(1);
  });
  it('password aA!@dA$ strength is 2', () => {
    expect(component.getPasswordStrength('aA!@dA$')).toBe(2);
  });
  it('password aA!@dA$FG strength is 3', () => {
    expect(component.getPasswordStrength('aA!@dA$FG')).toBe(3);
  });
  it('password aA!@dA$FG*^ strength is 4', () => {
    expect(component.getPasswordStrength('aA!@dA$FG*^')).toBe(4);
  });
});
