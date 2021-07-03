import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoComponent } from './color-generator/info/info.component';
import { ButtonComponent } from './shadow-box/button/button.component';
import { DivComponent } from './shadow-box/div/div.component';
import { ShadowBoxPageModule } from './shadow-box/shadow-box.module';

@NgModule({
  declarations: [AppComponent, InfoComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ShadowBoxPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
