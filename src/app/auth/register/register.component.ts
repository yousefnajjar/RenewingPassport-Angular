// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
// import { AuthService } from 'src/app/Services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   registerForm :FormGroup=new FormGroup({
//     firstname:new FormControl('',Validators.required),
//     lastname:new FormControl('',Validators.required),
//     email:new FormControl('',[Validators.required,Validators.email]),
//     password:new FormControl('',[Validators.required,Validators.minLength(8)]),
//     phonenumber:new FormControl('',Validators.required) ,
//     confirmpassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
//     image:new FormControl(),
//     registrationtime:new FormControl()

//   })

//   constructor(private router:Router ,private spinner: NgxSpinnerService,public auth: AuthService) { }

//   ngOnInit(): void {
//   }

//   goTologin() {
//     this.router.navigate(['security/login'])

//   }

//   submit(){
//     this.auth.register(this.registerForm.value)
//     console.log(this.registerForm.value);
//     setTimeout(() => {
//       this.router.navigate(['security/login'])
//     }, 2000);
           
//   }


//   onChange(){
//     if(this.registerForm.controls['password'].value==this.registerForm.controls['confirmpassword'].value)
//     this.registerForm.controls['confirmpassword'].setErrors(null);

//     else 

//      this.registerForm.controls['confirmpassword'].setErrors({mismatch:true});

//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm :FormGroup=new FormGroup({
    firstname:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    phonenumber:new FormControl('',Validators.required) ,
    passport_Type:new FormControl('',Validators.required) ,
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
    image:new FormControl(),
    registrationtime:new FormControl()

  })

  constructor(private router:Router ,private spinner: NgxSpinnerService,public auth: AuthService) { }

  ngOnInit(): void {
  }

  goTologin() {
    this.router.navigate(['security/login'])

  }

  submit(){
    this.auth.register(this.registerForm.value)
    // console.log(this.registerForm.value);
    setTimeout(() => {
      this.router.navigate(['security/login'])
    }, 2000);
           
  }


  onChange(){
    if(this.registerForm.controls['password'].value==this.registerForm.controls['confirmpassword'].value)
    this.registerForm.controls['confirmpassword'].setErrors(null);
    else 
     this.registerForm.controls['confirmpassword'].setErrors({mismatch:true});

  }

}

