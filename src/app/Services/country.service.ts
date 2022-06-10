import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  url: any = 'http://localhost:56422/api/'
  countryData: any = [];
  countryTypedData: any = [];
  display_Image: any
  selectrdCountry: any = {}
  get() {
    this.spinner.show()
    this.http.get(this.url + 'Pr_country').subscribe((res) => {
      this.countryData = res;
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.massege, err.status)
    })
  }

  create(body: any) {
    this.spinner.show()
    body.countryImage = this.display_Image
    this.http.post(this.url + 'Pr_country', body).subscribe((res) => {
      this.spinner.hide()
      this.toastr.success("Created Successfully :)")
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.massege, err.status)
    })

  }
  update(body: any) {
    debugger
    body.countryImage = this.display_Image
    this.spinner.show()
    this.http.put(this.url + 'Pr_country/', body).subscribe((res) => {
      this.spinner.hide()
      this.toastr.success("Updated Successfully :)")
    }, err => {
      this.spinner.hide()
      this.toastr.error(err.massege, err.status)
    })

  }
  uploadAttachment(file: FormData) {
    this.http.post(this.url + 'Pr_country/UploadImage/', file)
      .subscribe((res: any) => {
        this.display_Image = res.countryImage;
      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }
  delete(id: number) {
    this.http.delete(this.url + 'Pr_country/delete/' + id + '/').subscribe((res) => {
      this.toastr.success('Deleted Successfully :) ')
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }, err => {
      this.toastr.error(err.message);
    })

  }


  profileData: any = {}


  getuser() {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    var body = {
      email: user.email.toString()
    };
    const headerDir = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };
    this.spinner.show()
    this.http.post(this.url + 'Pr_Userlogin/GetByEmail/', body, requestOptions).subscribe((res) => {
      this.profileData = res;
      console.log(this.profileData);
      console.log(res);

      this.spinner.hide();
      //this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }


   body:any
  getByType() {
    if (localStorage.getItem('token') == null) {
      this.body = {
        Type: ''
      };
    } 
    else {

       this.body = {
        Type: this.profileData.passport_Type
      };
      const headerDir = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const requestOptions = {
        headers: new HttpHeaders(headerDir),
      };
      if (this.body.Type=='d') {
       this.body.Type=''
      }

      this.spinner.show()
      this.http.post(this.url + 'Pr_country/getByType', this.body, requestOptions).subscribe((res) => {
        this.countryTypedData = res;
        this.spinner.hide()
      }, err => {
        this.spinner.hide()
        this.toastr.error(err.massege, err.status)
      })
    }

  }
}
