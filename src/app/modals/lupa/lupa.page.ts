import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lupa',
  templateUrl: './lupa.page.html',
  styleUrls: ['./lupa.page.scss'],
})
export class LupaPage implements OnInit {

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
