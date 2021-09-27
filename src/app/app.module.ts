import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShadowBoxPageModule } from './shadow-box/shadow-box.module';
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ShadowBoxPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CommonService],
  bootstrap: [AppComponent],
})
export class AppModule { }
