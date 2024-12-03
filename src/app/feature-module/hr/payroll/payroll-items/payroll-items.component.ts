import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-payroll-items',
  templateUrl: './payroll-items.component.html',
  styleUrls: ['./payroll-items.component.scss'],
})
export class PayrollItemsComponent implements OnInit {
  public addPayrollForm!: FormGroup;
  public addOverForm!: FormGroup;
  public addDeductForm!: FormGroup;
  public editPayrollForm!: FormGroup;
  public editOverForm!: FormGroup;
  public editDeductForm!: FormGroup;
  public searchDataValue = '';
  public routes = routes;
  
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public totalPages = 0;
  //** / pagination variables

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Add payroll Form Validation And Getting Values

    this.addPayrollForm = this.formBuilder.group({
      addPayrollName: ['', [Validators.required]],
      addPayrollCategory: ['', [Validators.required]],
      addPayrollUnit: ['', [Validators.required]],
    });

    // Edit payroll Form Validation And Getting Values

    this.editPayrollForm = this.formBuilder.group({
      editPayrollName: ['', [Validators.required]],
      editPayrollCategory: ['', [Validators.required]],
      editPayrollUnit: ['', [Validators.required]],
    });

    // Add overTime Form Validation And Getting Values

    this.addOverForm = this.formBuilder.group({
      addOverName: ['', [Validators.required]],
      addOverRate: ['', [Validators.required]],
    });

    // Edit overtime Form Validation And Getting Values

    this.editOverForm = this.formBuilder.group({
      editOverName: ['', [Validators.required]],
      editOverRate: ['', [Validators.required]],
    });

    // Add deduction Form Validation And Getting Values

    this.addDeductForm = this.formBuilder.group({
      addDeductName: ['', [Validators.required]],
      addDeductUnit: ['', [Validators.required]],
    });

    // Edit deduction Form Validation And Getting Values

    this.editDeductForm = this.formBuilder.group({
      editDeductName: ['', [Validators.required]],
      editDeductunit: ['', [Validators.required]],
    });
  }
  public selectedValue1 = '' ;
  public selectedValue2 = '' ;
  public selectedValue3 = '' ;
  public selectedValue4 = '' ;
  public selectedValue5 = '' ;
  public selectedValue6 = '' ;
  public selectedValue7 = '' ;
  public selectedValue8 = '' ;

  selectedList1: data[] = [
    {value: 'Select a category'},
    {value: 'Monthly remuneration'},
    {value: 'Additional remuneration'}
  ];
  selectedList2: data[] = [
    {value: '-'},
    {value: 'Select All'},
    {value: 'John Doe'},
    {value: 'Richard Miles'}
  ];
  selectedList3: data[] = [
    {value: 'Select a category'},
    {value: 'Monthly remuneration'},
    {value: 'Additional remuneration'}
  ];
  selectedList4: data[] = [
    {value: '-'},
    {value: 'Select All'},
    {value: 'John Doe'},
    {value: 'Richard Miles'}
  ];
  selectedList5: data[] = [
    {value: '-'},
    {value: 'Daily Rate'},
    {value: 'Hourly Rate'}
  ];
  selectedList6: data[] = [
    {value: '-'},
    {value: 'Daily Rate'},
    {value: 'Hourly Rate'}
  ];
  selectedList7: data[] = [
    {value: '-'},
    {value: 'Select All'},
    {value: 'John Doe'},
    {value: 'Richard Miles'}
  ];
  selectedList8: data[] = [
    {value: '-'},
    {value: 'Select All'},
    {value: 'John Doe'},
    {value: 'Richard Miles'}
  ];
}
