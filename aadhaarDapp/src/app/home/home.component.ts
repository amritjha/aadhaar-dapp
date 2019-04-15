import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../services/contracts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ownRecords:any = "";

  constructor(public cs : ContractsService) {  }

  ngOnInit() { }

  public async accessOwnRecords() {
    let ret_val = await this.cs.accessOwnRecords();

    this.ownRecords = "<h3>Full Name: " + ret_val[0] + "</h3><h3>Date of Birth: " + ret_val[1] + "</h3><h3>Gender: " + ret_val[2] + 
    "</h3><h3>PIN/Zipcode: " + ret_val[3] + "</h3><h3>Phone Number: " + ret_val[4] + "</h3><h3>Email ID: " + ret_val[5] +
    "</h3><h3>Iris Reference: " + ret_val[6] + "</h3><h3>Fingerprints Reference: " + ret_val[7] + 
    "</h3><h3>Face Reference: " + ret_val[8]; 
  }

}
