import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-manage-country',
  templateUrl: './manage-country.component.html',
  styleUrls: ['./manage-country.component.css']
})
export class ManageCountryComponent implements OnInit {

  constructor(public country :CountryService,private diolog :MatDialog) { }

  ngOnInit(): void {
    this.country.get()
  }

  @ViewChild('callDelete') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdateDialog!: TemplateRef<any>
  CreateForm: FormGroup = new FormGroup({
    countryType: new FormControl('', Validators.required),
    countryName: new FormControl('', Validators.required),
    countryImage: new FormControl(),
    countryDescrption: new FormControl('', Validators.required),
   
  })
  
  UpdateForm: FormGroup = new FormGroup({
    country_Id:new FormControl(),
    countryType: new FormControl('', Validators.required),
    countryName: new FormControl('', Validators.required),
    countryImage: new FormControl(),
    countryDescrption: new FormControl('', Validators.required),
  })

  openDeleteDialog(id:any){
    const dialogRef=this.diolog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes")
        {
          this.country.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
        
        else if(res=="no")
        console.log("Thank you ");
        
      }      
    })
  }


  openCreatedialog() {
    this.diolog.open(this.callCreateDialog)
  }
  uploadImage(file: any) {
    if (file.length === 0)
      return;
    const uploadfile = <File>file[0];
    const formData = new FormData();
    formData.append('file', uploadfile, uploadfile.name);
    this.country.uploadAttachment(formData);
  }
  save() {
    this.country.create(this.CreateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);  }

    update(){
      this.country.update(this.UpdateForm.value)
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }
  countryobj: any = {}
  openUpdatedialog(country_Id1:any,countryType1: any, countryName1: any, countryImage1: any,countryDescrption1: any) {
    this.countryobj = {
    country_Id:country_Id1,
    countryType: countryType1,
    countryName: countryName1,
    countryImage: countryImage1,
    countryDescrption: countryDescrption1
    }
    this.UpdateForm.controls['country_Id'].setValue(country_Id1)
    this.UpdateForm.controls['countryType'].setValue(countryType1)
    this.UpdateForm.controls['countryName'].setValue(countryName1)
    this.UpdateForm.controls['countryImage'].setValue(countryImage1)
    this.UpdateForm.controls['countryDescrption'].setValue(countryDescrption1)
    this.diolog.open(this.callUpdateDialog)
  }


}
