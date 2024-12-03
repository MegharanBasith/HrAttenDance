import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-user-assets-details',
  templateUrl: './user-assets-details.component.html',
  styleUrls: ['./user-assets-details.component.scss']
})
export class UserAssetsDetailsComponent {
  public selectedValue1 = '' ;
  public selectedValue2 = '' ;
  public selectedValue3 = '' ;
  public selectedValue4 = '' ;
  bsValue = new Date();
  public routes = routes;
  selectedList1: data[] = [
    {value: 'Male'},
    {value: 'Female'}
  ];
  selectedList2: data[] = [
    {value: 'Select Department'},
    {value: 'Web Development'},
    {value: 'IT Management'},
    {value: 'Marketing'}
  ];
  selectedList3: data[] = [
    {value: 'Select Designation'},
    {value: 'Web Designer'},
    {value: 'Web Developer'},
    {value: 'Android Developer'}
  ];
  selectedList4: data[] = [
    {value: '-'},
    {value: 'Wilmer Deluna'},
    {value: 'Lesley Grauer'},
    {value: 'Jeffery Lalor'}
  ];

}
