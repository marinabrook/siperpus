import { Component, OnInit } from '@angular/core';
import { Preferences } from "@capacitor/preferences";
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { DetailLoanPage } from '../modals/detail-loan/detail-loan.page';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.page.html',
  styleUrls: ['./loan.page.scss'],
})
export class LoanPage implements OnInit {

  nis: any;
  listloan: any = [];

  constructor(
    private _apiService: ApiService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.getAllLoan();
  }

  ngOnInit() {
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async getAllLoan() {
    const ambilNIS = await Preferences.get({ key: 'NIS' });
    this.nis = ambilNIS.value;
    console.log(this.nis);
    this._apiService.getAllLoan(this.nis).subscribe((res: any) => {
      let data = JSON.parse(res);
      if (data['status'] == 1) { // JIKA HASIL SUCCESS
        console.log(data['message']);
        this.listloan = data['data'];
      } else { // JIKA HASIL ERROR

        this.presentToast("Error");

      }

    }, (error: any) => {
      console.log("ERROR ===", error);
    })
  }

  async modalDetail(i) {
    const modal = await this.modalCtrl.create({
      component: DetailLoanPage,
      componentProps: {
        dataLoan: this.listloan[i]
      }
    });

    return await modal.present();
  }

  refreshPage(event) {
    console.log('Begin async operation');
    this.getAllLoan();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
