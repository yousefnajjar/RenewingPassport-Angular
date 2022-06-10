import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  url:any = 'http://localhost:56422/api/'

  aboutData: any = {}

  get() {
    this.spinner.show();
    this.http.get(this.url+'Pr_About_Us/GetALLAboutus').subscribe((result) => {
      this.aboutData = result;
      this.spinner.hide()
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    }
    )
  }

  update(body:any){
    body.website_Id=4
    this.spinner.show()
     this.http.put(this.url+'Pr_About_Us/UpdateAboutUs/',body).subscribe((res)=>
     {
       this.spinner.hide()
       this.toastr.success("Updated Successfully :)")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })

  }

}
