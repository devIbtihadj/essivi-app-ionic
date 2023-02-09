import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliverymapPage } from './deliverymap.page';

const routes: Routes = [
  {
    path: '',
    component: DeliverymapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliverymapPageRoutingModule {}
