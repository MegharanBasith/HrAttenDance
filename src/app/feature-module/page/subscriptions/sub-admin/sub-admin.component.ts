import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss']
})
export class SubAdminComponent {
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';

  selectedList1: data[] = [
    { value: 'Monthly' },
    { value: 'Yearly' },
  ];
  selectedList2: data[] = [
    { value: '5 Users' },
    { value: '50 Users' },
    { value: 'Unlimited' },
  ];
  selectedList3: data[] = [
    { value: '5 Projects' },
    { value: '50 Projects' },
    { value: 'Unlimited' },
  ];
  selectedList4: data[] = [
    { value: '5 GB' },
    { value: '100 GB' },
    { value: '500 GB' },
  ];
  selectedList5: data[] = [
    { value: 'Monthly' },
    { value: 'Yearly' },
  ];
  selectedList6: data[] = [
    { value: '5 Users' },
    { value: '50 Users' },
    { value: 'Unlimited' },
  ];
  selectedList7: data[] = [
    { value: '5 Projects' },
    { value: '50 Projects' },
    { value: 'Unlimited' },
  ];
  selectedList8: data[] = [
    { value: '5 GB' },
    { value: '100 GB' },
    { value: '500 GB' },
  ];
}
