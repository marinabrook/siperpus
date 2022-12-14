import { Component, OnInit } from '@angular/core';
import { ApiService } from "src/app/api.service";
import { AlertController, MenuController, ModalController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AppState } from '../store/AppState';
import { Store } from '@ngrx/store';
import { Preferences } from "@capacitor/preferences";
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LupaPage } from '../modals/lupa/lupa.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nis: number;
  pass: any;
  user: any;

  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private _apiService: ApiService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router,
    private auth: AuthService,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nis: ['', [Validators.required, Validators.minLength(6)]],
      pass: ['', [Validators.required]]
    })
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  login() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      //test network
      // this._apiService.testnet().subscribe((res: any) => {
      //   let respon = JSON.parse(res);
      //   this.presentToast(respon['data']['first_name']);
      // })

      let data = {
        nis: this.ionicForm.get('nis').value,
        pass: this.ionicForm.get('pass').value
      }
      this._apiService.login(data).subscribe((res: any) => {
        let respon = JSON.parse(res);
        if (respon['status'] == 1) {
          this.user = respon['data'];
          this.presentToast(respon['message'] + this.user['nama']);

          Preferences.set({
            key: 'NIS',
            value: this.user['nis'],
          });
          Preferences.set({
            key: 'NAMA',
            value: this.user['nama'],
          });
          Preferences.set({
            key: 'JENIS',
            value: this.user['jenis'],
          });
          Preferences.set({
            key: 'KELAS',
            value: this.user['nama_kelas'],
          });
          Preferences.set({
            key: 'TAHUN',
            value: this.user['thn_ajar'],
          });
          this.auth.isAuthenticated.next(true);

          this.router.navigate(['buku']);
          this.menuCtrl.enable(true);
        } else {
          if (respon['message']) {
            this.presentToast(respon['message']);
          } else {
            this.presentToast('Periksa Koneksi Kamu')
          }
        }
      })
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  async modalLupa() {
    const modal = await this.modalCtrl.create({
      component: LupaPage,
      componentProps: {}
    });

    return await modal.present();

  }
}

