import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-loan',
  templateUrl: './detail-loan.page.html',
  styleUrls: ['./detail-loan.page.scss'],
})
export class DetailLoanPage implements OnInit {

  @Input() public dataLoan: any

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async closeModal(data) {
    await this.modalCtrl.dismiss(data);
  }
}
