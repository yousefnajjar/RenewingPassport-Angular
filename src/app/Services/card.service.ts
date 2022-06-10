import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  url: any = 'http://localhost:56422/api/'
  profileData: any = {}
  singleCardData: any = {}
  singlePassport: any = {}

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
    this.http.post(this.url + 'Pr_Userlogin/GetByEmail/', body, requestOptions).subscribe((res) => {
      this.profileData = res;
      this.spinner.hide();
      //this.toastr.success('Data Retieved !!')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.status);
    })
  }
  create(body: any) {
    body.user_id = this.profileData.user_Id
    this.spinner.show();
    debugger
    this.http.post(this.url + 'Pr_card', body).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Saved Successfully')

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }


  pay() {
    this.http.get(this.url + 'Pr_card/getById/' + this.profileData.user_Id).subscribe((res) => {
      this.singleCardData = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
    


    var body = {
      User_Id:this.profileData.user_Id
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



    setTimeout(() => {
      if (this.singleCardData.balance >= 50) {
        const body: any = {
          ammount: 50,
          card_id: this.singleCardData.card_ID
        }

        this.http.post(this.url + 'Pr_paymant', body).subscribe((res) => {
          this.spinner.hide();
          this.toastr.success('Paied')

        }, err => {
          this.spinner.hide();
          this.toastr.error(err.message, err.status)
        })
        setTimeout(() => {
          const body2: any = {
            card_id: this.singleCardData.card_ID
          }
          this.http.put(this.url + 'Pr_card/Withdrawal/', body2).subscribe((res) => {
            this.spinner.hide();
            this.toastr.success(' 50 JOD Has Been Deducted From Your Account')

          }, err => {
            this.spinner.hide();
            this.toastr.error(err.message, err.status)
          })
        }, 3000);
      
        setTimeout(() => {
          const body3: any = {
            passport_Id:this.singlePassport.passport_Id,
            status:'Pending Paid'
          }
          debugger
          this.http.put(this.url + 'Pr_Passport/Updatstatus/',body3).subscribe((res) => {
            this.spinner.hide();
            this.toastr.success(' statas ')

          }, err => {
            this.spinner.hide();
            this.toastr.error(err.message, err.status)
          })

        }, 2000);
      
      }
      else {
        this.toastr.error("Your Balance Is Insufficient")
      }
    }, 3000);


  }


}
