import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormReqbukPage } from './form-reqbuk.page';

const routes: Routes = [
  {
    path: '',
    component: FormReqbukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormReqbukPageRoutingModule {}
