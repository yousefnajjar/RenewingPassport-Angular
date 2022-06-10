import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardService } from '../Services/card.service';
import { PassportService } from '../Services/passport.service';
import { ProfileService } from '../Services/profile.service';
import { ReviewService } from '../Services/review.service';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(public profile: ProfileService, private router: Router, public passport: PassportService,
    public review: ReviewService, private diolog: MatDialog, public card: CardService) { }

  ngOnInit(): void {
    this.profile.get()
    this.passport.getPassportByUserId(this.profile.profileData.user_Id)
    this.card.get()
  }




  EditPasswordForm: FormGroup = new FormGroup({
    user_Id: new FormControl(),
    oldpassword1: new FormControl(),
    oldpassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })





  EditForm: FormGroup = new FormGroup({
    user_Id: new FormControl(),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', Validators.required),
    image: new FormControl(),
    registrationtime: new FormControl()
  })

  RateForm: FormGroup = new FormGroup({
    rate: new FormControl('', [Validators.min(0), Validators.max(10)])
  })

  editinfo() {
    this.profile.updateinfo(this.EditForm.value)
  }

  editpassword() {
    this.profile.updatePassword(this.EditPasswordForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  uploadImage(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.profile.uploadAttachment(formData);
  }


  logout() {
    this.router.navigate(['security/login'])
    localStorage.clear();
  }

  print() {
    this.router.navigate(['passportTemplate'])

  }

  saveRate() {
    this.review.create(this.RateForm.value)
  }
  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  @ViewChild('callPay') callPayDialog!: TemplateRef<any>

  CreateForm: FormGroup = new FormGroup({

    card_Name: new FormControl('', Validators.required),
    cvc_Card: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),
    card_Number: new FormControl('', Validators.required),
    expiry_Date: new FormControl('', Validators.required),
    user_id: new FormControl(),

  })
  openCreatedialog() {
    this.diolog.open(this.callCreateDialog)
  }
  save() {
    this.card.create(this.CreateForm.value)
  }

  openPaydialog(){
    const dialogRef =this.diolog.open(this.callPayDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.card.get()
          setTimeout(() => {
            this.card.pay()
          }, 3000);
        }

        else if (res == "no")
          console.log("Thank you ");

      }
    })
  }

}
