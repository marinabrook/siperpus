import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BukuPageRoutingModule } from './buku-routing.module';

import { BukuPage } from './buku.page';
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BukuPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BukuPage]
})
export class BukuPageModule { }
