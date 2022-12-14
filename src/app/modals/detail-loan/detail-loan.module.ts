import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailLoanPageRoutingModule } from './detail-loan-routing.module';

import { DetailLoanPage } from './detail-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailLoanPageRoutingModule
  ],
  declarations: [DetailLoanPage]
})
export class DetailLoanPageModule {}
