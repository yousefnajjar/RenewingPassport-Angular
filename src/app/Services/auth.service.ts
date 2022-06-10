import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }
    url:any = 'http://localhost:56422/api/'


  userData: any = []

  get() {
    this.spinner.show()
    this.http.get(this.url+'Pr_Userlogin/').subscribe((res) => {
      this.userData = res
      this.spinner.hide()
    //  this.toastr.success('Data Retrived')

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  time: any = new Date((new Date()).valueOf());
  datepipe: DatePipe = new DatePipe('en-US')
  formattedDate: any
  register(body: any) {
    body.role_Id = 2;
    body.image = '';
    this.formattedDate = this.datepipe.transform(this.time, 'YYYY-MM-ddTHH:mm:ss')
    body.registrationtime = this.formattedDate
    this.spinner.show();
    this.http.post(this.url+'Pr_Userlogin/CreateUser/', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Your Account Created Successfully 🙂 ')

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }


  delete(id: number) {
    this.http.delete(this.url+'Pr_Userlogin/DeleteUser/'+id+'/').subscribe((res) => {
      this.toastr.success('Deleted Successfully 🙂 ')
    }, err => {
      this.toastr.error(err.message, err.status);
    })
  }


  Create(body:any){
    body.role_Id=2;
    body.image= '';
    this.formattedDate = this.datepipe.transform(this.time, 'YYYY-MM-ddTHH:mm:ss')
    body.registrationtime=this.formattedDate
    this.spinner.show();
    this.http.post(this.url+'Pr_Userlogin/CreateUser/', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Admin Created Successfully 🙂 ')
     
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    }) 
  }



  login(email:any, password:any){
    var body = {
      email: email.value.toString(),
      password: password.value.toString(),
    };
    const headerDir = {
      'Content-Type': 'application/json',
       Accept: 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDir),
    };

    this.http.post(this.url+'jwt/', body, requestOptions).subscribe((res:any)=>{
      const responce = {
        token: res.toString(),
      };
      localStorage.setItem('token', responce.token);
      let data: any = jwt_decode(responce.token);

   
          localStorage.setItem('user', JSON.stringify({ ...data }));
          if (data.role == 'Admin') this.router.navigate(['admin/dashboard']);
          else if (data.role == 'User')
          this.router.navigate(['home']);
        },
        (err) => {
          this.router.navigate(['security/login']);
          this.toastr.error('Invalid Email or Password');
        }
      );

  }

}
