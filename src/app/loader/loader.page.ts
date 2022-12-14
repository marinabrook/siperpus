import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      this.auth.ifLoggedIn;
      if (this.auth.isAuthenticated) {
        this.router.navigate(['buku']);
      } else {
        this.router.navigate(['login']);
      }
    }, 2000);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
