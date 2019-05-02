import { Usuarios } from './../../Models/Usuarios';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuarios
  constructor(public fbauth:AngularFireAuth, public alertController: AlertController, 
    public router:Router) { 

      this.usuario = new Usuarios()

    }

  ngOnInit() {
  }


  LoginUsuario() {

    this.fbauth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then
    (async()=>{

      this.router.navigate(['/home'])

      const alert = await this.alertController.create({
        header: 'Sucesso',
        subHeader: '',
        message: 'Usuário Logado!',
        buttons: ['OK']
      });
  
      await alert.present();

    }).catch(async()=>{

      const alert = await this.alertController.create({
        header: 'Erro',
        subHeader: '',
        message: 'Impossível logar o usuário!',
        buttons: ['OK']
      });
  
      await alert.present();

    })

  }

}
