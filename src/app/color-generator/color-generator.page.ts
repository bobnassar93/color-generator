import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-color-generator',
  templateUrl: './color-generator.page.html',
  styleUrls: ['./color-generator.page.scss'],
})
export class ColorGeneratorPage implements OnInit {

  r = Math.floor(Math.random() * 256);
  g = Math.floor(Math.random() * 256);
  b = Math.floor(Math.random() * 256);
  hex = '';
  a = 1;
  icon = 'chevron-down';
  isExpended = true;
  isDesktop = false;

  constructor(public toastController: ToastController, public alertController: AlertController,
    public platform: Platform, public popoverController: PopoverController) {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Shortcuts',
      message: `
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-1'>CTRL + S</kbd> To Shuffle Colors</p>
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-2'>CTRL + C</kbd> To Copy RGB Code</p>
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-3'>CTRL + X</kbd> To Copy HEX Code</p>
      `,
      buttons: ['Got it!']
    });

    await alert.present();

    await alert.onDidDismiss().then(() =>{
      if(this.isDesktop === true){
        if ((localStorage.firstTime === 'false') || (localStorage.firstTime === undefined)) {
          localStorage.firstTime = 'true';
         // this.presentPopover();
        }
      }
    });;
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: 'To view shortcuts, press on the info icon',
      translucent: true,
      animated: true
    });
    await popover.present();
  }

  async presentToast(message) {

    const toast = await this.toastController.create({
      message,
      duration: 2500,
      animated: true,
      position: 'middle',
      translucent: true
    });

    toast.present();
  }

  ngOnInit() {
    this.hex = this.rgbaToHex();

    document.addEventListener('keydown', (ev: KeyboardEvent) => {

      if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 's')) {
        this.randomize();
        ev.preventDefault();
      } else if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 'c')) {
        this.copyRGB();
      } else if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 'x')) {
        this.copyHex();
      }
    });

    this.platform.platforms().map((e) => {
      if (e === 'desktop') {
        this.isDesktop = true;
        if ((localStorage.firstTime === 'false') || (localStorage.firstTime === undefined)) {
          this.presentAlert();
        }
      }
    });
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

  copyRGB() {
    this.copy(`rgba(${this.r},${this.g},${this.b}, ${this.a})`, '(R, G, B, A) copied to clipboard!');
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

  ionRangeChange() {
    this.hex = this.rgbaToHex();
  }

  rgbaToHex() {
    let hexR = this.r.toString(16);
    let hexG = this.g.toString(16);
    let hexB = this.b.toString(16);
    let hexA = Math.round(this.a * 255).toString(16);

    if (hexR.length === 1) {
      hexR = '0' + hexR;
    }
    if (hexG.length === 1) {
      hexG = '0' + hexG;
    }
    if (hexB.length === 1) {
      hexB = '0' + hexB;
    }
    if (hexA.length === 1) {
      hexA = '0' + hexA;
    }

    return '#' + hexR + hexG + hexB + hexA;
  }

  copyHex() {
    this.copy(this.rgbaToHex(), '#HEX copied to clipboard!');
  }

  async copy(whatToCopy: string, message: string) {
    await navigator.clipboard.writeText(whatToCopy).then(() => {
      this.presentToast(message);
    });
  }
}
