import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebsiteService } from 'src/app/Services/website.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, public website: WebsiteService) { }

  ngOnInit(): void {
    this.website.get()
  }

  goprofile() {
    const token = localStorage.getItem('token');
    if (token)
      this.router.navigate(['userprofile'])
    else {
      this.toastr.info("please login")
      setTimeout(() => {
        this.router.navigate(['security/login'])
      }, 3000);
    }

    // let user: any = localStorage.getItem('user');
    // if (user) {
    //   user = JSON.parse(user);
    //   if (user.role == 'Admin') {
    //     this.router.navigate(['admin/manage-profile']);
    //   }
    //   else
    //   this.router.navigate(['userprofile']);

    // }
    
  }


  data: any
  goHome() {
    const token = localStorage.getItem('token');
    if (token)
      this.router.navigate(['home'])
    else {
        this.router.navigate(['home'])

    }
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if (user.role == 'Admin') {
        this.toastr.success('Welcome');
        this.router.navigate(['admin/dashboard']);
      }
      else
      this.router.navigate(['home']);

    }
  }

  isLogin(){
    if (localStorage.getItem('token') != null) {
      return true;
    }
    else{
      return false;
    }
  }

  logout() {
    this.router.navigate(['security/login'])
    localStorage.clear();
  }

  goregister(){
    this.router.navigate(['security/register'])
  }


  gologin(){
    this.router.navigate(['security/login'])
  }
}

