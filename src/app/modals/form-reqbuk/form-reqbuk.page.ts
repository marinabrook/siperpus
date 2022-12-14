import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, LoadingController } from "@ionic/angular";
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-reqbuk',
  templateUrl: './form-reqbuk.page.html',
  styleUrls: ['./form-reqbuk.page.scss'],
})
export class FormReqbukPage implements OnInit {
  reqbuk_form: FormGroup;
  @Input() public dataReqbuk: any;
  @Input() public nisinput: any;
  id_request_buku: number;
  nis: number;
  judul: String = "";
  pengarang: String = "";
  alasan: String = "";
  listreqbuk: any = [];

  constructor(
    private apiService: ApiService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    fb: FormBuilder
  ) {
    this.reqbuk_form = fb.group({
      'judul': [null, Validators.required],
      'pengarang': [null, Validators.required],
      'alasan': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.nis = this.nisinput;
    if (this.dataReqbuk === null) {
      this.id_request_buku = 0;
    } else {
      this.id_request_buku = this.dataReqbuk.id_request_buku;
      this.nis = this.dataReqbuk.nis;
      this.judul = this.dataReqbuk.judul;
      this.pengarang = this.dataReqbuk.pengarang;
      this.alasan = this.dataReqbuk.alasan;
      this.reqbuk_form.setValue({
        judul: this.judul,
        pengarang: this.pengarang,
        alasan: this.pengarang
      });
    }
  }

  async addReqbuk() {
    this.markFormTouched(this.reqbuk_form);
    if (this.reqbuk_form.valid) {
      let data = {
        nis: this.nis,
        judul: this.reqbuk_form.get('judul').value,
        pengarang: this.reqbuk_form.get('pengarang').value,
        alasan: this.reqbuk_form.get('alasan').value
      }

      const loading = await this.loadCtrl.create({
        message: 'Please wait'
      });

      await loading.present();

      await this.apiService.addReqbuk(data).subscribe(
        (res: any) => {
          console.log(res);
          this.closeModal({
            'nis': this.nis,
            'judul': this.reqbuk_form.get('judul').value,
            'pengarang': this.reqbuk_form.get('pengarang').value,
            'alasan': this.reqbuk_form.get('alasan').value,
          }, "add")

          this.presentToast("Berhasil tambah");

          loading.dismiss();
        },
        (error: any) => {
          console.log(error);

          loading.dismiss();
        }
      );

    } else {
      return false;
    }
  }

  async updateReqbuk(id_request_buku) {
    this.markFormTouched(this.reqbuk_form);
    if (this.reqbuk_form.valid) {
      let data = {
        nis: this.nis,
        judul: this.reqbuk_form.get('judul').value,
        pengarang: this.reqbuk_form.get('pengarang').value,
        alasan: this.reqbuk_form.get('alasan').value
      }

      const loading = await this.loadCtrl.create({
        message: 'Please wait'
      });

      await loading.present();

      await this.apiService.updateReqbuk(id_request_buku, data
      ).subscribe(
        res => {
          console.log(res);
          this.closeModal({
            'nis': this.nis,
            'judul': this.reqbuk_form.get('judul').value,
            'pengarang': this.reqbuk_form.get('pengarang').value,
            'alasan': this.reqbuk_form.get('alasan').value,
          }, "edit")


          this.presentToast("Berhasil edit");

          loading.dismiss();
        },
        err => {
          console.log(err);

          loading.dismiss();
        }
      );
    } else {
      return false;
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  //Tutup Modal
  async closeModal(data = null, role = null) {
    await this.modalCtrl.dismiss(data, role);
  }

  markFormTouched(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const control = group.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) { control.markAsTouched(); this.markFormTouched(control); }
      else { control.markAsTouched(); };
    });
  };


}
