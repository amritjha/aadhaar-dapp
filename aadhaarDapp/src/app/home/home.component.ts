import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../services/contracts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public cs : ContractsService) {
    this.cs.getOwnRecords().then(res => {
      console.log(res);
    });    
  }

  ngOnInit() {
    //this.callContract().then(res => console.log(res));
    //this.cs.callContract();
  }

  // callContract() {
  //   this.cs.getOwnRecords().then((res) => {
  //     console.log(res);
  //   });

  // }

  // public async callContract() {
  //   let ret_val = await this.cs.getOwnRecords();
  //   console.log(ret_val);
  // }

}
