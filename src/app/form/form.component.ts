import { Component, OnInit } from '@angular/core';

import { SubscribeForm } from '../object/form';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  subscribeForm: SubscribeForm = new SubscribeForm();

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
    if(sessionStorage.length > 0){
      sessionStorage.removeItem("subscriber");
    }   
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter your e-mail' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getFirstNameErrorMessage() {
    return 'You must enter your first name';
  }

  getSurnameErrorMessage() {
    return 'You must enter your surname';
  }

  submit(){
    if(this.email.valid){
      sessionStorage.setItem("subscriber", JSON.stringify(this.subscribeForm));
      window.location.reload();
    }
  }

}
