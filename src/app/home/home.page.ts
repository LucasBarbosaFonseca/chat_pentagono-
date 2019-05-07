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
        
        this.router.navigateByUrl('usuarios')
      }
      
    })

  }
  

}
