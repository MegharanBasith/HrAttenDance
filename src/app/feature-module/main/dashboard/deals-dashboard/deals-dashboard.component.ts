import { Component, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";
import { routes } from 'src/app/core/core.index';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  xaxis: ApexXAxis | any;
  

};
@Component({
  selector: 'app-deals-dashboard',
  templateUrl: './deals-dashboard.component.html',
  styleUrl: './deals-dashboard.component.scss'
})
export class DealsDashboardComponent {
  public routes = routes
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public chartOptions4: Partial<ChartOptions> | any;
 

  constructor() {
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
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
   
  }
  elem = document.documentElement;
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
