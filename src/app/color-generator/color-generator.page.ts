import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-color-generator',
  templateUrl: './color-generator.page.html',
  styleUrls: ['./color-generator.page.scss'],
})
export class ColorGeneratorPage implements OnInit {
  folder: string;
  r = 127;
  g = 127;
  b = 127;
  a = 1;
  icon = 'chevron-down';
  isExpended = true;

  constructor(public toastController: ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Copied to clipbaord',
      duration: 2000,
      animated: true,
      color: 'light'
    });
    toast.present();
  }

  ngOnInit() {
  }

  expandCollapseContainer() {
    const footer = document.querySelector('ion-footer');
    const headers = document.querySelectorAll('ion-header');

    if (this.isExpended === true) {
      this.isExpended = false;
      this.icon = 'chevron-up';

      footer.style.height = '0';

      headers.forEach(header => {
        header.style.top = '-200px';
      });

    } else {
      this.isExpended = true;
      this.icon = 'chevron-down';
      footer.style.height = '178px';

      headers.forEach(header => {
        header.style.top = '0';
      });
    }
  }

  async copyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(`rgba(${this.r},${this.g},${this.b}, ${this.a})`).then(() => {
      this.presentToast();
    });
  }

  checkNumberLimit(ev) {

    switch (ev.target.name) {
      case 'r':
        if (Number(ev.target.value) > 255) {
          this.r = 255;
          //ev.target.value = '255';
        } else if (Number(ev.target.value) < 0) {
          ev.target.value = 0;
        }
        break;
      case 'g':
        if (Number(ev.target.value) > 255) {
          this.g = 255;
          ev.target.value = 255;
        } else if (Number(ev.target.value) < 0) {
          ev.target.value = 0;
        }
        break;
      case 'b':
        if (Number(ev.target.value) > 255) {
          this.b = 255;
          ev.target.value = 255;
        } else if (Number(ev.target.value) < 0) {
          ev.target.value = 0;
        }
        break;
      case 'a':
        if (Number(ev.target.value) > 255) {
          this.a = 255;
          ev.target.value = 1;
        } else if (Number(ev.target.value) < 0) {
          ev.target.value = 0;
        }
        break;
    }
  }

  setValue(element: HTMLInputElement, colorVar){

  }
}
