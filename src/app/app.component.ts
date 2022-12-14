import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Daftar Buku', url: 'buku', icon: 'book' },
    { title: 'Peminjaman', url: 'loan', icon: 'receipt' },
    { title: 'Request Buku', url: 'request-buku', icon: 'bookmarks' },
    { title: 'Profil', url: 'profile', icon: 'person' }
  ];
  constructor(
    private auth: AuthService,
    private platform: Platform,
    private router: Router,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.router.url === '/login' || this.router.url === '/loader') {
        App.exitApp();
      }
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

}
