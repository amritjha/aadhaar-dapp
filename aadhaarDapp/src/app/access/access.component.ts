import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../services/contracts.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  @ViewChild('accessRecordsForm') accessRecordsForm: NgForm;

  records:any = '';

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  public async accessRecords() {
    let permid:string = this.accessRecordsForm.value.permid;
    let ret_val = await this.cs.accessOthersRecords(permid);

    this.records = "<h3>Full Name: " + ret_val[0] + "</h3><h3>Date of Birth: " + ret_val[1] + "</h3><h3>Gender: " + ret_val[2] + 
    "</h3><h3>PIN/Zipcode: " + ret_val[3] + "</h3><h3>Phone Number: " + ret_val[4] + "</h3><h3>Email ID: " + ret_val[5] +
    "</h3><h3>Face Reference: " + ret_val[6];

  }

}
