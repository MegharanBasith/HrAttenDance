import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive

} from "ng-apexcharts";
import { routes } from 'src/app/core/helpers/routes/routes';
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  fill: ApexFill;
  labels: string[];

};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions1: Partial<ChartOptions> | any;
  public routes = routes;
  constructor() {
    this.chartOptions1 = {
      series: [
        {
          label: 'UI Developer',
          data: [20,	10,	5,	5,	20],
          fill: false,
          color: '#373651',
          borderWidth: 1
        },
              {
          label: 'Android',
          data: [2,	2,	3,	4,	1],
          fill: false,
          color: '#E65A26',
          borderWidth: 1
        },
          {
          label: 'Web Designing',
          data: [1,	3,	6,	8,	10],
          fill: false,
          color: '#a1a1a1',
          borderWidth: 1
        }
      ],
      chart: {
        height: 250,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
        ]
      }
    };
   }

  

}
