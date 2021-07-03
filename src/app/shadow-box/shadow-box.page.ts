import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-shadow-box',
  templateUrl: './shadow-box.page.html',
  styleUrls: ['./shadow-box.page.scss'],
})
export class ShadowBoxPage implements OnInit {

  //#region IonContent
  background = true;
  //#endregion

  //#region Button Input Properties
  component = 'btn';
  text = 'Click me';
  style = '';
  class = '';
  color = 'dark';
  size = 'default';
  radius = 30;
  //#endregion

  constructor() { }

  ngOnInit(): void {
    document.body.classList.toggle('dark', false);
  }

  onComponentChange(element): void {
    this.component = element.value;
  }
  changeBtnSize(element): void {
    this.size = element.value;
  }

  toggleMode(element){
    document.body.classList.toggle('dark', element.checked);
  }
}
