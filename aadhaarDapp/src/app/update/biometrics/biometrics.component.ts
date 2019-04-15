import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ContractsService} from '../../services/contracts.service';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.css']
})
export class BiometricsComponent implements OnInit {

  @ViewChild('updateBiometricsForm') updateBiometricsForm: NgForm;
  ret_val: any;

  constructor(public cs : ContractsService) { }

  ngOnInit() { }

  public async updateBiometricsDetails() {
    let nodeaddr:string = this.updateBiometricsForm.value.nodeaddr;
    let iris:string = this.updateBiometricsForm.value.iris;
    let finger:string = this.updateBiometricsForm.value.fingerprint;
    let face:string = this.updateBiometricsForm.value.face;
    
    this.ret_val = await this.cs.updateBiometricDetails(nodeaddr, iris, finger, face);
  }


}
