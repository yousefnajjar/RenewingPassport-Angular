import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  reviewData: any = []
  avragwData: any = {}
  url:any = 'http://localhost:56422/api/'

  get() {
    this.spinner.show();
    this.http.get(this.url+'Pr_Review/GetALLReview').subscribe((result) => {
      this.reviewData=result
      this.spinner.hide()
    //  this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }


  getavrage() {
    this.spinner.show();
    this.http.get(this.url+'Pr_Review/Getavrage').subscribe((result) => {
      this.avragwData=result
      this.spinner.hide()
     // this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }



  create(body: any) {
    body.website_Id = 4
    this.spinner.show()
    this.http.post(this.url+'Pr_Review/CreateReview', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Thank You For Rating Our Service')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }







}
