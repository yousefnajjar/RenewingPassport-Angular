import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WebsiteService } from 'src/app/Services/website.service';

@Component({
  selector: 'app-manage-website',
  templateUrl: './manage-website.component.html',
  styleUrls: ['./manage-website.component.css']
})
export class ManageWebsiteComponent implements OnInit {

  constructor(public website:WebsiteService,private diolog: MatDialog) { }

  ngOnInit(): void {
    this.website.get()
  }
  web: any = {}
  @ViewChild('callUpdate') callUpdateDialog!: TemplateRef<any>

  openUpdatedialog(website_Id1:any,website_Name1:any,logo1:any,location1:any,
    phonenumber1:any ,email1:any,descrption1:any) {

    this.web = {
      website_Id:website_Id1,
      website_Name: website_Name1,
      logo: logo1,
      location: location1,
      phonenumber:phonenumber1,
      email:email1,
      descrption:descrption1
    }
     this.UpdateForm.controls['website_Id'].setValue(website_Id1)
    // this.UpdateForm.controls['website_Name'].setValue(website_Name1)
     this.UpdateForm.controls['logo'].setValue(logo1)
    // this.UpdateForm.controls['location'].setValue(location1)
    // this.UpdateForm.controls['phonenumber'].setValue(phonenumber1)
    // this.UpdateForm.controls['email'].setValue(email1)
    // this.UpdateForm.controls['descrption'].setValue(descrption1)
    this.diolog.open(this.callUpdateDialog)
  }

  UpdateForm: FormGroup = new FormGroup({
    website_Id:new FormControl(),
    website_Name: new FormControl(),
    logo: new FormControl(),
    location: new FormControl(),
    phonenumber: new FormControl(),
    email: new FormControl(),
    descrption: new FormControl(),
  })


  uploadImage(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.website.uploadAttachment(formData);
  }

  update(){
    this.website.update(this.UpdateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
}
