import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-shadow-box',
  templateUrl: './shadow-box.page.html',
  styleUrls: ['./shadow-box.page.scss'],
})
export class ShadowBoxPage implements OnInit {

  colors = [
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
    'light',
    'medium',
    'dark',
  ];

  index = -1;
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

  //#region Shadow Box
  inset = false;
  hOffset = 0;
  vOffset = 5;
  blur = 15;
  spread = 0;
  shadowColor = '#000000';
  shadowOpacity = 1;
  boxShadowString = `${this.inset ? 'inset' : ''} 
  ${this.hOffset}px ${this.vOffset}px ${this.blur}px ${this.spread}px 
  ${this.shadowColor}${Math.round(this.shadowOpacity * 255).toString(16)}`;
  //#endregion

  constructor() { }

  ngOnInit(): void {
    document.body.classList.toggle('dark', false);
  }

  onComponentChange(element): void {
    this.component = element.value;
  }
  changeBtnSize(value: string): void {
    this.size = value;
  }

  toggleMode(element): void {
    document.body.classList.toggle('dark', element.checked);
  }

  updateShadowBox(): void {
    this.boxShadowString = `${this.inset ? 'inset' : ''} 
    ${this.hOffset}px ${this.vOffset}px ${this.blur}px ${this.spread}px 
    ${this.shadowColor}${Math.round(this.shadowOpacity * 255).toString(16)}`;
  }

  cycleBtnColor(): void {
    ++this.index;
    this.color = this.getNextArrayItem(this.colors);
  }

  getNextArrayItem(_array: string[]): string {
    if (this.index === _array.length) {
      this.index = 0;
      return _array[this.index];
    } else {
      return _array[this.index];
    }
  }
}
