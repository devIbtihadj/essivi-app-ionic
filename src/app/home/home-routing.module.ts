import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from '../guards/security.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path: 'commande', canActivate: [SecurityGuard],
        loadChildren: () => import('../pages/commande/commande.module').then( m => m.CommandePageModule)
      },
      {
        path: 'profil', canActivate: [SecurityGuard],
        loadChildren: () => import('../pages/profil/profil.module').then( m => m.ProfilPageModule)
      },
      {
        path: 'livraison', canActivate: [SecurityGuard],
        loadChildren: () => import('../pages/livraison/livraison.module').then( m => m.LivraisonPageModule)
      },
      {
        path: 'dashboard', canActivate: [SecurityGuard],
        loadChildren: () => import('../pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'client', canActivate: [SecurityGuard],
        loadChildren: () => import('../pages/client/client.module').then( m => m.ClientPageModule)
      },
      {
        path: 'detail/:id', canActivate: [SecurityGuard],
        loadChildren: () => import('../pages/detail/detail.module').then( m => m.DetailPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
