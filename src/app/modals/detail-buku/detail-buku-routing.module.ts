import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBukuPage } from './detail-buku.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBukuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBukuPageRoutingModule {}
