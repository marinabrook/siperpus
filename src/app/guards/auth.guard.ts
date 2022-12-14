import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { filter, map, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    public toastCtrl: ToastController) { }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          this.presentToast('Silahkan Login terlebih dahulu');
          return false;
        }
      })
    );
  }
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }
}
