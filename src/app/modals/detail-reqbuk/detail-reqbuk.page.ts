import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-detail-reqbuk',
  templateUrl: './detail-reqbuk.page.html',
  styleUrls: ['./detail-reqbuk.page.scss'],
})
export class DetailReqbukPage implements OnInit {

  @Input() public dataReqbuk: any

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async closeModal(data) {
    await this.modalCtrl.dismiss(data);
  }

}
