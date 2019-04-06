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

  public async designateNode() {
    let arg:any = "0x99686b4b6b330f550BdD794C7b0A6C4951BBbDa5";
    let ret_val = await this.cs.designateNode(arg);
    this.ret_data = ret_val;
  }

  public async deposeNode() {
    let arg:any = "0x9e1Dd51c483fca51Ddc631A588aa67C9f1Ae7EA2";
    let ret_val = await this.cs.deposeNode(arg);
    this.ret_data = ret_val;
  }

  public async addRecords() {
    let ret_val = await this.cs.addRecords("0x9e1Dd51c483fca51Ddc631A588aa67C9f1Ae7EA2", "Brett Lee", 10101990, 1, "Dispur", 7035345255, "brett@ca.au", 1000, 2000, 3000);
    this.ret_data = ret_val; 
  }

  public async accessOwnRecords() {
    let ret_val = await this.cs.accessOwnRecords();
    this.ret_data = ret_val; 
  }

  public async updatePersonalDetails() {
    let ret_val = await this.cs.updatePersonalDetails("0x9e1Dd51c483fca51Ddc631A588aa67C9f1Ae7EA2", "Adam Gilchrist", 20101990, 2);
    this.ret_data = ret_val; 
  }

  public async updateContactDetails() {
    let ret_val = await this.cs.updateContactDetails("0x9e1Dd51c483fca51Ddc631A588aa67C9f1Ae7EA2", "Kolkata", "adam@ca.au", 8035345255);
    this.ret_data = ret_val; 
  }

  public async updateBiometricDetails() {
    let ret_val = await this.cs.updateBiometricDetails("0x9e1Dd51c483fca51Ddc631A588aa67C9f1Ae7EA2", 1, 2, 3);
    this.ret_data = ret_val; 
  }

  public async grantAccess() {
    let ret_val = await this.cs.grantAccess("0x99686b4b6b330f550BdD794C7b0A6C4951BBbDa5", 2000);
    this.ret_data = ret_val; 
  }

  public async revokeAccess() {
    let ret_val = await this.cs.revokeAccess(10000012);
    this.ret_data = ret_val; 
  }

  public async accessOthersRecords() {
    let ret_val = await this.cs.accessOthersRecords(10000012);
    this.ret_data = ret_val; 
  }

}
