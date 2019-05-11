import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../services/contracts.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  @ViewChild('grantPermissionForm') grantPermissionForm: NgForm;
  @ViewChild('revokePermissionForm') revokePermissionForm: NgForm;

  permissionGrantedEvent = this.cs.aadhaarContract.permissionGranted();
  permissionRevokedEvent = this.cs.aadhaarContract.permissionRevoked();

  constructor(public cs : ContractsService, public ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {}

  public async grantAccess() {
    let rcvaddr:string = this.grantPermissionForm.value.rcvaddr;
    let duration:string = this.grantPermissionForm.value.duration;
    let tx_hash = await this.cs.grantAccess(rcvaddr, duration);

    this.permissionGrantedEvent.watch((err, res) => {
      if(err) 
        console.log(err);
      else {
        let notification = "<strong>Successfully granted!!</strong> Permission ID: <strong>" + res.args.permid + "</strong> Receiver's address: <strong>" + res.args.node_addr + "</strong>";
        this.ngFlashMessageService.showFlashMessage({
          messages: [notification], 
          dismissible: true, 
          timeout: 4000,
          type: 'success'
        });
      }
    });

  }

  public async revokeAccess() {
    let permid:string = this.revokePermissionForm.value.permid;
    let tx_hash = await this.cs.revokeAccess(permid);

    this.permissionRevokedEvent.watch((err, res) => {
      if(err) 
        console.log(err);
      else {
        let notification = "<strong>Successfully revoked!!</strong> Permission ID: <strong>" + res.args.permid + "</strong>";
        this.ngFlashMessageService.showFlashMessage({
          messages: [notification], 
          dismissible: true, 
          timeout: 4000,
          type: 'success'
        });
      }
    });

  }

}
