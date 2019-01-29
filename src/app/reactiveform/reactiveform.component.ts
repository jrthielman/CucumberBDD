import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { forbiddenNameValidator, validNameValidator } from '../shared/user-name.validator';
import { PasswordValidator } from '../shared/password.validator';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {

  // registrationForm = new FormGroup({
  //   userName: new FormControl("default"),
  //   password: new FormControl(""),
  //   confirmPassword: new FormControl(""),
  //   address: new FormGroup({
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     postalCode: new FormControl("")
  //   })
  // });

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // een alternatief voor de bovenstaande registrationform
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/), validNameValidator]],
      password: [''],
      confirmPassword: [''],
      subscribeEmail: this.fb.group({
        email: [''],
        alternateEmails: this.fb.array([]),
        subscribe: [false]
      }),
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribeEmail').get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('subscribeEmail').get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  get userName(){
    return this.registrationForm.get('userName');
  }

  get email2(){
    return this.registrationForm.get('subscribeEmail').get('email');
  }

  get alternateEmails(): FormArray{
    return this.registrationForm.get('subscribeEmail').get('alternateEmails') as FormArray;
  }

  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }

  removeEmail(emailIndex){
    this.alternateEmails.removeAt(emailIndex);
  }

  onSubmit(){
    // dit geeft alle waardes uit het formulier
    console.log(this.registrationForm.value);
  }
  
  loadApiData(): void{
    // je moet alles een waarde geven
    // this.registrationForm.setValue({
    //   userName: 'jus',
    //   password: 'rei',
    //   confirmPassword: 'za',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     postalCode: '123456'
    //   }
    // });

    // je hoeft niet alles een waarde te geven
    this.registrationForm.patchValue({
      userName: 'jus',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '123456'
      }
    });
  }

}
