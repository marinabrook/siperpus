import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-buku',
  templateUrl: './detail-buku.page.html',
  styleUrls: ['./detail-buku.page.scss'],
})
export class DetailBukuPage implements OnInit {

  @Input() public dataBuku: any

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  async closeModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
