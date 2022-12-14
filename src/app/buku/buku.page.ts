import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { DetailBukuPage } from '../modals/detail-buku/detail-buku.page';

@Component({
  selector: 'app-buku',
  templateUrl: './buku.page.html',
  styleUrls: ['./buku.page.scss'],
})
export class BukuPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  searchTerm: string;
  books: any = [];
  dataBuku: any;

  maxBooks: number = 12;
  bookList: any = [];

  constructor(
    private _apiService: ApiService,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public modalCtrl: ModalController,
    public menuCtrl: MenuController
  ) {
    this.bookList = this.books.slice(0, this.maxBooks);
  }


  ngOnInit() {
    this.menuCtrl.enable(true);
    this.getAllBuku();
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async getAllBuku() {
    const loading = await this.loadCtrl.create({
      message: 'Please wait'
    });

    await loading.present();
    this._apiService.getAllBuku().subscribe((res: any) => {
      let data = JSON.parse(res);
      if (data['status'] == 1) { // JIKA HASIL SUCCESS
        console.log(data['message']);
        this.books = data['data'];
        this.bookList = this.books.slice(0, this.maxBooks);
        loading.dismiss();
      } else { // JIKA HASIL ERROR

        this.presentToast("Error");

        loading.dismiss();
      }

    }, (error: any) => {
      console.log("ERROR ===", error);
      loading.dismiss();
    })
  }

  refreshPage(event) {
    console.log('Begin async operation');
    this.infiniteScroll.disabled = false;
    this.getAllBuku();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async modalDetail(i) {
    this._apiService.getSingleBuku(i).subscribe(async (res: any) => {
      let data = JSON.parse(res);
      if (data['status'] == 1) { // JIKA HASIL SUCCESS
        console.log(data['message']);
        this.dataBuku = data['data'];
        const modal = await this.modalCtrl.create({
          component: DetailBukuPage,
          componentProps: {
            dataBuku: this.dataBuku[0]
          }
        });

        return await modal.present();
      } else { // JIKA HASIL ERROR

        console.log("ERROR");

      }

    }, (error: any) => {
      console.log("ERROR ===", error);
    })

  }

  loadData(event) {
    setTimeout(() => {
      this.maxBooks += 12;
      this.bookList = this.books.slice(0, this.maxBooks);
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.bookList.length == this.books.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  onInput(event) {
    this.bookList = this.books;
    this.infiniteScroll.disabled = true;
  }
}
