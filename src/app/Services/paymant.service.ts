import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PaymantService {

  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  url: any = 'http://localhost:56422/api/'
  followUpdata:any=[] 
  sumation : any = {}

  get() {
    this.spinner.show()
    debugger
    this.http.get(this.url+'Pr_paymant').subscribe((res) => {
      this.followUpdata = res;
      this.spinner.hide();
     //this.toastr.success('Data Retieved 123!!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }
  getSum() {
    this.spinner.show()
    this.http.get(this.url+'Pr_Paymant/GetSum').subscribe((res) => {
      this.sumation = res;
      this.spinner.hide();
 //     this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }
}
