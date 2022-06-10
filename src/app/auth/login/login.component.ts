// import { Component, OnInit } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
// import { AuthService } from 'src/app/Services/auth.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   email = new FormControl();
//   password = new FormControl();
//   keepme = new FormControl('');
//   constructor(private router: Router, private spinner: NgxSpinnerService,public auth: AuthService) { }

//   ngOnInit(): void {
//   }

//   goToRegister() {
//     this.router.navigate(['security/register'])

//   }
//   submit() {
//     // if (this.keepme.value == true) {
//     //   localStorage.setItem("Email", this.email.value)
//     //   localStorage.setItem("Password", this.password.value)
//     // }
//     // this.spinner.show();

//     // setTimeout(() => {
//     //   this.spinner.hide();
//     // }, 5000);
//     // console.log(this.email.value);
//     // console.log(this.password.value);
//     this.auth.login(this.email,this.password);


//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();
  keepme = new FormControl('');
  constructor(private router: Router, private spinner: NgxSpinnerService,public auth: AuthService) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['security/register'])

  }
  submit() {
    // if (this.keepme.value == true) {
    //   localStorage.setItem("Email", this.email.value)
    //   localStorage.setItem("Password", this.password.value)
    // }
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);
    // console.log(this.email.value);
    // console.log(this.password.value);
    this.auth.login(this.email,this.password);


  }

}

