import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import * as Web3 from 'web3';

declare let window: any;

@Injectable()
export class PrerequisiteGuardService implements CanActivate {

    public web3: any;
    constructor(public router:Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

        if(typeof window.web3 == 'undefined') {

            this.router.navigate(["/error"]);
            return false;
            
        } 
        
        else {

            this.web3 = new Web3(window.web3.currentProvider);
            if (this.web3.version.network !== '4') {
                this.router.navigate(["/error"]);
                return false;
            }
            else {
                if (this.web3.eth.accounts.length === 0) {
                    console.log("trap code snippet executed");
                    this.router.navigate(["/error"]);
                    return false;
                } else {
                    console.log("success code snippet executed");
                    return true;
                }     
            }

        }

    }

}