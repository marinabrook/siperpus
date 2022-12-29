import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_path: string = "https://sman1purwokerto.sch.id/api_siperpus/";

  // http://localhost/siperpus/
  // 192.168.181.134/siperpus/
  // https://sman1purwokerto.sch.id/api_siperpus/

  constructor(
    public http: HttpClient
  ) { }

  //test network
  testnet() {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get('https://reqres.in/api/users/2', { headers: reqHeader, responseType: 'text' });
  }

  getAllReqbuk(nis) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.base_path + 'getReqbuk.php?nis=' + nis, { headers: reqHeader, responseType: 'text' });
  }

  getSingleReqbuk(id_request_buku) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.base_path + 'getSingleReqbuk.php?id_request_buku=' + id_request_buku, { headers: reqHeader, responseType: 'text' });
  }

  addReqbuk(data) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.base_path + 'createReqbuk.php', data, { headers: reqHeader, responseType: 'text' });
  }

  updateReqbuk(id_request_buku, data) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.base_path + 'updateReqbuk.php?id_request_buku=' + id_request_buku, data, { headers: reqHeader, responseType: 'text' });
  }

  deleteReqbuk(id_request_buku) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.base_path + 'deleteReqbuk.php?id_request_buku=' + id_request_buku, { headers: reqHeader, responseType: 'text' });
  }

  login(data) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.base_path + 'login.php', data, { headers: reqHeader, responseType: 'text' });
  }

  getAllBuku() {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.base_path + 'getBuku.php', { headers: reqHeader, responseType: 'text' });
  }

  getSingleBuku(id_buku) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.base_path + 'getSingleBuku.php?id_buku=' + id_buku, { headers: reqHeader, responseType: 'text' });
  }

  getAllLoan(nis) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.base_path + 'getLoan.php?nis=' + nis, { headers: reqHeader, responseType: 'text' });
  }
}
