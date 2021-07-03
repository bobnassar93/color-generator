import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShadowBoxPageRoutingModule } from './shadow-box-routing.module';

import { ShadowBoxPage } from './shadow-box.page';
import { ButtonComponent } from './button/button.component';
import { DivComponent } from './div/div.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShadowBoxPageRoutingModule,
  ],
  declarations: [ShadowBoxPage, ButtonComponent, DivComponent]
})
export class ShadowBoxPageModule {}
