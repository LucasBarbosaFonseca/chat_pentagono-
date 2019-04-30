import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

var config = {
  apiKey: "AIzaSyBdUaPSW--v0Y9xAlNB5-apGLORrELaiKk",
  authDomain: "chatpentagono.firebaseapp.com",
  databaseURL: "https://chatpentagono.firebaseio.com",
  projectId: "chatpentagono",
  storageBucket: "chatpentagono.appspot.com",
  messagingSenderId: "709804091056"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AngularFireAuthModule, AngularFirestoreModule, AppRoutingModule, AngularFireModule.initializeApp(config)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
