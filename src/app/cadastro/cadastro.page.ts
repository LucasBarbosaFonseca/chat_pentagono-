import { Usuarios } from './../../Models/Usuarios';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  usuario:Usuarios
  constructor(public fbauth:AngularFireAuth, public fbstore:AngularFirestore, 
    public alertController: AlertController, public router:Router) {
    this.usuario = new Usuarios()
  }

  ngOnInit() {
  }

  CadastrarUsuario() {

    this.fbauth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha).then
    (result=>{

      let users = this.fbstore.collection("Usuarios")

      users.add({

        nome:this.usuario.nome,
        email:this.usuario.email,
        senha:this.usuario.senha,
        userid: result.user.uid

      }).then(async()=>{

        const alert = await this.alertController.create({
          header: 'Sucesso',
          subHeader: '',
          message: 'Usuário cadastrado com sucesso!',
          buttons: ['OK']
        });
    
        await alert.present();

        this.fbauth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha).then
        (()=>{

          this.router.navigate(['/home'])

        })



      }).catch(async()=>{

        const alert = await this.alertController.create({
          header: 'Erro',
          subHeader: '',
          message: 'Erro ao cadastrar o usuário!',
          buttons: ['OK']
        });
    
        await alert.present();

      })

    })

  }

}
