import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { DatePipe } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  

};
export interface datasModel {
  name: string;
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  public routes = routes;
  public selectedFieldSet = [0];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
  myTime: Date = new Date();
  myDateValue!: Date ;
  constructor(private datePipe: DatePipe) {
    this.chartOptions = {
      series: [{
        data: [400, 220, 448,],
        color:'#F96C85'
    }],
      chart: {
        type: "bar",
        height: 150
      },
      plotOptions: {
        bar: {
          
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      
      xaxis: {
        categories: ['Conversation', 'Follow Up', 'Inpipeline'
      ],
      }
    };
    this.chartOptions2 = {
      series: [{
        data: [400, 220, 448,],
        color:'#77D882'
    }],
      chart: {
        type: "bar",
        height: 150
      },
      plotOptions: {
        bar: {
          
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      
      xaxis: {
        categories: ['Conversation', 'Follow Up', 'Inpipeline'
      ],
      }
    };
    this.chartOptions3 = {
      series: [{
        name: "sales",
       
        data: [{
          x: 'Inpipeline',
          y: 400,
          
        }, {
          x: 'Follow Up',
          y: 30
        }, {
          x: 'Schedule',
          y: 248
        }, {
          x: 'Conversation',
          y: 470
        }, {
          x: 'Won',
          y: 470
        },{
          x: 'Lost',
          y: 180
        }]
      }],
      colors: ['#FFC38F'],
      chart: {
        height: 250,
        type: "bar"
      },
      plotOptions: {
        bar: {
         
          borderRadiusApplication: 'around',
        }
      },
     
      xaxis: {
        type: 'category',
        group: {
          style: {
            fontSize: '7px',
            fontWeight: 700,
          },
        
        }
      },
     
    };
    this.chartOptions4 = {
      series: [
        {
          name: "stepline-series",
          data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
        }
      ],
      colors: ['#FFC38F'],
      chart: {
        type: "line",
        height: 350
      },
      stroke: {
        curve: "stepline"
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Stepline Chart",
        align: "left"
      },
      markers: {
        hover: {
          sizeOffset: 4
        }
      }
    };
   
   
  }
  currentStep = 0;
  nextStep() {
    this.currentStep++;
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  data1: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data2: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data3: datasModel[] = [{ name: 'Promotion' }, { name: 'Rated' }];
  data4: datasModel[] = [{ name: 'James' }];
  data5: datasModel[] = [{ name: 'James' }];
  data6: datasModel[] = [{ name: 'Divine dran' }];

  trackByFn(index: number, item: datasModel) {
    return item.name;
  }

  add(event: MatChipInputEvent, val: datasModel[]): void {
    const value = (event.value || '').trim();
    if (value) {
      val.push({ name: value });
    }
    event.chipInput?.clear();
  }

  remove(values: datasModel[], val: number): void {
    if (val >= 0) {
      values.splice(val, 1);
    }
  }

  edit(val: datasModel[], index: number, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(val, index);
      return;
    }
    if (index >= 0) {
      val[index].name = value;
    }
  }
  public filter = false;
  elem = document.documentElement;
  openFilter() {
    this.filter = !this.filter;
  }
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  showTimePicker: Array<string> = []
  toggleTimePcker(value: string): void {

    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value
    } else {
      this.showTimePicker = []
    }
  }
  
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date)
    return this.datePipe.transform(selectedDate, 'h:mm a')
  }
  pipelines: { selectedPipeline: string }[] = [{ selectedPipeline: 'select' }];
  addPipeline(index: number) {
    this.pipelines.splice(index + 1, 0, { selectedPipeline: 'select' });
    
  }
  
  contact: { selectedContact: string }[] = [{ selectedContact: 'select' }];
  grid: { selectedGrid: string }[] = [{ selectedGrid: 'select' }];
  deals: { selecteddeal: string }[] = [{ selecteddeal: 'select' }];
  company: { selectedcompany: string }[] = [{ selectedcompany: 'select' }];
  list: { selectedlist: string }[] = [{ selectedlist: 'select' }];
 
  addGrid(index: number) {
    this.grid.splice(index + 1, 0, { selectedGrid: 'select' });
    
  }
  adddeals(index: number) {
    this.deals.splice(index + 1, 0, { selecteddeal: 'select' });
    
  }
  addcompany(index: number) {
    this.company.splice(index + 1, 0, {  selectedcompany: 'select' });
    
  }
  addContact(index: number) {
    this.contact.splice(index + 1, 0, { selectedContact: 'select' });
    
  }
  addList(index: number) {
    this.list.splice(index + 1, 0, { selectedlist: 'select' });
    
  }
}
