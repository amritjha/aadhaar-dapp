import { Injectable } from '@angular/core';

import * as Web3 from 'web3';

declare let require: any;

declare let window: any;

let CONTRACT_ABI = require('./aadhaarContract.json');
//let CONTRACT_ABI = require('./dummyContract.json');

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  public account: string = null;
  public web3: any;

  public aadhaarContract: any;
  public CONTRACT_ADDRESS: string = "0xae05b30dce246717c01b9f0e0bd8fea51e44ff77";
  //public dummyContract: any;
  //public CONTRACT_ADDRESS: string = "0xa0e0be80e42f9761dd4f2f5184661a08124e125d";
  
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

    this.aadhaarContract = this.web3.eth.contract(CONTRACT_ABI).at(this.CONTRACT_ADDRESS);
    //this.dummyContract = this.web3.eth.contract(CONTRACT_ABI).at(this.CONTRACT_ADDRESS);

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

    });
    
  }

  public async designateNode(_addr) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.designateNode(_addr, (err, res) => {
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
      this.aadhaarContract.deposeNode(_addr, (err, res) => {
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
      this.aadhaarContract.addRecords(_addr, _nm, _dob, _gn, _resaddr, _ph, _em, _iris, _fnprints, _face, (err, res) => {
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
      this.aadhaarContract.accessOwnRecords.call((err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }
  
  public async updatePersonalDetails(_addr, _nm, _dob, _gn) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.updatePersonalDetails(_addr, _nm, _dob, _gn, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async updateContactDetails(_addr, _resaddr, _em, _ph) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.updateContactDetails(_addr, _resaddr, _em, _ph, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async updateBiometricDetails(_addr, _iris, _fnprints, _face) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.updateBiometricDetails(_addr, _iris, _fnprints, _face, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async grantAccess(_rcvaddr, _duration) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.grantAccess(_rcvaddr, _duration, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async revokeAccess(_permid) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.revokeAccess(_permid, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  public async accessOthersRecords(_permid) {
    return new Promise((resolve, reject) => {
      this.aadhaarContract.accessOthersRecords.call(_permid, (err, res) => {
        if(err) 
          reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

}
