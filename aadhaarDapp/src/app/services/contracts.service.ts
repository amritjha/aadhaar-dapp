import { Injectable } from '@angular/core';

import * as Web3 from 'web3';

declare let require: any;

declare let window: any;

//let CONTRACT_ABI = require('./aadhaarContract.json');
let CONTRACT_ABI = require('./dummyContract.json');

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  public account: string = null;
  public web3: any;

  //public aadhaarContract: any;
  //public CONTRACT_ADDRESS: string = "0xbb567c98f7dda9f9bdbdaa2ad361df021bf8b02f";
  public dummyContract: any;
  public CONTRACT_ADDRESS: string = "0x42c6c715ed12a765cb03401aade6cdc6f22eb5c5";
  
  public ret_val: any;

  constructor() { this.onLoad(); }

  public onLoad() {

    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);

      if (this.web3.version.network !== '4') {
        alert('Please connect to the Rinkeby network');
      }
    
    } else {
      alert('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }

    //this.aadhaarContract = this.web3.eth.contract(CONTRACT_ABI).at(this.CONTRACT_ADDRESS);
    this.dummyContract = this.web3.eth.contract(CONTRACT_ABI).at(this.CONTRACT_ADDRESS);

    this.web3.eth.getAccounts((err, res) => {

      if(err) {
        alert('There was an error fetching your accounts.');
        return;
      }
      else {
          if (res.length === 0) {
            alert('Couldn\'t get any accounts!');
            return;
          }
        this.account = res[0];
        this.web3.eth.defaultAccount = this.account;
      }
      
      //this.getOwnRecords().then(res => {console.log(res)});
      //this.callContract().then(res => console.log(res));

    });
    
  }

  public async callContract() {
    let res = await this.getOwnRecords();
    this.ret_val = res;
    //console.log(res);
    return res;
  };

  public async getOwnRecords() {
    return new Promise((resolve, reject) => {
      this.dummyContract.get.call({from: this.web3.eth.defaultAccount}, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async setOwnRecords(_nm:string, _dob:number, _gn:number) {

    return await new Promise((resolve, reject) => {
      this.dummyContract.set(_nm, _dob, _gn, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });

  }

  

}
