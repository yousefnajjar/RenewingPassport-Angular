import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PassportService } from 'src/app/Services/passport.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-manage-passport',
  templateUrl: './manage-passport.component.html',
  styleUrls: ['./manage-passport.component.css']
})
export class ManagePassportComponent implements OnInit {
  @ViewChild('callDelete') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callView') callviewDialog!: TemplateRef<any>
  constructor(public passport: PassportService, private diolog: MatDialog, public user: UserService) { }

  ngOnInit(): void {
    this.passport.get()
  }

  viewForm: FormGroup = new FormGroup({
    passportnumber: new FormControl(),
    fullname: new FormControl(),
    national_No: new FormControl(),
    gender: new FormControl(),
    expirydate: new FormControl(),
    img_Card: new FormControl(),
    img_Oldpassport: new FormControl(),
    birthdate: new FormControl(),
    placeofbirth: new FormControl(),
    dateofissue: new FormControl(),
    requesttime: new FormControl(),
    user_Id: new FormControl(),
    status: new FormControl(),
    passport_Type: new FormControl(),
    mother_Name: new FormControl(),
    authority: new FormControl(),
    address: new FormControl(),
    image: new FormControl(),
    email: new FormControl(),

  })
  passpor: any = {}
  openviewdiolg(passport_Id1: any, passportnumber1: any, fullname1: any, national_No1: any, gender1: any,
    expirydate1: any, img_Card1: any, img_Oldpassport1: any, birthdate1: any, placeofbirth1: any, dateofissue1: any, requesttime1: any,
    user_Id1: any, status1: any, passport_Type1: any, mother_Name1: any, authority1: any, address1: any,
    image1: any, email1: any) {
    this.passpor = {
      passport_Id: passport_Id1,
      passportnumber: passportnumber1,
      fullname: fullname1,
      national_No: national_No1,
      gender: gender1,
      expirydate: expirydate1,
      img_Card: img_Card1,
      img_Oldpassport: img_Oldpassport1,
      birthdate: birthdate1,
      placeofbirth: placeofbirth1,
      dateofissue: dateofissue1,
      requesttime: requesttime1,
      user_Id: user_Id1,
      status: status1,
      passport_Type: passport_Type1,
      mother_Name: mother_Name1,
      authority: authority1,
      address: address1,
      image: image1,
      email: email1
    }
    this.viewForm.controls['email'].setValue(email1)
    this.diolog.open(this.callviewDialog)

  }
  openDeletedialog(id: any) {
    const dialogRef = this.diolog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.passport.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }

        else if (res == "no")
          console.log("Thank you ");

      }
    })

  }

  approve(id: any, email: any, fullname1: any) {
    this.passport.genarate(id)
    setTimeout(() => {
      window.location.reload()
    }, 3000);
    this.passport.sendapprove(email, fullname1)
  }


  reject(id: any, email: any, fullname1: any) {
    this.passport.reject(id)
    setTimeout(() => {
      window.location.reload()
    }, 3000);
    this.passport.sendreject(email, fullname1)

  }

  getnull() {
    this.passport.getnull()
  }



  SearchForm: FormGroup = new FormGroup({
    passportnumber: new FormControl(),
    fullname: new FormControl(),
    //national_No:new FormControl(),
    gender: new FormControl(),
    address: new FormControl(),
  })

  Search() {
    this.passport.search(this.SearchForm.value)

  }


  DateForm :FormGroup =new FormGroup({
    startDate:new FormControl(),
    endDate:new FormControl()   
  })

  getdate(){
    this.passport.getByDate(this.DateForm.value)
  }
}
