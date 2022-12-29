import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from "@capacitor/preferences";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_path: string = "https://sman1purwokerto.sch.id/api_siperpus/";

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  async ifLoggedIn() {
    const ambilNIS = await Preferences.get({ key: 'NIS' });
    if (ambilNIS && ambilNIS.value) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    Preferences.remove({ key: 'NAMA' });
    Preferences.remove({ key: 'JENIS' });
    this.router.navigateByUrl('/login');
    return Preferences.remove({ key: 'NIS' });
  }
}
