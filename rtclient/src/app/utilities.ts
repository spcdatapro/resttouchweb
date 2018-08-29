import { AlertController } from '@ionic/angular';

const alertCtrl = new AlertController();

export async function presentAlert({
    header,
    subHeader,
    message,
    buttons
}) {
    const alert = await alertCtrl.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: buttons
    });
    await alert.present();
}
