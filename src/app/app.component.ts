import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  color: string;

  constructor(){}

  ngOnInit(){
    this.color = sessionStorage.getItem("colorValue"); 
  }

  private delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getRandomColor() {
    for(let i = 0; i < 50; i++){
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      this.color = color;
      await this.delay(50);
    }
    this.saveColor();
  }

  saveColor(){
    sessionStorage.setItem("colorValue", this.color);
  }

  resetColor(){
    sessionStorage.clear();
    this.color = "";
  }
}
