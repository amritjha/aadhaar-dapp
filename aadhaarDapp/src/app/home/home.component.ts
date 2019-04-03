import { Component, OnInit } from '@angular/core';
import {ContractsService} from '../services/contracts.service';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public cs : ContractsService) {  }

  ret_data: any = "No data available";

  ngOnInit() { }

  public async callGetData() {
    let ret_val = await this.cs.getOwnRecords();
    this.ret_data = ret_val[0] + " " + ret_val[1] + " " + ret_val[2];
  }

  public async callSetData() {
    let ret_val = await this.cs.setOwnRecords("Aakash", 10011996, 1);
    console.log(ret_val);
  }


}
