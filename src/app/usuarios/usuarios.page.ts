import { Component, OnInit, NgModule } from '@angular/core';
import { Usuarios } from 'src/Models/Usuarios';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  listausuarios:Usuarios[] = []

  constructor(public fbauth:AngularFireAuth, public fbstore:AngularFirestore, 
    public alertController: AlertController, public router:Router) { }

  ngOnInit() {

    this.ListarUsuarios()

  }


  ListarUsuarios() {

    this.fbauth.authState.subscribe(user=>{

      if (user) {      
        
        let users = this.fbstore.collection("Usuarios")

        users.ref.where("userid", ">", user.uid).get().then(result=>{

          result.forEach(element => {
            
            let usuario = new Usuarios()
    
            usuario.nome = element.data().nome
            usuario.email = element.data().email
            usuario.userid = element.id
    
            this.listausuarios.push(usuario)
    
          });

        users.ref.where("userid", "<", user.uid).get().then(result=>{

          result.forEach(element => {
              
            let usuario = new Usuarios()
      
            usuario.nome = element.data().nome
            usuario.email = element.data().email
            usuario.userid = element.id
      
            this.listausuarios.push(usuario)
      
          });

        })

        })
    
          console.log(this.listausuarios)
  
      }
      
    })

  }



  IrParaMensagens(userid) {

    this.router.navigate(['/mensagens/' + userid])

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
