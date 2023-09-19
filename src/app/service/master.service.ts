import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private id: number = 1;
  constructor(private http: HttpClient) {}
  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }
  Getmedrep() {
    return this.http.get('http://www.spocorder.somee.com/api/User/MedRep', { withCredentials: true });
  }
  Getmedrepbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/User/All-MedRep/GetByCode?Code=' +
        code
        , { withCredentials: true }
    );
  }
  Getdm() {
    return this.http.get('http://www.spocorder.somee.com/api/User/DM', { withCredentials: true });
  }
  GetPharmacyByCon(id: any) {
    return this.http.get(`http://www.spocorder.somee.com/api/Pharmacy/FillterByCountry/${id}`, { withCredentials: true });
  }
  getdmbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/dm/GetByCode?Code=' + code
      , { withCredentials: true }
    );
  }

  Getcountry() {
    return this.http.get('http://www.spocorder.somee.com/api/Country' , { withCredentials: true });
  }
  Getcountrybycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Country/GetByCode?Code=' + code
      , { withCredentials: true }
    );
  }
  GetAddress() {
    return this.http.get(`http://www.spocorder.somee.com/api/Branch` , { withCredentials: true });
  }
  GetAddressFillter(dis_code:any,countrycode:any) {
    return this.http.get(`http://www.spocorder.somee.com/api/Branch/fillter/${dis_code}/${countrycode}`, { withCredentials: true });
  }
  GetAddressbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Branch/GetByCode?Code=' + code
      , { withCredentials: true }
    );
  }
  GetPharmacy() {
    return this.http.get('http://www.spocorder.somee.com/api/Pharmacy', { withCredentials: true });
  }
  GetPharmacybycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Pharmacy/GetByCode?Code=' + code
      , { withCredentials: true }
    );
  }
  GetCustomer() {
    return this.http.get('http://www.spocorder.somee.com/api/Distributor', { withCredentials: true });
  }
  GetCustomerbycode(code: any) {
    return this.http.get(
      'http://www.spocorder.somee.com/api/Distributor/GetByCode?Code=' + code
      , { withCredentials: true }
    );
  }
  GetProducts() {
    return this.http.get('http://www.spocorder.somee.com/api/Product', { withCredentials: true });
  }
  GetProductbycode(code: any) {
    return this.http.get('http://www.spocorder.somee.com/api/Product/' + code, { withCredentials: true });
  }

  GetAllInvoice() {
    return this.http.get('http://www.spocorder.somee.com/api/Order',{ withCredentials: true });
  }

  GetInvHeaderbycode(invoiceno: any) {
    return this.http.get(
      'https://localhost:4200/Invoice/GetAllHeaderbyCode?invoiceno=' + invoiceno
    );
  }
  GetInvDetailbycode(invoiceno: any) {
    return this.http.get(
      'https://localhost:4200/Invoice/GetAllDetailbyCode?invoiceno=' + invoiceno
    );
  }
  RemoveInvoice(invoiceno: any) {
    return this.http.delete( `http://www.spocorder.somee.com/api/Order/${invoiceno}`, { withCredentials: true } );
  }

  SaveInvoice(invoicedata: any) {
    return this.http.post(
      'http://www.spocorder.somee.com/api/Order',
      invoicedata
      , { withCredentials: true }
    );
  }

  Onlogin(logindata: any) {
    return this.http.post(
      'http://www.spocorder.somee.com/api/User/o2login',
      logindata
      , { withCredentials: true }
    );
  }

  GenerateInvoicePDF(invoiceno: any) {
    return this.http.get(
      'https://localhost:4200/Invoice/generatepdf?InvoiceNo=' + invoiceno,
      { observe: 'response', responseType: 'blob' }
    );
  }
}
