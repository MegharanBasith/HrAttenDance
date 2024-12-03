import { Component, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/core/core.index';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexResponsive,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;

  chart: ApexChart | any;

  responsive: ApexResponsive | any;

  colors: any;

  dataLabels: ApexDataLabels | any;

  plotOptions: ApexPlotOptions | any;

  yaxis: ApexYAxis | any;

  xaxis: ApexXAxis | any;

  legend: ApexLegend | any;

  fill: ApexFill | any;
};

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent {
  public routes = routes;
  public projectSliderOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    smartSpeed: 2000,
    autoplay: false,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 1,
      },
    },
  };
  public companySliderOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    smartSpeed: 2000,
    autoplay: false,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 4,
      },
    },
  };
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Break',
          data: [-50, -120, -80, -180, -80, -70, -100],
        },
        {
          name: 'Hours',
          data: [200, 250, 200, 290, 220, 300, 250],
        },
      ],
      colors: ['#FC133D', '#55CE63'],

      chart: {
        type: 'bar',
        height: 210,
        stacked: true,

        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 280,
          options: {
            legend: {
              position: 'bottom',
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          borderRadiusApplication: 'end', // "around" / "end"
          borderRadiusWhenStacked: 'all', // "all"/"last"
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      // stroke: {
      //     width: 5,
      //     colors: ['#fff']
      //   },
      yaxis: {
        min: -200,
        max: 300,
        tickAmount: 5,
      },
      xaxis: {
        categories: [
          ' Jan ',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
      legend: { show: false },
      fill: {
        opacity: 1,
      },
    };
  }
}
