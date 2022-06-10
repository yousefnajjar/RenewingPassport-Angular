import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {

  constructor(public role: RoleService, private diolog: MatDialog) { }
  @ViewChild('callCreate') callCreateDialog!: TemplateRef<any>
  @ViewChild('callDelete') callDeleteDialog!: TemplateRef<any>
  @ViewChild('callUpdate') callUpdateDialog!: TemplateRef<any>

  CreateForm: FormGroup = new FormGroup({
    rolename: new FormControl('', Validators.required),
  })
  UpdateForm: FormGroup = new FormGroup({
    role_Id: new FormControl(),
    rolename: new FormControl(),
  })
  ngOnInit(): void {
    this.role.get()
  }




  // openCreatedialog() {
  //   this.diolog.open(this.callCreateDialog)
  // }

  roles: any = {}
  openUpdatedialog(role_Id1: any, rolename1: any) {

    this.roles = {
      role_Id: role_Id1,
      rolename: rolename1
    }
    this.UpdateForm.controls['role_Id'].setValue(role_Id1)
    this.UpdateForm.controls['rolename'].setValue(rolename1)

    this.diolog.open(this.callUpdateDialog)

  }
  openDeletedialog(id: any) {
    const dialogRef = this.diolog.open(this.callDeleteDialog)
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == "yes") {
          this.role.delete(id);
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }

        else if (res == "no")
          console.log("Thank you ");

      }
    })

  }

  // save() {
  //   this.role.create(this.CreateForm.value)
  //   setTimeout(() => {
  //     window.location.reload()
  //   }, 2000);
  // }

  update() {
    this.role.update(this.UpdateForm.value)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }



}
