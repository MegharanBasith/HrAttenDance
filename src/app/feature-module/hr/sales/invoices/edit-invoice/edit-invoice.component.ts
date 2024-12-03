import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {
  public taxValue = '5754 Airport Rd, Coosada, AL, 36020';
  public editEstimateForm!: FormGroup ;
  public expArray: Array<number> = [1];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor( private formBuilder: FormBuilder) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
   }
  public routes = routes;
  ngOnInit(): void {
   
    //editestimate form value
    this.editEstimateForm = this.formBuilder.group({
      client: ["", [Validators.required]],
      project: [""],
      email: [""],
      tax: [""],
      client_address: [""],
      billing_address: [""],
      estimate_date: [""],
      expiry_date: [""],
      other_information: [""],
      status: [],
      totalamount: "",
      discount: [""],
      grandTotal: [""],
      items: this.formBuilder.array([]),
    });
  }
  public addExp():void {
    this.expArray.push(1)
  }
  public deleteExp(index:number):void {
    this.expArray.splice(index, 1)
  }
  
  


}
