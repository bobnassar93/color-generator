import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { CommonService } from '../services/common.service';
import { InfoComponent } from './info/info.component';

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
  previousColors = [];

  constructor(private alertController: AlertController,
    private platform: Platform, private popoverController: PopoverController,
    private cmv: CommonService) {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Shortcuts',
      message: `
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-1'>CTRL + S</kbd> To Shuffle Colors</p>
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-2'>CTRL + C</kbd> To Copy RGB Code</p>
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-3'>CTRL + X</kbd> To Copy HEX Code</p>
      <p class='ion-text-left'>Use <kbd class='shortcut shortcut-4'>CTRL + Z</kbd> To Undo Color</p>
      `,
      buttons: ['Got it!']
    });

    await alert.present();

    await alert.onDidDismiss().then(() => {
      if (this.isDesktop === true) {
        if ((localStorage.firstTime === 'false') || (localStorage.firstTime === undefined)) {
          localStorage.firstTime = 'true';

          //const popOverArrow = document.querySelector('.popover-arrow') as HTMLElement;
          //const popOverContent = document.querySelector('.popover-content') as HTMLElement;
          //const ionInfoIcon = document.querySelector('#info');
          //popOverArrow.style.display = 'block !important';
          //popOverContent.style.display = 'block !important';
          //this.presentPopover();

        }
      }
    });;
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: InfoComponent,
      translucent: false,
      animated: true,
      mode: 'ios'
    });

    await popover.present();
  }

  ngOnInit(): void {
    document.body.classList.toggle('dark', true);

    this.hex = this.rgbaToHex();

    document.addEventListener('keydown', (ev: KeyboardEvent) => {

      if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 's')) {
        this.randomize();
        ev.preventDefault();
      } else if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 'c')) {
        this.copyRGB();
      } else if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 'x')) {
        this.copyHex();
      } else if ((ev.ctrlKey === true) && (ev.key.toLowerCase() === 'z')) {
        this.undo();
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
    this.cmv.copy(`rgba(${this.r},${this.g},${this.b}, ${this.a})`, '(R, G, B, A) copied to clipboard!');
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
    this.setpreviousColor();

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
    this.cmv.copy(this.rgbaToHex(), '#HEX copied to clipboard!');
  }

  undo() {

    if (this.previousColors.length > 0) {
      this.r = this.extractRGB('r', this.previousColors[this.previousColors.length - 1]);
      this.g = this.extractRGB('g', this.previousColors[this.previousColors.length - 1]);
      this.b = this.extractRGB('b', this.previousColors[this.previousColors.length - 1]);
      this.a = this.extractRGB('a', this.previousColors[this.previousColors.length - 1]);

      this.hex = this.rgbaToHex();

      this.previousColors.pop();
    }
  }

  extractRGB(color, from) {
    switch (color) {
      case 'r':
        return Number(from.replace('rgba', '').replace('(', '').replace(')', '').split(',')[0].trim());
      case 'g':
        return Number(from.replace('rgba', '').replace('(', '').replace(')', '').split(',')[1].trim());
      case 'b':
        return Number(from.replace('rgba', '').replace('(', '').replace(')', '').split(',')[2].trim());
      case 'a':
        return Number(from.replace('rgba', '').replace('(', '').replace(')', '').split(',')[3].trim());
    }
  }

  setpreviousColor() {
    this.previousColors.push(`rgba(${this.r},${this.g},${this.b}, ${this.a})`);
  }
}
