import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'color-generator',
    pathMatch: 'full'
  },
  {
    path: 'color-generator',
    loadChildren: () => import('./color-generator/color-generator.module').then( m => m.ColorGeneratorPageModule)
  },  {
    path: 'shadow-box',
    loadChildren: () => import('./shadow-box/shadow-box.module').then( m => m.ShadowBoxPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
