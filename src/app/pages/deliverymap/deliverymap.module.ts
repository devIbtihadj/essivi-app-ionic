import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliverymapPageRoutingModule } from './deliverymap-routing.module';

import { DeliverymapPage } from './deliverymap.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliverymapPageRoutingModule,
    RouterModule
  ],
  declarations: [DeliverymapPage]
})
export class DeliverymapPageModule {}
