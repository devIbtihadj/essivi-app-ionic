import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: 'commande',
        loadChildren: () => import('../pages/commande/commande.module').then( m => m.CommandePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../pages/profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: 'livraison',
        loadChildren: () => import('../pages/livraison/livraison.module').then( m => m.LivraisonPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
