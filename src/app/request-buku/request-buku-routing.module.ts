import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestBukuPage } from './request-buku.page';

const routes: Routes = [
  {
    path: '',
    component: RequestBukuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestBukuPageRoutingModule {}
