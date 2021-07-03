import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadowBoxPage } from './shadow-box.page';

const routes: Routes = [
  {
    path: '',
    component: ShadowBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadowBoxPageRoutingModule {}
