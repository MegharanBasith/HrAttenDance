import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-create-estimate',
  templateUrl: './create-estimate.component.html',
  styleUrls: ['./create-estimate.component.scss'],
})
export class CreateEstimateComponent implements OnInit {
  public addEstimateForm!: FormGroup;
  public expArray: Array<any> = [1];
  selected1 = 'option2';
  constructor(private formBuilder: FormBuilder) {}
  public routes = routes;
  ngOnInit(): void {
    // add estimation form value
    this.addEstimateForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      project: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      client_address: ['', [Validators.required]],
      billing_address: ['', [Validators.required]],
      estimate_date: ['', [Validators.required]],
      expiry_date: ['', [Validators.required]],
      other_information: [''],
      status: [''],
      totalamount: ['', [Validators.required]],
      discount: [''],
      grandTotal: [''],
      items: this.formBuilder.array([]),
    });
  }
  showRemoveButton: boolean = false;

  public addExp(): void {
    this.expArray.push({ isNew: true });
    this.showRemoveButton = true;
  }
  public deleteExp(index: number): void {
    this.expArray.splice(index, 1);
    if (this.expArray.length === 0) {
      this.showRemoveButton = false;
    }
  }
}
