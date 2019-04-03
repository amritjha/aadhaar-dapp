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
  public CONTRACT_ADDRESS: string = "0x885e69d8a2b2452701789513ed235d5586b5f0f7";
  
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

  public async designateNode(_addr) {
    return new Promise((resolve, reject) => {
      this.dummyContract.designateNode(_addr, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async deposeNode(_addr) {
    return new Promise((resolve, reject) => {
      this.dummyContract.deposeNode(_addr, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async addRecords(_addr, _nm, _dob, _gn, _resaddr, _ph, _em, _iris, _fnprints, _face) {
    return new Promise((resolve, reject) => {
      this.dummyContract.addRecords(_addr, _nm, _dob, _gn, _resaddr, _ph, _em, _iris, _fnprints, _face, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async accessOwnRecords() {
    return new Promise((resolve, reject) => {
      this.dummyContract.accessOwnRecords.call((err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }
  

}
