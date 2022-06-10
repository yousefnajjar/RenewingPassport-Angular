import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  url:any = 'http://localhost:56422/api/'

  ContactData:any=[]

  get() {
    this.spinner.show();
    this.http.get(this.url+'Pr_contact_us/GetAllContact_Us').subscribe((result) => {
      this.ContactData = result;
      this.spinner.hide()
     // this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    }
    )
  }
  create(body:any){
    body.website_Id=4;
    this.spinner.show();
    this.http.post(this.url+'Pr_Contact_Us/CreateContact_Us/', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Thanks We Will Contact You ^_^ ')
     
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    }) 


  }

  delete(id :number){
    this.http.delete(this.url+'Pr_Contact_Us/DeleteContact_Us/'+id+'/').subscribe((res)=>{
      this.toastr.success('Deleted Successfully :) ')
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },err=>{
      this.toastr.error(err.message);
    })
   
  }

  sendContact(body: any){
    var body1 = {
      ToEmail: body.email,
      Username: body.name,
      Body: body.message
    }
    const headerDir = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDir)
    }
    this.http.post(this.url+'Mail/mailContact', body1, requestOptions).subscribe((res) => {
      this.toastr.success('Email sent Successfully')
      console.log('sent');

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status, err.message);
    })
  }
}
