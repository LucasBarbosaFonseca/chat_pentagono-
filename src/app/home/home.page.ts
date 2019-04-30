import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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


  Logout() {

    async()=>{
      const alert = await this.alertController.create({
        header: 'Confirmar!',
        message: '<strong>Tem certeza que deseja sair do chat?</strong>',
        buttons: [
          {
            text: 'Cancear',
            role: 'Cancelar',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Ok',
            handler: () => {
              this.fbauth.auth.signOut()
              this.router.navigate(['/home'])
            }
          }
        ]
      });

      await alert.present();

    }

  }

}
