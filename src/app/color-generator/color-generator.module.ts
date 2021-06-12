import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ColorGeneratorPage } from './color-generator.page';
import { ColorGeneratorPageRoutingModule } from './color-generator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorGeneratorPageRoutingModule
  ],
  declarations: [ColorGeneratorPage]
})
export class ColorGeneratorPageModule {}
