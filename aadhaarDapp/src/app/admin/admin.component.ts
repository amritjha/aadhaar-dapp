import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../services/contracts.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ret_val:any;

  @ViewChild('designateNodeForm') designateNodeForm: NgForm;
  @ViewChild('deposeNodeForm') deposeNodeForm: NgForm;

  nodeDesignatedEvent = this.cs.aadhaarContract.nodeDesignated();
  nodeDeposedEvent = this.cs.aadhaarContract.nodeDeposed();

  constructor(public cs : ContractsService, public ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() { }

  public async designateNode() {
    let addr:string = this.designateNodeForm.value.desgaddr;
    let tx_hash = await this.cs.designateNode(addr);

    this.nodeDesignatedEvent.watch((err, res) => {
      if(err) 
        console.log(err);
      else {
        let notification = "<strong>Successfully designated!!</strong> Node address: <strong>" + res.args.node_addr + "</strong>";
        this.ngFlashMessageService.showFlashMessage({
          messages: [notification], 
          dismissible: true, 
          timeout: 4000,
          type: 'success'
        });
      }
    });

  }

  public async deposeNode() {
    let addr:string = this.deposeNodeForm.value.depsaddr;
    let tx_hash = await this.cs.deposeNode(addr);

    this.nodeDeposedEvent.watch((err, res) => {
      if(err) 
        console.log(err);
      else {
        let notification = "<strong>Successfully deposed!!</strong> Node address: <strong>" + res.args.node_addr + "</strong>";
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
