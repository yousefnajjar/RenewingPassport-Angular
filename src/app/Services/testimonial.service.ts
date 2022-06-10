import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  display_Image:any
  testimonialData: any = []
  testimonialHomeData: any = []//1
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  @Input() testimonial_Id: number | undefined
  @Input() name: string | undefined
  @Input() imagepath: string | undefined
  @Input() feedback: string | undefined
  @Input() status: string | undefined
  @Input() website_Id: number | undefined

  url:any = 'http://localhost:56422/api/'

  getAllTestimonial() {
    this.spinner.show();
    this.http.get(this.url+'Pr_Testimonial').subscribe((tResult) => {
      this.testimonialData = tResult;
      this.spinner.hide();
     // this.toastr.success('Data Retieved !!')
      for (let index = 0; index < this.testimonialData.length; index++) {
        if (this.testimonialData[index].status != 'Pinding') {
          this.testimonialHomeData.push(this.testimonialData[index])  
        }
      }
    }, err => {
      //hide spinner 
      this.spinner.hide();
      //Toastr
      this.toastr.error(err.message);
      this.toastr.error(err.status);
    }

    )

  }


  profileData: any = {}

  get() {
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
    this.http.post(this.url+'Pr_Userlogin/GetByEmail/', body, requestOptions).subscribe((res) => {
      this.profileData = res;
      // console.log(this.profileData);
      // console.log(res);

      this.spinner.hide();
      //this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }

  delete(id: number) {
    this.http.delete(this.url+'Pr_Testimonial/delete/' + id).subscribe((res) => {
    this.toastr.success('Deleted Successfully :) ')
    setTimeout(() => {
      window.location.reload()
    }, 1000);
    }, err => {
      this.toastr.error(err.message);
    })

  }

  createTestimmonial(body: any) {
    body.status = 'Pinding'
    body.website_Id=4;
    this.spinner.show();
    body.imagepath=this.display_Image;
    this.http.post(this.url+'Pr_Testimonial/', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Saved Successfully :) ')
     
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    }) 
  }

  uploadAttachment(file:FormData){
    this.http.post(this.url+'Pr_Testimonial/UploadTestimonialImage/',file)
    .subscribe((res:any)=>{
      this.display_Image=res.imagepath;
      console.log(this.display_Image);
      
    },err=>{
      this.toastr.error(err.status,err.message);
    })
  }

  approve(body: any) {
    body.status = 'Approved'
    this.spinner.show()
    this.http.put(this.url+'Pr_Testimonial/UpdateTestimonial/', body).
    subscribe((res) => {

      this.spinner.hide()
      this.toastr.success('Approved Successfully')
    })
  }
}