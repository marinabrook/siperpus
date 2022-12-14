import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailReqbukPageRoutingModule } from './detail-reqbuk-routing.module';

import { DetailReqbukPage } from './detail-reqbuk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailReqbukPageRoutingModule
  ],
  declarations: [DetailReqbukPage]
})
export class DetailReqbukPageModule {}
