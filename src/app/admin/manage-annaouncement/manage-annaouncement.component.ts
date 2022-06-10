import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementsService } from 'src/app/Services/announcements.service';

@Component({
  selector: 'app-manage-annaouncement',
  templateUrl: './manage-annaouncement.component.html',
  styleUrls: ['./manage-annaouncement.component.css']
})
export class ManageAnnaouncementComponent implements OnInit {

  constructor(public annaouncement: AnnouncementsService, private diolog: MatDialog) { }
  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  @ViewChild('callDelete') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdateDialog!: TemplateRef<any>

  CreateForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    publisheddate: new FormControl(),
    category: new FormControl('', Validators.required),
    // website_Id:new FormControl('',Validators.required)
  })
  UpdateForm: FormGroup = new FormGroup({
    announcement_Id:new FormControl(),
    text: new FormControl(),
    subject: new FormControl(),
    publisheddate: new FormControl(),
    category: new FormControl(),
  })

  ngOnInit(): void {
    this.annaouncement.getAllAnnouncement();
  }

  openCreatedialog() {
    this.diolog.open(this.callCreateDialog)

  }

  announ: any = {}
  openUpdatedialog(announcement_Id1:any,text1: any, subject1: any, category1: any) {

    this.announ = {
      announcement_Id:announcement_Id1,
      text: text1,
      subject: subject1,
      category: category1
    }
    this.UpdateForm.controls['announcement_Id'].setValue(announcement_Id1)
    this.UpdateForm.controls['text'].setValue(text1)
    this.UpdateForm.controls['subject'].setValue(subject1)
    this.UpdateForm.controls['category'].setValue(category1)

    this.diolog.open(this.callUpdateDialog)

  }
  openDeletedialog(id: any) {
    const dialogRef = this.diolog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.annaouncement.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }

        else if (res == "no")
          console.log("Thank you ");

      }
    })

  }

  save() {
    this.annaouncement.create(this.CreateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);  }

update(){
this.annaouncement.update(this.UpdateForm.value)
setTimeout(() => {
  window.location.reload()
}, 2000);}

}


