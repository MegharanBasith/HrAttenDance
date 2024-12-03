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
  selector: 'app-leads-dashboard',
  templateUrl: './leads-dashboard.component.html',
  styleUrl: './leads-dashboard.component.scss'
})
export class LeadsDashboardComponent {
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
      series: [44, 55, 13, 43],
      chart: {
        width: 340,
        type: "pie"
      },
      labels: ['Inpipeline', 'Follow Up', 'Schedule Service', 'Conversation'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 275
            },
            legend: {
              position: "right"
            }
          }
        }
      ]
    };
    this.chartOptions4 = {
      series: [{
        name: "Session Duration",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
    ],
    colors: ['#FFC38F'],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Jan', 'feb', 'march', 'april', 'may', 'jun', 'july', 'aug', 'sep',
          'oct', 'nov', 'dec'
        ],
      },
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
