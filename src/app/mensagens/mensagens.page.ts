import { Mensagens } from './../../Models/Mensagens';
import { Usuarios } from './../../Models/Usuarios';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.page.html',
  styleUrls: ['./mensagens.page.scss'],
})
export class MensagensPage implements OnInit {

  usuarioMsgPara:string
  mensagem:Mensagens
  usuarioMsgDe:string
  lista:Observable<Mensagens[]>
  listamensagens:Observable<Mensagens[]>

  constructor(public fbauth:AngularFireAuth, public acrroute:ActivatedRoute, 
    public fbstore:AngularFirestore) { 

    this.mensagem = new Mensagens()

    this.acrroute.paramMap.subscribe((params:ParamMap)=>{

      this.usuarioMsgPara = params.get("id")
      
    })

    this.VerificarLogin()
    this.ListarMensagens()

  }

  ngOnInit() {
  }



  ListarMensagens() {

    this.lista = this.fbstore.collection<Mensagens>("Mensagens", ref=>{

      return ref

    }).valueChanges()

    this.lista.subscribe(res=>{

      this.FiltrarLista(res)

    })

  }



  FiltrarLista(res) {

    this.listamensagens = res.filter(t=>(t.de==this.usuarioMsgDe && t.para==this.usuarioMsgPara) || (t.para==this.usuarioMsgDe && t.de==this.usuarioMsgPara))

  }



  EnviarMensagem(texto) {

    this.mensagem.de = this.usuarioMsgDe
    this.mensagem.para = this.usuarioMsgPara
    this.mensagem.data = new Date()

    let mensagens = this.fbstore.collection("Mensagens")

    mensagens.add({

      de:this.mensagem.de,
      para:this.mensagem.para,
      texto:this.mensagem.texto,
      data:this.mensagem.data

    })

  }

  

  VerificarLogin() {

    this.fbauth.authState.subscribe(user=>{

      if (user) {      
        
        this.usuarioMsgDe = user.uid
       
      }
      else {

        console.log("Não autenticado")

      }
      
    })

  }


}
