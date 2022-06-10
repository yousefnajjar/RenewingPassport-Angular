import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  constructor(public profile: ProfileService) { }

  EditForm: FormGroup = new FormGroup({
    user_Id:new FormControl(),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', Validators.required),
    image: new FormControl(),
    registrationtime: new FormControl()
  })


  EditImageForm: FormGroup = new FormGroup({
    image: new FormControl()
  })

  EditPasswordForm: FormGroup = new FormGroup({
    user_Id:new FormControl(),
    oldpassword1: new FormControl(),
    oldpassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),   
  })

  //  passwordform:any={}


  formData :any ={}
 
  ngOnInit(): void {
    this.profile.get()
    
  }

  editpassword(){
    this.profile.updatePassword(this.EditPasswordForm.value)
  }
 editinfo(){

  this.profile.updateinfo(this.EditForm.value)
 }

  onChange(){
    if(this.EditPasswordForm.controls['password'].value==this.EditPasswordForm.controls['confirmpassword'].value)
    this.EditPasswordForm.controls['confirmpassword'].setErrors(null);
    else 

     this.EditPasswordForm.controls['confirmpassword'].setErrors({mismatch:true});

  }

  
  uploadImage(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.profile.uploadAttachment(formData);
  }

}
