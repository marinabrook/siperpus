import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestBukuPageRoutingModule } from './request-buku-routing.module';

import { RequestBukuPage } from './request-buku.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestBukuPageRoutingModule,
  ],
  declarations: [RequestBukuPage]
})
export class RequestBukuPageModule { }
