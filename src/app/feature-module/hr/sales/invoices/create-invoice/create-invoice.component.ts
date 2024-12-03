import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
})
export class CreateInvoiceComponent implements OnInit {
  public addInvoiceForm!: FormGroup;
  public expArray: Array<any> = [1];
  constructor(private formBuilder: FormBuilder) {}
  public routes = routes;
  ngOnInit(): void {
    //add invoive form
    this.addInvoiceForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      project: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      client_address: ['', [Validators.required]],
      billing_address: ['', [Validators.required]],
      invoice_date: ['', [Validators.required]],
      due_date: ['', [Validators.required]],
      other_information: ['', [Validators.required]],
      status: [''],
      totalamount: ['', [Validators.required]],
      discount: ['', [Validators.required]],
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
