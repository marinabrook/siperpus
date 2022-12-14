import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Preferences } from "@capacitor/preferences";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  nis: string;
  nama: string;
  jenis: string;
  kelas: string;
  tahun: string;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  async logout() {
    await this.auth.logout();
  }

  ionViewWillEnter() {
    this.getnamajenis();
  }

  async getnamajenis() {
    const ambilnis = await Preferences.get({ key: 'NIS' });
    this.nis = ambilnis.value;
    const ambilnama = await Preferences.get({ key: 'NAMA' });
    this.nama = ambilnama.value;
    const ambiljenis = await Preferences.get({ key: 'JENIS' });
    this.jenis = ambiljenis.value;
    const ambilkelas = await Preferences.get({ key: 'KELAS' });
    this.kelas = ambilkelas.value;
    const ambiltahun = await Preferences.get({ key: 'TAHUN' });
    this.tahun = ambiltahun.value;
  }
}
