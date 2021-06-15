import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-color-generator',
  templateUrl: './color-generator.page.html',
  styleUrls: ['./color-generator.page.scss'],
})
export class ColorGeneratorPage implements OnInit {

  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  a = 1;
  icon = 'chevron-down';
  isExpended = true;

  constructor(public toastController: ToastController) {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Color code copied to clipboard!',
      duration: 2000,
      animated: true,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

  ngOnInit() {
  }

  expandCollapseContainer(self) {
    const footer = document.querySelector('ion-footer');
    const header = document.querySelector('ion-header');

    if (this.isExpended === true) {
      this.isExpended = false;
      this.icon = 'chevron-up';

      footer.style.height = '0';
      header.style.top = `-${header.clientHeight}px`;

      self.el.classList.add('dimmed');
      footer.classList.add('dimmed');

    } else {
      this.isExpended = true;
      this.icon = 'chevron-down';
      footer.style.height = '178px';
      header.style.top = '0';

      footer.classList.remove('dimmed');
      self.el.classList.remove('dimmed');
    }
  }

  async copyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(`rgba(${this.r},${this.g},${this.b}, ${this.a})`).then(() => {
      this.presentToast();
    });
  }

  checkInputLimit(ev) {
    const element = ev.target;
    const value = Number(ev.target.value);

    setTimeout(() => {
      switch (element.name) {
        case 'r':
          if (value > 255) {
            this.r = 255;
          } else if (value < 0) {
            element.value = 0;
          }
          break;
        case 'g':
          if (value > 255) {
            this.g = 255;
          } else if (value < 0) {
            element.value = 0;
          }
          break;
        case 'b':
          if (value > 255) {
            this.b = 255;
          } else if (value < 0) {
            element.value = 0;
          }
          break;
        case 'a':
          if (value > 1) {
            this.a = 1;
          } else if (value < 0) {
            element.value = 0;
          }
          break;
      }
    }, 150);
  }

  randomize() {
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
  }
}
