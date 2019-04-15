import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../services/contracts.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  @ViewChild('grantPermissionForm') grantPermissionForm: NgForm;
  @ViewChild('revokePermissionForm') revokePermissionForm: NgForm;

  ret_val: any = "";

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  public async grantAccess() {
    let rcvaddr:string = this.grantPermissionForm.value.rcvaddr;
    let duration:string = this.grantPermissionForm.value.duration;
    this.ret_val = await this.cs.grantAccess(rcvaddr, duration);
  }

  public async revokeAccess() {
    let permid:string = this.revokePermissionForm.value.permid;
    this.ret_val = await this.cs.revokeAccess(permid);
  }

}
