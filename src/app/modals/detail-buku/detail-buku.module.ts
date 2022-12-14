import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBukuPageRoutingModule } from './detail-buku-routing.module';

import { DetailBukuPage } from './detail-buku.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBukuPageRoutingModule
  ],
  declarations: [DetailBukuPage]
})
export class DetailBukuPageModule {}
