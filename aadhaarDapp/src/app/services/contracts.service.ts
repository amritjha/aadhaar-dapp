import { Injectable } from '@angular/core';

import * as Web3 from 'web3';

declare let require: any;

declare let window: any;

let CONTRACT_ABI = require('./aadhaarContract.json');

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private account: string = null;
  private web3: any;

  private aadhaarContract: any;
  private CONTRACT_ADDRESS: string = "0xbb567c98f7dda9f9bdbdaa2ad361df021bf8b02f";

  constructor() { this.onLoad(); }

  onLoad() {

    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);

      if (this.web3.version.network !== '4') {
        alert('Please connect to the Rinkeby network');
      }
    
    } else {
      alert('Please use a dapp browser like mist or MetaMask plugin for chrome');
    }

    this.aadhaarContract = this.web3.eth.contract(CONTRACT_ABI).at(this.CONTRACT_ADDRESS);

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
      
      //console.log(this.account);
      this.getOwnRecords().then(res => {
        console.log(res);
      });

      this.callContract().then(res => console.log(res));

    });
    
  }

  public async callContract() {
    let ret_val = await this.getOwnRecords();
    console.log(ret_val);
    return ret_val;
  };

  public async getOwnRecords() {
    return await new Promise((resolve, reject) => {
      this.aadhaarContract.accessOwnRecords.call((err, res) => {
        if(err)
          reject(err);
        else {
          //console.log(res);
          resolve(res);
        }
      });
    });
  }

}
