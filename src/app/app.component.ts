import { Component, OnInit } from '@angular/core';

import { SubscribeForm } from './object/form';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { forbiddenNameValidator, validNameValidator } from './shared/user-name.validator';
import { platform } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
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

  subscribeForm: SubscribeForm = new SubscribeForm();

  email = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);

  color: string;

  constructor(private fb: FormBuilder){}

  // een alternatief voor de bovenstaande registrationform
  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/), validNameValidator]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

  ngOnInit(){
    this.color = sessionStorage.getItem("colorValue");
    if(sessionStorage.length > 0){
      sessionStorage.removeItem("subscriber");
    }
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getRandomColor() {
    for(let i = 0; i < 500; i++){
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.color = color;
      await this.delay(3);
    }
    this.saveColor();
  }
  
  get userName(){
    return this.registrationForm.get('userName');
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
