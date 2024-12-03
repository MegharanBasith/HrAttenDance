import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-assets-details',
  templateUrl: './assets-details.component.html',
  styleUrls: ['./assets-details.component.scss']
})
export class AssetsDetailsComponent {
  public selectedValue1 = '' ;
  public selectedValue2 = '' ;
  public routes = routes;
  selectedList1: data[] = [
    {value: 'Department 1'},
    {value: 'Department 2'}
  ];
  selectedList2: data[] = [
    {value: 'Customer'},
    {value: 'Client'}
  ];
}
