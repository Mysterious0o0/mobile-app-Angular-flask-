import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertStringService {

  constructor(private alertController: AlertController) {
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: '警告',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async successAlert(message: string) {
    const alert = await this.alertController.create({
      header: '通知',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
