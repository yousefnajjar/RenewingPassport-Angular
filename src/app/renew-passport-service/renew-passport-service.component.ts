import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PassportService } from '../Services/passport.service';

@Component({
  selector: 'app-renew-passport-service',
  templateUrl: './renew-passport-service.component.html',
  styleUrls: ['./renew-passport-service.component.css']
})
export class RenewPassportServiceComponent implements OnInit {
  @ViewChild('callRenewing') callRenewDialog!: TemplateRef<any>

  constructor(public passport: PassportService, private diolog: MatDialog,
    private router:Router ,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.passport.getId()
  }


  RenewForm: FormGroup = new FormGroup({
    passportnumber: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    national_No: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    expirydate: new FormControl('', [Validators.required]),
    img_Card: new FormControl('', [Validators.required]),
    img_Oldpassport: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    placeofbirth: new FormControl('', [Validators.required]),
    dateofissue: new FormControl('',[Validators.required]),
    requesttime: new FormControl(),
    user_Id: new FormControl(),
    status: new FormControl(),
    passport_Type: new FormControl('', [Validators.required]),
    mother_Name: new FormControl('', [Validators.required]),
    authority: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  openRenewDialog(){
    const token = localStorage.getItem('token');
    if(token){
    this.diolog.open(this.callRenewDialog)}
    else{
      setTimeout(() => {
        this.router.navigate(['security/login'])
      }, 2000);
     this.toastr.info("please login to continue")
    }
  }

  save() {
    this.passport.create(this.RenewForm.value)
    // setTimeout(() => {
    //   window.location.reload()
    // }, 2000);  
  }


  uploadImageOld(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.passport.uploadAttachmentOldPass(formData);

  }


  uploadImageCard(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.passport.uploadAttachmentCard(formData);
  }

  uploadImagePersonal(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.passport.uploadAttachmentImage(formData);
  }


}