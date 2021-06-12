import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-color-generator',
  templateUrl: './color-generator.page.html',
  styleUrls: ['./color-generator.page.scss'],
})
export class ColorGeneratorPage implements OnInit {
  folder: string;
  r = 0;
  g = 0;
  b = 0;
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

  expandCollapseContainer(){
    const footer = document.querySelector('ion-footer');

    if(this.isExpended === true){
      this.isExpended = false;
      this.icon = 'chevron-up';

      footer.style.height = '0';
    }else{
      this.isExpended = true;
      this.icon = 'chevron-down';
      footer.style.height = '178px';
    }
  }

  async copyToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(`rgba(${this.r},${this.g},${this.b}, ${this.a})`).then(()=>{
      this.presentToast();
    });
  }
}
