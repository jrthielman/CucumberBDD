import { Component, OnInit } from '@angular/core';

import { SubscribeForm } from './object/form';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  subscribeForm: SubscribeForm = new SubscribeForm();

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  color: string;;

  ngOnInit(){
    this.color = sessionStorage.getItem("colorValue");
    if(sessionStorage.length > 0){
      let subscriber = JSON.parse(sessionStorage.getItem("subscriber"));
      sessionStorage.removeItem("subscriber");
    }
  }

  saveColor(){
    sessionStorage.setItem("colorValue", this.color);
  }

  resetColor(){
    sessionStorage.clear();
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
