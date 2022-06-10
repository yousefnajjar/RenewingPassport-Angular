
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-manage-userlogin',
  templateUrl: './manage-userlogin.component.html',
  styleUrls: ['./manage-userlogin.component.css']
})
export class ManageUserloginComponent implements OnInit {

  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  @ViewChild('callDelete') callDeleteDialog!: TemplateRef<any>

  constructor(public auth:AuthService, private diolog :MatDialog) { }


  CreateForm :FormGroup=new FormGroup({
    firstname:new FormControl('',Validators.required),
    lastname:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    phonenumber:new FormControl('',Validators.required) ,
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(8)]),
    image:new FormControl(),
    registrationtime:new FormControl()
  })
  ngOnInit(): void {
    this.auth.get()
  }

  openDeletedialog(id: any) {
    const dialogRef = this.diolog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.auth.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);     
           }
        else if (res == "no")
          console.log("Thank you ");
      }
    })
  }

  onChange(){
    if(this.CreateForm.controls['password'].value==this.CreateForm.controls['confirmpassword'].value)
    this.CreateForm.controls['confirmpassword'].setErrors(null);
    else 
     this.CreateForm.controls['confirmpassword'].setErrors({mismatch:true});
  }



  openCreatedialog(){
    this.diolog.open(this.callCreateDialog)
  }


  save(){
    this.auth.Create(this.CreateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }



}