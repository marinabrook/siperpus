import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from "@angular/common";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { Network } from "@ionic-native/network/ngx";
import { IonicStorageModule } from "@ionic/storage-angular";
import { AppStoreModule } from './store/AppStoreModule';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { LoadingComponent } from './components/loading/loading.component';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AuthGuard } from './guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    ReactiveFormsModule
  ],
  providers: [Network, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
