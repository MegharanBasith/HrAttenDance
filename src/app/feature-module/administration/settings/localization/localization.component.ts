import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,

} from "@angular/forms";
interface data {
  value: string;
}
@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {
  public selectedValue1 = '' ;
  public selectedValue2 = '' ;
  public selectedValue3 = '' ;
  public selectedValue4 = '' ;
  public selectedValue5 = '' ;

  selectedList1: data[] = [
    {value: 'USA'},
    {value: 'United Kingdom'}
  ];
  selectedList2: data[] = [
    {value: '15/05/2016'},
    {value: '15.05.2016'},
    {value: '15-05-2016'},
    {value: '05/15/2016'},
    {value: '2016/05/15'},
    {value: '2016-05-15'},
    {value: 'May 15 2016'},
    {value: '15 May 2016'}
  ];
  selectedList3: data[] = [
    {value: '(UTC +5:30) Antarctica/Palmer'}
  ];
  selectedList4: data[] = [
    {value: 'English'},
    {value: 'French'}
  ];
  selectedList5: data[] = [
    {value: 'USD'},
    {value: 'Pound'},
    {value: 'EURO'},
    {value: 'Ringgit'}
  ];

  public localisation!: FormGroup ;
  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.localisation = this.formBuilder.group({
      defaultCountry: ["USA", [Validators.required]],
      dateFormat: ["15/05/2016", [Validators.required]],
      timeZone: ["(UTC +5:30) Antarctica/Palmer", [Validators.required]],
      deafultLanguage: ["English", [Validators.required]],
      currencyCode: ["USD", [Validators.required]],
    });
  }

}
