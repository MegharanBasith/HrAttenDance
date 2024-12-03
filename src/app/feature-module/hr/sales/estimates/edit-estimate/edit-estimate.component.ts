import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-edit-estimate',
  templateUrl: './edit-estimate.component.html',
  styleUrls: ['./edit-estimate.component.scss'],
})
export class EditEstimateComponent implements OnInit {
  public editEstimateForm!: FormGroup;
  public expArray: Array<number> = [1];
  public routes = routes;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //editestimate form value
    this.editEstimateForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      project: [''],
      email: [''],
      tax: [''],
      client_address: [''],
      billing_address: [''],
      estimate_date: [''],
      expiry_date: [''],
      other_information: [''],
      status: [],
      totalamount: '',
      discount: [''],
      grandTotal: [''],
      items: this.formBuilder.array([]),
    });
  }
  public addExp(): void {
    this.expArray.push(1);
  }
  public deleteExp(index: number): void {
    this.expArray.splice(index, 1);
  }
}
