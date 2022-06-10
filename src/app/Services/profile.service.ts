import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profileData: any = {}
  display_Image:any
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  url:any = 'http://localhost:56422/api/'


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
      console.log(this.profileData);
      console.log(res);

      this.spinner.hide();
      //this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }


  updatePassword(body: any) {
    if (body.oldpassword == this.profileData.password) {
      body.user_Id = this.profileData.user_Id
      this.spinner.show()
      this.http.put(this.url+'Pr_Userlogin/UpdatePassword/', body).subscribe((res) => {
        this.spinner.hide()
        this.toastr.success("Updated Successfully :)")
      }, err => {
        this.spinner.hide()
        this.toastr.error(err.status, err.massege)
      })
    }
    else
    this.toastr.error(" Old password not correct :)")
  }
  

  uploadAttachment(file:FormData){
    
    this.http.post(this.url+'Pr_Userlogin/UploadUserImage/',file)
    .subscribe((res:any)=>{
      this.display_Image=res.image;    
      this.toastr.success("Image Updated :)")  
    },err=>{
      this.toastr.error(err.status,err.message);
    })
    
    setTimeout(() => {
      var body:any={}
    body=this.profileData
    body.image=this.display_Image
    this.http.put(this.url+'Pr_Userlogin/UpdatUser',body).subscribe((res)=>
     {
       this.spinner.hide()
       this.toastr.success("Updated Successfully :)")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })
    }, 3000);
    
  }


  updateinfo(body:any){

    body.user_Id=this.profileData.user_Id
    body.registrationtime=this.profileData.registrationtime
    body.image=this.profileData.image
    body.password=this.profileData.password
    body.role_Id=this.profileData.role_Id
    this.http.put(this.url+'Pr_Userlogin/UpdatUser/',body).subscribe((res)=>
     {
       this.spinner.hide()
       this.toastr.success("Updated Successfully :)")
     },err=>{
       this.spinner.hide()
       this.toastr.error(err.massege,err.status)
     })
    

  }


 
  
      
  

}
