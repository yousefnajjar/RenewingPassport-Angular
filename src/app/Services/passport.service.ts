import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { leadingComment } from '@angular/compiler';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

    url:any = 'http://localhost:56422/api/'
  passportData: any = []
  passportpindingData: any = []
  singlePassport:any={}
  get() {
    this.spinner.show()
    this.http.get(this.url+'Pr_Passport').subscribe((res) => {
      this.passportData = res;
      this.spinner.hide();
 //     this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }

  getByDate(body:any) {
    this.spinner.show()
    this.http.post(this.url+'Pr_Passport/getbydate',body).subscribe((res) => {
      this.passportData = res;
      this.spinner.hide();
   //   this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }
  delete(id: number) {
    this.http.delete(this.url+'Pr_Passport/DeletePassport/' + id).subscribe((res) => {
      this.toastr.success('Deleted Successfully :) ')
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }, err => {
      this.toastr.error(err.message);
    })

  }


  getnull() {
    this.spinner.show()
    this.http.get(this.url+'Pr_Passport/GetAllStatusPending').subscribe((res) => {
      this.passportData = res;
      this.passportpindingData=res;
      this.spinner.hide();
      //this.toastr.success('Data Pending Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }
  genarate(id: any) {
    this.spinner.show()
    this.http.put(this.url+'Pr_Passport/Genarate/', id).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Passport Renovated')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status, err.message);
    })

  }


  reject(id: any) {
    this.spinner.show()
    this.http.put(this.url+'Pr_Passport/Reject/', id).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Passport Rejected')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status, err.message);
    })

  }



  sendapprove(email: any, fullname1: any) {
    var body = {
      ToEmail: email,
      Username: fullname1
    }
    const headerDir = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDir)
    }
    this.http.post(this.url+'Mail/mailrequest', body, requestOptions).subscribe((res) => {
      this.toastr.success('Email sent Successfully')
      console.log('sent');

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status, err.message);
    })
  }



  sendreject(email: any, fullname1: any) {
    var body = {
      ToEmail: email,
      Username: fullname1
    }
    const headerDir = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDir)
    }
    this.http.post(this.url+'Mail/mailReject', body, requestOptions).subscribe((res) => {
      this.toastr.success('Email sent Successfully')
      console.log('sent');

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status, err.message);
    })
  }


  display_Image_Old: any
  display_Image_Card: any
  display_Image_Personal: any


  uploadAttachmentOldPass(file: FormData) {
    this.http.post(this.url+'Pr_Passport/UploadPassport/', file)
      .subscribe((res: any) => {
        this.display_Image_Old = res.img_Oldpassport;
      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }


  uploadAttachmentCard(file: FormData) {
    this.http.post(this.url+'Pr_Passport/UploadCard/', file)
      .subscribe((res: any) => {
        this.display_Image_Card = res.img_Card;
      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }


  uploadAttachmentImage(file: FormData) {
    this.http.post(this.url+'Pr_Passport/UploadPersonalImage/', file)
      .subscribe((res: any) => {
        this.display_Image_Personal = res.image;
      }, err => {
        this.toastr.error(err.status, err.message);
      })
  }

  time: any = new Date((new Date()).valueOf());
  datepipe: DatePipe = new DatePipe('en-US')
  formattedDate: any
  //To fill the application of renewing passport from the user 
  create(body: any) {
    this.formattedDate = this.datepipe.transform(this.time, 'YYYY-MM-ddTHH:mm:ss')
    body.requesttime = this.formattedDate
    body.status = ''
    body.user_Id = this.profileData.user_Id
    body.img_Oldpassport = this.display_Image_Old
    body.img_Card = this.display_Image_Card
    body.image = this.display_Image_Personal
    this.spinner.show()
    this.http.post(this.url+'Pr_Passport/CreatePassport/', body).subscribe((res) => {
      this.spinner.hide()
      this.toastr.success("Your application submitted successfully🙂")
      var bodyemail = {
        ToEmail: body.email,
        Username: body.fullname
      }
      const headerDir = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      const requestOptions = {
        headers: new HttpHeaders(headerDir)
      }
      
      this.http.post(this.url+'Mail/mailPending', bodyemail, requestOptions).subscribe((res) => {
        this.toastr.success('Email sent Successfully')
        console.log('sent');

      }, err => {
        this.spinner.hide();
        this.toastr.error(err.status, err.message);
      })


    }, err => {
      this.spinner.hide()
      this.toastr.error(err.massege, err.status)
    })
  }




  profileData: any = {}
  getId() {
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
      this.spinner.hide();
      //this.toastr.success('Profile Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }




  search(data: any) {
    data.fullname = ''
    //data.national_No=''
    data.gender = ''
    data.address = ''
    this.http.post(this.url+'Pr_Passport/AdminSearch/', data).subscribe((res) => {
      this.passportData = res;
    }, err => {
      this.toastr.error(err.status, err.message);
    })
  }



  getPassportByUserId(id :any) {

    var body = {
      User_Id:id
    }
    const headerDir = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDir)
    }
    
    this.spinner.show()
    this.http.post(this.url+'Pr_Passport/getpassport',body,requestOptions).subscribe((res) => {
      this.singlePassport = res;
      this.spinner.hide();
     // this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }


}
