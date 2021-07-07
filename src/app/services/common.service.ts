import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastController: ToastController) { }

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

  async copy(whatToCopy: string, message: string) {
    await navigator.clipboard.writeText(whatToCopy).then(() => {
      this.presentToast(message);
    });
  }
}
