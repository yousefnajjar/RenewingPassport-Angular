import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/Services/contact.service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {

  constructor(public Contact :ContactService,private diolog: MatDialog, public prfile: ProfileService) { }
  @ViewChild('callDelete') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  

  ngOnInit(): void {
    this.Contact.get()
  }

  CreateForm: FormGroup = new FormGroup({
    contact_Us_Id: new FormControl(),
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  })
//send not save
  save(){
    this.Contact.sendContact(this.CreateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  }
 
  openDeletedialog(id: any) {
    const dialogRef = this.diolog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.Contact.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);        }

        else if (res == "no")
          console.log("Thank you ");  
      }
    })

  }


  contactobj: any = {}
  openCreatedialog(id: number, name1:any, email1:any){
    this.contactobj = {
      contact_Us_Id : id,
      name: name1,
      email: email1,
    }
    this.diolog.open(this.callCreateDialog)
  }

}
