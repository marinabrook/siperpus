import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormReqbukPageRoutingModule } from './form-reqbuk-routing.module';

import { FormReqbukPage } from './form-reqbuk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormReqbukPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FormReqbukPage]
})
export class FormReqbukPageModule { }
