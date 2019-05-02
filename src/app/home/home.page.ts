import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public fbauth:AngularFireAuth, public fbstore:AngularFirestore, 
    public alertController: AlertController, public router:Router) {


    this.fbauth.authState.subscribe(user=>{

      if (user) {      
        console.log("Autenticado: " + user.uid)
      }
      else {
        console.log("Não autenticado")
      }

    })

  }


  async Logout() {

      const alert = await this.alertController.create({
        header: 'Confirmar!',
        message: '<p>Tem certeza que deseja sair do aplicativo?</p>',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancelar',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Saída cancelada');
            }
          }, {
            text: 'Ok',
            handler: () => {
              this.fbauth.auth.signOut()
              this.router.navigate(['/home']) 
              console.log('Não autenticado');
            }
          }
        ]
      });
  
      await alert.present();

  }

}
