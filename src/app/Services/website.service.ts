import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  websiteData: any = {}
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  url: any = 'http://localhost:56422/api/'

  display_Image: any

  
  get() {
    this.spinner.show()
    this.http.get(this.url + 'pr_website/').subscribe((res) => {
      this.websiteData = res;
      this.spinner.hide()
      // this.toastr.success("Data Retrived")
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.massege, err.status)
    })
  }
  uploadAttachment(file: FormData) {
    this.http.post(this.url + 'pr_website/UploadWebImage/', file)
      .subscribe((res: any) => {
        this.display_Image = res.logo;
      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }

  update(body: any) {
    body.logo = this.display_Image
    this.spinner.show()
    this.http.put(this.url + 'pr_website/UpdateWebsite/', body).subscribe((res) => {
      this.spinner.hide()
      this.toastr.success("Updated Successfully :)")
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.massege, err.status)
    })

  }
}



