import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../services/contracts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ret_val:any;

  @ViewChild('designateNodeForm') designateNodeForm: NgForm;
  @ViewChild('deposeNodeForm') deposeNodeForm: NgForm;

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  async designateNode() {
    let addr:string = this.designateNodeForm.value.desgaddr;
    this.ret_val = await this.cs.designateNode(addr);
  }

  async deposeNode() {
    let addr:string = this.deposeNodeForm.value.depsaddr;
    this.ret_val = await this.cs.deposeNode(addr);
  }

}
