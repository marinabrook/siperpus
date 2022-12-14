import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailLoanPage } from './detail-loan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailLoanPageRoutingModule {}
