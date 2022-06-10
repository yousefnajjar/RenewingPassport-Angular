import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AboutService } from 'src/app/Services/about.service';

@Component({
  selector: 'app-manage-about',
  templateUrl: './manage-about.component.html',
  styleUrls: ['./manage-about.component.css']
})
export class ManageAboutComponent implements OnInit {

  constructor(public about :AboutService,private diolog: MatDialog) { }
  @ViewChild('callUpdate') callUpdateDialog!: TemplateRef<any>

  ngOnInit(): void {
    this.about.get()
  }

  aboutUs: any = {}
  UpdateForm: FormGroup = new FormGroup({
    about_Us_Id:new FormControl('',Validators.required),
    mission: new FormControl('',Validators.required),
    workinghour: new FormControl('',Validators.required),
    vision: new FormControl('',Validators.required),
    goals: new FormControl('',Validators.required),
  })
  openUpdatedialog(about_Us_Id1:any,mission1:any,vision1:any,goals1:any,workinghour1:any){
    // this.aboutUs = {
    //   about_Us_Id:about_Us_Id1,
    //   mission: mission1,
    //   workinghour: workinghour1,
    //   vision: vision1,
    //   goals: goals1
    // }
    this.UpdateForm.controls['about_Us_Id'].setValue(about_Us_Id1)
    this.UpdateForm.controls['mission'].setValue(mission1)
    this.UpdateForm.controls['workinghour'].setValue(workinghour1)
    this.UpdateForm.controls['vision'].setValue(vision1)
    this.UpdateForm.controls['goals'].setValue(goals1)

    this.diolog.open(this.callUpdateDialog)
  }


  update(){
    this.about.update(this.UpdateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
}
