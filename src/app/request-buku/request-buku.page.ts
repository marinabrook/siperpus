import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { AlertController, ToastController, LoadingController, ModalController } from "@ionic/angular";
import { DetailReqbukPage } from '../modals/detail-reqbuk/detail-reqbuk.page';
import { FormReqbukPage } from '../modals/form-reqbuk/form-reqbuk.page';
import { Preferences } from "@capacitor/preferences";
@Component({
  selector: 'app-request-buku',
  templateUrl: './request-buku.page.html',
  styleUrls: ['./request-buku.page.scss'],
})
export class RequestBukuPage implements OnInit {

  nis: any;
  judul: any;
  pengarang: any;
  alasan: any;
  listreqbuk: any = [];
  temp_judul: string;

  constructor(
    private _apiService: ApiService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.getAllReqbuk();
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async getAllReqbuk() {
    const ambilNIS = await Preferences.get({ key: 'NIS' });
    this.nis = ambilNIS.value;
    console.log(this.nis);
    this._apiService.getAllReqbuk(this.nis).subscribe((res: any) => {
      let data = JSON.parse(res);
      if (data['status'] == 1) { // JIKA HASIL SUCCESS
        console.log(data['message']);
        this.listreqbuk = data['data'];
      } else { // JIKA HASIL ERROR

        this.presentToast("Error");

      }

    }, (error: any) => {
      console.log("ERROR ===", error);
    })
  }

  // addReqbuk() {
  //   let data = {
  //     nis: this.nis,
  //     judul: this.judul,
  //     pengarang: this.pengarang,
  //     alasan: this.alasan
  //   }

  //   this._apiService.addReqbuk(data).subscribe((res: any) => {
  //     console.log("SUCCESS ===", res);
  //     this.nis = '';
  //     this.judul = '';
  //     this.pengarang = '';
  //     this.alasan = '';
  //     alert('SUCCESS');
  //     this.getAllReqbuk();
  //   }, (error: any) => {
  //     console.log("ERROR ===", error);
  //     alert('ERROR');
  //   })
  // }

  // deleteReqbuk(id_request_buku) {
  //   this._apiService.deleteReqbuk(id_request_buku).subscribe((res: any) => {
  //     console.log("SUCCESS ===", res);
  //     this.getAllReqbuk();
  //   }, (error: any) => {
  //     console.log("ERROR ===", error);
  //   })
  // }

  // FUNCTION CONFIRM DELETE NOTE
  async deleteNote(i) {
    this.temp_judul = this.listreqbuk[i]['judul'];
    // MEMBUAT ALERT PROMPT
    const alert = await this.alertCtrl.create({
      header: 'Delete',
      message: `Hapus ${this.temp_judul} ?`,
      buttons: [
        {
          text: "Tidak"
        },
        {
          text: "Iya",
          role: "iya"
        }
      ]
    });

    // RUNNING ALERT
    await alert.present();

    // SETELAH ALERT DITUTUP
    await alert.onDidDismiss().then(res => {
      if (res.role == "iya") { // JIKA BUTTON YANG DITEKAN = "IYA"
        this.prosesDelete(i);
      }
    });
  }

  // FUNCTION ACTION DELETE NOTE
  async prosesDelete(i) {
    // MEMBUAT LOADING
    const loading = await this.loadCtrl.create({
      message: 'Please wait'
    });

    // TAMPILKAN LOADING
    await loading.present();

    // MENGIRIM ID NOTE YANG INGIN DIHAPUS KE API
    this._apiService.deleteReqbuk(this.listreqbuk[i]["id_request_buku"]).subscribe(
      res => {

        this.listreqbuk.splice(i, 1); // HAPUS DATA NOTE DARI ARRAY

        // SEMBUNYIKAN LOADING
        loading.dismiss();
      },
      err => {
        console.log(err.error)

        // SEMBUNYIKAN LOADING
        loading.dismiss();
      }
    );
    // TAMPILKAN PESAN
    this.presentToast(`${this.temp_judul} berhasil dihapus`);
  }

  refreshPage(event) {
    console.log('Begin async operation');
    this.getAllReqbuk();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async modalDetail(i) {
    const modal = await this.modalCtrl.create({
      component: DetailReqbukPage,
      componentProps: {
        dataReqbuk: this.listreqbuk[i]
      }
    });

    return await modal.present();
  }

  async modalFormReqbuk(i = null) {
    let data = i == null ? null : this.listreqbuk[i];

    const modal = await this.modalCtrl.create({
      component: FormReqbukPage,
      componentProps: {
        nisinput: this.nis,
        dataReqbuk: data
      },
    });

    // KETIKA MODAL DI TUTUP
    modal.onWillDismiss().then(dataReturned => {

      if (dataReturned.role == "add") { // JIKA DIDAPAT DARI ADD DATA

        // this.listreqbuk.unshift(dataReturned.data);
        this.listreqbuk.push(dataReturned.data);

      } else if (dataReturned.role == "edit") { // JIKA DIDAPAT DARI EDIT DATA

        this.listreqbuk[i] = dataReturned.data

      }

    });

    return await modal.present();
  }
}
