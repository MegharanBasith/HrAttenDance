import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import {
  HorizontalSideBar,
  SideBar,
  SideBarMenu,
  apiResultFormat,
  routes,
} from '../../core.index';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  allAppliedCandidates!: Array<object>;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/employee.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getallAppliedCandidates(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/applied-candidate.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getholidays(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/holidays.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeave(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/leave-admin.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEos(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/eos/eos-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDepartment(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/department.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDesignations(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/designation.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTimeSheet(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/timesheet.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getShiftSchedule(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/shift.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getShiftList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/shiftlist.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getOverTime(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/overtime.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getClient(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/clients.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProjects(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/projects.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getTickets(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/tickets.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEstimate(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/estimates.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoice(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/invoice-page.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPayment(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/payments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenses(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/expenses.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProvidentFund(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/provident-fund.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTaxes(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/taxes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCategories(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/categories.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBudgets(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/budgets.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEmployeeSalary(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/employee-salary.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAddPayroll1(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/payroll-item1.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAddPayroll2(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/payroll-item2.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAddPayroll3(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/payroll-item3.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPolicies(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/policies.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenseReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/expense-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInvoiceReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/invoice-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPaymentReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/payment-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProjectReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/project-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }

  public getTaskReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/task-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getUserReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/user-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEmployeeReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/employee-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPayslipReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/payslip-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAttendanceReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/attendance-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAttendReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/attend-report.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getLeaveReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/leave-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDailyReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/daily-report.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPerformanceReport(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/performance-indicator.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getPerformanceappraisal(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/performance-appraisal.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getGoalList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/goal-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGoalType(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/goal-type.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTrainList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/training-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTrainType(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/training-type.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getTrainer(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/trainers.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPromotion(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/promotion.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getResignation(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/resignation.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTermination(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/termination.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAssets(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/assets-page.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAllJobs(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/user-dashboard-all.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSavedJobs(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/user-dashboard-saved.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAppliedJobs(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/user-dashboard-applied.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getOfferedJobs(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/user-dashboard-offered.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getVisited(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/user-dashboard-visited.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getArchived(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/user-dashboard-archived.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getManageJobs(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/manage-jobs.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getManageResume(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/manage-resumes.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getShortList(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/shortlist-candidate.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getInterview(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/interview-questions.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getOffer(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/offer-approval.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getExpire(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/experience-level.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getSchedule(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/schedule-timing.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getCandidate(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/candidates-list.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAptitudeResult(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/aptitude-result.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAptitudeResults(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/aptitude-result.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAptitudeCandidate(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/applied-candidate.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getUsers(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/users.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSubscribed(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/subscribed-company.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getDataTable(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/form-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAssetsCategory(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/assets-category.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getAssetsNew(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/assets-new.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAssetsReports(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/assets-reports.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getProjectContent(): Observable<apiResultFormat> {
    return this.http
      .get<apiResultFormat>('assets/JSON/project-content.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public getinterview(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/interview.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPipeline(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/pipeline.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getContactlist(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/contact-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCompanies(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/companies.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getLeads(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/leads-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getdeals(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/deals-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getActivities(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/activity.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public employeeSideBar: SideBar[] = [
    {
      tittle: 'Employee',
      icon: 'airplay',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Attendance',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'info',
          base: 'employee',
          materialicons: 'auto_graph',
          subMenus: [
            {
              menuValue: 'My Attendance',
              route: routes.myattendance,
              base: 'myattendance',
            },
            {
              menuValue: "My Settings",
              route: routes.mysettings,
              base: 'mysettings',
            },
          ]
        }
      ]
    }];

  public userSideBar: SideBar[] = [
    {
      tittle: 'Main',
      icon: 'airplay',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.dashboard,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dashcube',
          base: 'dashboard',
          materialicons: 'home',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.admin,
              base: 'admin',
            },
            {
              menuValue: 'Calendar',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              customSubmenuTwo: false,
            }
            //,
            // {
            //   menuValue: 'Employee Dashboard',
            //   route: routes.employee,
            //   base: 'employee',
            // },
            // {
            //   menuValue: 'Deals Dashboard',
            //   route: routes.dealsDashboard,
            //   base: 'deals',
            // },
            // {
            //   menuValue: 'Leads Dashboard',
            //   route: routes.leadDashboard,
            //   base: 'leads',
            // },
          ],
        }
        // ,
        // {
        //   menuValue: 'Apps',
        //   route: routes.apps,
        //   hasSubRouteTwo: true,
        //   showSubRoute: false,
        //   icon: 'cube',
        //   base: 'apps',
        //   materialicons: 'dashboard',
        //   subMenus: [
        //     {
        //       menuValue: 'Chat',
        //       route: routes.chat,
        //       base: 'apps',
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'Calls',
        //       customSubmenuTwo: true,
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.calendar,
        //       page1: 'voice-call',
        //       page2: 'videocall',
        //       subMenusTwo: [
        //         {
        //           menuValue: 'Voice Call',
        //           route: routes.voicecall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //           page: 'call',
        //         },
        //         {
        //           menuValue: 'Video Call',
        //           route: routes.videocall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //         },
        //         {
        //           menuValue: 'Outgoing Call',
        //           route: routes.outgoingcall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //         },
        //         {
        //           menuValue: 'Incoming Call',
        //           route: routes.incomingcall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //         },
        //       ],
        //     },
        //     {
        //       menuValue: 'Calendar',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.calendar,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'Contacts',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.contacts,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'Email',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.email,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'File Manager',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.filemanager,
        //       customSubmenuTwo: false,
        //     },
        //   ],
        // },
      ],
    },
    {
      tittle: 'Employees',
      icon: 'layers',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Employees',
          route: routes.employees,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user',
          base: 'employees',
          dot: true,
          materialicons: 'people',
          subMenus: [
            {
              menuValue: 'All Employees',
              route: routes.employeeList,
              base: 'employee-list',
            },
            {
              menuValue: 'Leaves',
              route: routes.leavelist,
              base: 'leave-admin',
              currentActive: true,
            },
            {
              menuValue: 'Business Trip',
              route: routes.businessTripList,
              base: 'business-trip-list',
            },
            {
              menuValue: 'EOS',
              route: routes.eoslist,
              base: 'eos/eos-list',

            },
            {
              menuValue: 'Timesheet',
              route: routes.timesheet,
              base: 'timesheet',
            },
            {
              menuValue: 'My Attendance',
              route: routes.myattendance,
              base: 'myattendance',
            },
            {
              menuValue: 'All Attendance',
              route: routes.allattendance,
              base: 'allattendance',
            },
            {
              menuValue: "My Settings",
              route: routes.mysettings,
              base: 'mysettings',
            },
            {
              menuValue: "Settings",
              route: routes.settings,
              base: 'settings',
            },
            {
              menuValue: "Earning And Deduction",
              route: routes.earningDeductionList,
              base: 'earningDeductionList',
            },
            {
              menuValue: "Loans",
              route: routes.loanList,
              base: 'loanList',
            },
            {
              menuValue: "Contracts",
              route: routes.employeeContractList,
              base: 'employeeContractList',
            }
          ],
        },
      ],
    },
    {
      tittle: 'HR',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Salary Calculation',
          route: routes.salaryCalculationList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'money',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
        {
          menuValue: 'Payment Order',
          route: routes.paymnetOrderList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'money',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
        {
          menuValue: 'Worker Document',
          route: routes.paymnetOrderList,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dashcube',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
            {
              menuValue: 'All Worker Docs',
              route: routes.workerDocumentList,
              base: 'WorkerDocument',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Expired Worker Docs',
              route: routes.workerDocumentExpiredList,
              base: 'WorkerDocument',
              customSubmenuTwo: false,
            },
          ]
        },
        {
          menuValue: 'Pay Group Period',
          route: routes.payGroupPeriodList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'clock',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
      ],
    },
  ];

  public sideBar: SideBar[] = [
    {
      tittle: 'Main',
      icon: 'airplay',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.dashboard,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dashcube',
          base: 'dashboard',
          materialicons: 'home',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.admin,
              base: 'admin',
            },
            {
              menuValue: 'Calendar',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              customSubmenuTwo: false,
            }
            // {
            //   menuValue: 'Employee Dashboard',
            //   route: routes.employee,
            //   base: 'employee',
            // },
            // {
            //   menuValue: 'Deals Dashboard',
            //   route: routes.dealsDashboard,
            //   base: 'deals',
            // },
            // {
            //   menuValue: 'Leads Dashboard',
            //   route: routes.leadDashboard,
            //   base: 'leads',
            // },
          ],
        },
        {
          menuValue: 'Employees Services',
          route: routes.employees,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user',
          base: 'employees',
          dot: true,
          materialicons: 'people',
          subMenus: [
            {
              menuValue: 'Employees Information',
              route: routes.employeeList,
              base: 'employee-list',
            },
            {
              menuValue: 'Contract Information',
              route: routes.employeeContractList,
              base: 'employeeContractList',
            },
            {
              menuValue: 'Leave Management',
              route: routes.leavelist,
              base: 'leave-admin',
              currentActive: true,
            },
            {
              menuValue: 'Earning and Deduction Management',
              route: routes.earningDeductionList,
              base: 'earningDeductionList',
            },
            {
              menuValue: 'Loan Management',
              route: routes.loanList,
              base: 'loanList',
            },
            {
              menuValue: 'End of Service Management',
              route: routes.eoslist,
              base: 'eos/eos-list',
            },
            // {
            //   menuValue: 'Business Trip',
            //   route: routes.businessTripList,
            //   base: 'business-trip-list',
            // },

            // {
            //   menuValue: 'Timesheet',
            //   route: routes.timesheet,
            //   base: 'timesheet',
            // },
            {
              menuValue: 'My Attendance',
              route: routes.myattendance,
              base: 'myattendance',
            },
            {
              menuValue: 'All Attendance',
              route: routes.allattendance,
              base: 'allattendance',
            },
            {
              menuValue: 'My Settings',
              route: routes.mysettings,
              base: 'mysettings',
            },
            {
              menuValue: 'Settings',
              route: routes.settings,
              base: 'settings',
            },
          ],
        },
        {
          menuValue: 'Attendance',
          route: routes.employees,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'fingerprint',
          base: 'employees',
          dot: true,
          materialicons: 'people',
          subMenus: [
            // {
            //   menuValue: 'My Attendance',
            //   route: routes.myattendance,
            //   base: 'myattendance',
            // },
            {
              menuValue: 'All Attendance',
              route: routes.allattendance,
              base: 'allattendance',
            },
            // {
            //   menuValue: 'My Settings',
            //   route: routes.mysettings,
            //   base: 'mysettings',
            // },
            {
              menuValue: 'All Settings',
              route: routes.settings,
              base: 'settings',
            },
          ],
        },
        // {
        //   menuValue: 'Apps',
        //   route: routes.apps,
        //   hasSubRouteTwo: true,
        //   showSubRoute: false,
        //   icon: 'cube',
        //   base: 'apps',
        //   materialicons: 'dashboard',
        //   subMenus: [
        //     {
        //       menuValue: 'Chat',
        //       route: routes.chat,
        //       base: 'apps',
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'Calls',
        //       customSubmenuTwo: true,
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.calendar,
        //       page1: 'voice-call',
        //       page2: 'videocall',
        //       subMenusTwo: [
        //         {
        //           menuValue: 'Voice Call',
        //           route: routes.voicecall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //           page: 'call',
        //         },
        //         {
        //           menuValue: 'Video Call',
        //           route: routes.videocall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //         },
        //         {
        //           menuValue: 'Outgoing Call',
        //           route: routes.outgoingcall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //         },
        //         {
        //           menuValue: 'Incoming Call',
        //           route: routes.incomingcall,
        //           hasSubRoute: false,
        //           showSubRoute: false,
        //         },
        //       ],
        //     },
        //     {
        //       menuValue: 'Calendar',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.calendar,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'Contacts',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.contacts,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'Email',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.email,
        //       customSubmenuTwo: false,
        //     },
        //     {
        //       menuValue: 'File Manager',
        //       hasSubRoute: true,
        //       showSubRoute: false,
        //       route: routes.filemanager,
        //       customSubmenuTwo: false,
        //     },
        //   ],
        // },
      ],
    },
    {
      tittle: 'HR',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Salary Calculation',
          route: routes.salaryCalculationList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'money',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
        {
          menuValue: 'Payment Order',
          route: routes.paymnetOrderList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'money',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
        {
          menuValue: 'Worker Document',
          route: routes.paymnetOrderList,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dashcube',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
            {
              menuValue: 'All Worker Docs',
              route: routes.workerDocumentList,
              base: 'WorkerDocument',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Expired Worker Docs',
              route: routes.workerDocumentExpiredList,
              base: 'WorkerDocument',
              customSubmenuTwo: false,
            },
          ]
        },
        {
          menuValue: 'Pay Group Period',
          route: routes.payGroupPeriodList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'clock',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
        {
          menuValue: 'Users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'group',
          base: 'users',
          materialicons: 'auto_graph',
          subMenus: [
          ],
        },
        // {
        //   menuValue: 'Payroll',
        //   route: routes.payroll,
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: 'money',
        //   base: 'payroll',
        //   materialicons: 'auto_graph',
        //   subMenus: [
        //     {
        //       menuValue: 'Employee Salary',
        //       route: routes.employeesalary,
        //       base: 'employee-salary',
        //     },
        //     {
        //       menuValue: 'Payslip',
        //       route: routes.salaryview,
        //       base: 'salary-view',
        //     },
        //     {
        //       menuValue: 'Payroll Items',
        //       route: routes.payrollitems,
        //       base: 'payroll-items',
        //     },
        //   ],
        // },
        // {
        //   menuValue: 'Policies',
        //   route: routes.policies,
        //   hasSubRoute: false,
        //   showSubRoute: false,
        //   icon: 'file-pdf-o',
        //   base: 'policies',
        //   page1: 'main',
        //   materialicons: 'do_not_disturb_alt',
        //   subMenus: [],
        // },
        // {
        //   menuValue: 'Reports',
        //   route: routes.reports,
        //   hasSubRoute: true,
        //   showSubRoute: false,
        //   icon: 'pie-chart',
        //   base: 'reports',
        //   materialicons: 'web_asset',
        //   subMenus: [
        //     {
        //       menuValue: 'Expense Report',
        //       route: routes.expensereport,
        //       base: 'expense-report',
        //     },
        //     {
        //       menuValue: 'Invoice Report',
        //       route: routes.invoicereport,
        //       base: 'invoice-report',
        //     },
        //     {
        //       menuValue: 'Payments Report',
        //       route: routes.paymentsreport,
        //       base: 'payments-report',
        //     },
        //     {
        //       menuValue: 'Project Report',
        //       route: routes.projectreport,
        //       base: 'project-report',
        //     },
        //     {
        //       menuValue: 'Task Report',
        //       route: routes.taskreport,
        //       base: 'task-report',
        //     },
        //     {
        //       menuValue: 'User Report',
        //       route: routes.userreport,
        //       base: 'user-report',
        //     },
        //     {
        //       menuValue: 'Employee Report',
        //       route: routes.employeereport,
        //       base: 'employee-report',
        //     },
        //     {
        //       menuValue: 'Payslip Report',
        //       route: routes.payslipreport,
        //       base: 'payslip-report',
        //     },
        //     {
        //       menuValue: 'Attendance Report',
        //       route: routes.attendancereport,
        //       base: 'attendance-report',
        //     },
        //     {
        //       menuValue: 'Leave Report',
        //       route: routes.leavereport,
        //       base: 'leave-report',
        //     },
        //     {
        //       menuValue: 'Daily Report',
        //       route: routes.dailyreport,
        //       base: 'daily-report',
        //     },
        //   ],
        // },
      ],
    },
  ];
  public sideBar2: HorizontalSideBar[] = [
    {
      tittle: 'Main',
      icon: 'airplay',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.dashboard,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'dashcube',
          base: 'dashboard',
          materialicons: 'home',
          subMenus: [
            {
              menuValue: 'Admin Dashboard',
              route: routes.admin,
              base: 'admin',
            },
            {
              menuValue: 'Employee Dashboard',
              route: routes.employee,
              base: 'employee',
            },
            {
              menuValue: 'Deals Dashboard',
              route: routes.dealsDashboard,
              base: 'deals',
            },
            {
              menuValue: 'Leads Dashboard',
              route: routes.leadDashboard,
              base: 'leads',
            },
          ],
        },
        {
          menuValue: 'Apps',
          route: routes.apps,
          hasSubRouteTwo: true,
          showSubRoute: false,
          icon: 'cube',
          base: 'apps',
          materialicons: 'dashboard',
          subMenus: [
            {
              menuValue: 'Chat',
              route: routes.chat,
              base: 'apps',
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Calls',
              customSubmenuTwo: true,
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              page1: 'voice-call',
              page2: 'videocall',
              subMenusTwo: [
                {
                  menuValue: 'Voice Call',
                  route: routes.voicecall,
                  hasSubRoute: false,
                  showSubRoute: false,
                  page: 'call',
                },
                {
                  menuValue: 'Video Call',
                  route: routes.videocall,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Outgoing Call',
                  route: routes.outgoingcall,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
                {
                  menuValue: 'Incoming Call',
                  route: routes.incomingcall,
                  hasSubRoute: false,
                  showSubRoute: false,
                },
              ],
            },
            {
              menuValue: 'Calendar',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.calendar,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Contacts',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.contacts,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'Email',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.email,
              customSubmenuTwo: false,
            },
            {
              menuValue: 'File Manager',
              hasSubRoute: true,
              showSubRoute: false,
              route: routes.filemanager,
              customSubmenuTwo: false,
            },
          ],
        },
      ],
    },
    {
      tittle: 'Employees',
      icon: 'layers',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Employees',
          route: routes.employees,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user',
          base: 'employees',
          dot: true,
          materialicons: 'people',
          subMenus: [
            {
              menuValue: 'All Employees',
              route: routes.employee_page,
              base: 'employee-page',
              base2: 'employee-list',
            },
            { menuValue: 'Holidays', route: routes.holidays, base: 'holidays' },
            {
              menuValue: 'Leaves',
              route: routes.leavelist,
              base: 'leave-list',
              currentActive: true,
            },
            {
              menuValue: 'Leaves (Employee)',
              route: routes.leaveemployee,
              base: 'leave-employee',
            },
            {
              menuValue: 'Leave Settings',
              route: routes.leavesettings,
              base: 'leave-settings',
            },
            {
              menuValue: 'EOS',
              route: routes.eoslist,
              base: 'eos/eos-list',
              currentActive: true,

            },
            {
              menuValue: 'Attendance (Admin)',
              route: routes.attendanceadmin,
              base: 'attendance-admin',
            },
            {
              menuValue: 'Attendance (Employee)',
              route: routes.attendanceemployee,
              base: 'attendance-employee',
            },
            {
              menuValue: 'Departments',
              route: routes.departments,
              base: 'departments',
            },
            {
              menuValue: 'Designations',
              route: routes.designations,
              base: 'designations',
            },
            {
              menuValue: 'Timesheet',
              route: routes.timesheet,
              base: 'timesheet',
            },
            {
              menuValue: 'Shift & Schedule',
              route: routes.shiftschedule,
              base: 'shift-schedule',
            },
            { menuValue: 'Overtime', route: routes.overtime, base: 'overtime' },
          ],
        },
        {
          menuValue: 'Clients',
          route: routes.clientPage,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'users',
          base: 'clients',
          materialicons: 'person',
          subMenus: [],
        },
        {
          menuValue: 'Projects',
          route: routes.projects,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'rocket',
          base: 'projects',
          materialicons: 'topic',
          subMenus: [
            {
              menuValue: 'Projects',
              route: routes.projectpage,
              base: 'project-page',
              base2: 'project-list',
              base3: 'project-view',
            },
            { menuValue: 'Tasks', route: routes.tasks, base: 'tasks' },
            {
              menuValue: 'Task Board',
              route: routes.taskboard,
              base: 'task-board',
            },
          ],
        },
        {
          menuValue: 'Tickets',
          route: routes.ticketpage,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'ticket',
          base: 'tickets',
          materialicons: 'leaderboard',
          subMenus: [
            { menuValue: 'Tickets', route: routes.ticketpage, base: 'ticket-page' },
            { menuValue: 'Tickets Detail', route: routes.ticketDetails, base: 'ticket-details' },
          ],
        },
      ],
    },
    {
      tittle: 'HR',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Sales',
          route: routes.sales,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'files-o',
          base: 'sales',
          materialicons: 'track_changes',
          subMenus: [
            {
              menuValue: 'Estimates',
              route: routes.estimatepage,
              base: 'estimate-page',
              base2: 'estimate-view',
              base3: 'create-estimate',
              base4: 'edit-estimate',
            },
            {
              menuValue: 'Invoices',
              route: routes.invoicepage,
              base: 'invoice-page',
              base2: 'invoice-view',
              base3: 'create-invoice',
              base4: 'edit-invoice',
            },
            { menuValue: 'Payments', route: routes.payments, base: 'payments' },
            { menuValue: 'Expenses', route: routes.expenses, base: 'expenses' },
            {
              menuValue: 'Provident Fund',
              route: routes.providentfund,
              base: 'provident-fund',
            },
            { menuValue: 'Taxes', route: routes.taxes, base: 'taxes' },
          ],
        },
        {
          menuValue: 'Accounting',
          route: routes.accounting,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'file-alt',
          base: 'accounting',
          materialicons: 'checklist_rtl',
          subMenus: [
            {
              menuValue: 'Categories',
              route: routes.category,
              base: 'category',
            },
            { menuValue: 'Budgets', route: routes.budgets, base: 'budgets' },
            {
              menuValue: 'Budget Expenses',
              route: routes.budgetexpenses,
              base: 'budget-expenses',
            },
            {
              menuValue: 'Budget Revenues',
              route: routes.budgetrevenues,
              base: 'budget-revenues',
            },
          ],
        },
        {
          menuValue: 'Payroll',
          route: routes.payroll,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'money',
          base: 'payroll',
          materialicons: 'auto_graph',
          subMenus: [
            {
              menuValue: 'Employee Salary',
              route: routes.employeesalary,
              base: 'employee-salary',
            },
            {
              menuValue: 'Payslip',
              route: routes.salaryview,
              base: 'salary-view',
            },
            {
              menuValue: 'Payroll Items',
              route: routes.payrollitems,
              base: 'payroll-items',
            },
          ],
        },
        {
          menuValue: 'Policies',
          route: routes.policies,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'file-pdf-o',
          base: 'policies',
          materialicons: 'do_not_disturb_alt',
          subMenus: [],
        },
        {
          menuValue: 'Reports',
          route: routes.reports,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'pie-chart',
          base: 'reports',
          materialicons: 'web_asset',
          subMenus: [
            {
              menuValue: 'Expense Report',
              route: routes.expensereport,
              base: 'expense-report',
            },
            {
              menuValue: 'Invoice Report',
              route: routes.invoicereport,
              base: 'invoice-report',
            },
            {
              menuValue: 'Payments Report',
              route: routes.paymentsreport,
              base: 'payments-report',
            },
            {
              menuValue: 'Project Report',
              route: routes.projectreport,
              base: 'project-report',
            },
            {
              menuValue: 'Task Report',
              route: routes.taskreport,
              base: 'task-report',
            },
            {
              menuValue: 'User Report',
              route: routes.userreport,
              base: 'user-report',
            },
            {
              menuValue: 'Employee Report',
              route: routes.employeereport,
              base: 'employee-report',
            },
            {
              menuValue: 'Payslip Report',
              route: routes.payslipreport,
              base: 'payslip-report',
            },
            {
              menuValue: 'Attendance Report',
              route: routes.attendancereport,
              base: 'attendance-report',
            },
            {
              menuValue: 'Leave Report',
              route: routes.leavereport,
              base: 'leave-report',
            },
            {
              menuValue: 'Daily Report',
              route: routes.dailyreport,
              base: 'daily-report',
            },
          ],
        },
      ],
    },
    {
      tittle: 'Performance',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Performance',
          route: routes.performance,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'graduation-cap',
          base: 'performance',
          materialicons: 'work_outline',
          subMenus: [
            {
              menuValue: 'Performance Indicator',
              route: routes.indicator,
              base: 'indicator',
            },
            {
              menuValue: 'Performance Review',
              route: routes.review,
              base: 'review',
            },
            {
              menuValue: 'Performance Appraisal',
              route: routes.appraisal,
              base: 'appraisal',
            },
          ],
        },
        {
          menuValue: 'Goals',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'crosshairs',
          base: 'goals',
          materialicons: 'school',
          subMenus: [
            { menuValue: 'Goal List', route: routes.goalTracking, base: 'goal-tracking' },
            { menuValue: 'Goal Type', route: routes.goalType, base: 'goal-type' },
          ],
        },
        {
          menuValue: 'Training',
          route: routes.training,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'edit',
          base: 'training',
          materialicons: 'toggle_off',
          subMenus: [
            { menuValue: 'Training List', route: routes.lists, base: 'lists' },
            { menuValue: 'Trainers', route: routes.trainer, base: 'trainer' },
            { menuValue: 'Training Type', route: routes.types, base: 'types' },
          ],
        },
        {
          menuValue: 'Promotion',
          route: routes.promotion,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'bullhorn',
          base: 'promotion',
          materialicons: 'group_add',
          subMenus: [],
        },
        {
          menuValue: 'Resignation',
          route: routes.resignation,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'external-link-square',
          base: 'resignation',
          materialicons: 'settings',
          subMenus: [],
        },
        {
          menuValue: 'Termination',
          route: routes.termination,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'user-times',
          base: 'termination',
          materialicons: 'manage_accounts',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Administration',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Assets',
          route: routes.assets,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'object-ungroup',
          base: 'assets',
          materialicons: 'perm_contact_calendar',
          subMenus: [],
        },
        {
          menuValue: 'Jobs',
          route: routes.jobs,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'briefcase',
          base: 'jobs',
          materialicons: 'announcement',
          subMenus: [
            {
              menuValue: 'User Dashboard',
              route: routes.userDashboard,
              base: 'user-dashboard',
              base2: 'user-all-jobs',
              base3: 'saved-jobs',
              base4: 'applied-jobs',
              base5: 'interview-jobs',
              base6: 'offered-jobs',
              base7: 'visited-jobs',
              base8: 'archived-jobs',
            },
            {
              menuValue: 'Jobs Dashboard',
              route: routes.jobsdashboard,
              base: 'jobs-dashboard',
            },
            {
              menuValue: 'Manage Jobs',
              route: routes.managejobs,
              base: 'manage-jobs',
            },
            {
              menuValue: 'Manage Resumes',
              route: routes.manageresumes,
              base: 'manage-resumes',
            },
            {
              menuValue: 'Shortlist Candidates',
              route: routes.shortlist,
              base: 'shortlist',
            },
            {
              menuValue: 'Interview Questions',
              route: routes.interviewquestions,
              base: 'interview-questions',
            },
            {
              menuValue: 'Offer Approvals',
              route: routes.offerapproval,
              base: 'offer-approval',
            },
            {
              menuValue: 'Experience Level',
              route: routes.experiencelevel,
              base: 'experience-level',
            },
            {
              menuValue: 'Candidates List',
              route: routes.candidateslist,
              base: 'candidates-list',
            },
            {
              menuValue: 'Schedule Timing',
              route: routes.scheduletiming,
              base: 'schedule-timing',
            },
            {
              menuValue: 'Aptitude Results',
              route: routes.aptituderesult,
              base: 'aptitude-result',
            },
          ],
        },
        {
          menuValue: 'Knowledgebase',
          route: routes.knowledgebasemain,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'question',
          base: 'knowledgebase',
          materialicons: 'loyalty',
          subMenus: [],
        },
        {
          menuValue: 'Users',
          route: routes.users,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'users-cog',
          base: 'users',
          materialicons: 'layers',
          subMenus: [],
        },
        {
          menuValue: 'Settings',
          route: routes.companysettings,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'cog',
          base: 'company-settings',
          materialicons: 'foundation',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Pages',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Profile',
          route: routes.profile,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'user-tag',
          base: 'profile',
          materialicons: 'bento',
          subMenus: [
            {
              menuValue: 'Employee Profile',
              route: routes.employeeProfile,
              base: 'employee-profile',
            },
            {
              menuValue: 'Client Profile',
              route: routes.clientProfile,
              base: 'client-profile',
            },
          ],
        },
        {
          menuValue: 'Authentication',
          route: routes.loginpro,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'key',
          base: 'login',
          materialicons: 'bar_chart',
          subMenus: [
            { menuValue: 'Login', route: routes.loginpro, base: 'login' },
            {
              menuValue: 'Register',
              route: routes.registers,
              base: 'register',
            },
            {
              menuValue: 'Forgot Password',
              route: routes.forgotpassword,
              base: 'forgot-password',
            },
            { menuValue: 'OTP', route: routes.otp, base: 'otp' },
            {
              menuValue: 'Lock Screen',
              route: routes.lockscreen,
              base: 'lock-screen',
            },
          ],
        },
        {
          menuValue: 'Error Page',
          route: routes.error,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'exclamation-triangle',
          base: '404',
          materialicons: 'grading',
          subMenus: [
            { menuValue: '404 Error', route: routes.error, base: '404' },
            { menuValue: '500 Error', route: routes.errors, base: '500' },
          ],
        },
        {
          menuValue: 'Subscriptions',
          route: routes.subscriptions,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'history',
          base: 'subscriptions',
          materialicons: 'view_day',
          subMenus: [
            {
              menuValue: 'Subscriptions (Admin)',
              route: routes.subadmin,
              base: 'admins',
            },
            {
              menuValue: 'Subscriptions (Company)',
              route: routes.companySubscriptions,
              base: 'company',
            },
            {
              menuValue: 'Subscribed Companies',
              route: routes.subscribedcompanies,
              base: 'subscribed-companies',
            },
          ],
        },
        {
          menuValue: 'Pages',
          route: routes.pages,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'columns',
          base: 'pages',
          materialicons: 'table_rows',
          subMenus: [
            { menuValue: 'Search', route: routes.search, base: 'search' },
            { menuValue: 'FAQ', route: routes.faq, base: 'faq' },
            { menuValue: 'Terms', route: routes.terms, base: 'terms' },
            {
              menuValue: 'Privacy Policy',
              route: routes.privacy,
              base: 'privacy-policy',
            },
            {
              menuValue: 'Blank Page',
              route: routes.blankpage,
              base: 'blank-page',
            },
            {
              menuValue: 'Coming Soon',
              route: routes.comingSoon,
              base: 'coming-soon',
            },
            {
              menuValue: 'Under Maintanance',
              route: routes.underMaintanance,
              base: 'under-maintanance',
            },
          ],
        },
      ],
    },
    {
      tittle: 'UI Interface',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Base UI',
          route: routes.dashboard,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'get-pocket',
          base: 'base-ui',
          materialicons: 'description',
          subMenus: [
            {
              menuValue: 'Alerts',
              route: routes.alert,
              base: 'ui-alerts',
            },
            {
              menuValue: 'Accordions',
              route: routes.accordions,
              base: 'ui-accordion',
            },
            { menuValue: 'Avatar', route: routes.avatar, base: 'ui-avatar' },
            { menuValue: 'Badges', route: routes.badges, base: 'ui-badges' },
            {
              menuValue: 'Buttons',
              route: routes.buttons,
              base: 'ui-buttons',
            },
            {
              menuValue: 'Button Group',
              route: routes.buttonGroup,
              base: 'ui-buttons-group',
            },
            {
              menuValue: 'Breadcrumb',
              route: routes.breadcrumb,
              base: 'ui-breadcrumb',
            },
            { menuValue: 'Cards', route: routes.cards, base: 'ui-cards' },
            {
              menuValue: 'Carousel',
              route: routes.carousel,
              base: 'ui-carousel',
            },
            {
              menuValue: 'Dropdowns',
              route: routes.dropDown,
              base: 'ui-dropdowns',
            },
            { menuValue: 'Grid', route: routes.grid, base: 'ui-grid' },
            { menuValue: 'Images', route: routes.images, base: 'ui-images' },
            {
              menuValue: 'Lightbox',
              route: routes.lightBox,
              base: 'ui-lightbox',
            },
            { menuValue: 'Media', route: routes.media, base: 'ui-media' },
            { menuValue: 'Modals', route: routes.modal, base: 'ui-modals' },
            {
              menuValue: 'Offcanvas',
              route: routes.offcanvas,
              base: 'ui-offcanvas',
            },
            {
              menuValue: 'Pagination',
              route: routes.pagination,
              base: 'ui-pagination',
            },

            {
              menuValue: 'Progress Bars',
              route: routes.progressBars,
              base: 'ui-progress',
            },
            {
              menuValue: 'Placeholders',
              route: routes.placeholder,
              base: 'ui-placeholders',
            },

            {
              menuValue: 'Spinner',
              route: routes.spinner,
              base: 'ui-spinner',
            },
            {
              menuValue: 'Range Slider',
              route: routes.rangeSlider,
              base: 'ui-rangeslider',
            },

            { menuValue: 'Toasts', route: routes.toasts, base: 'ui-toasts' },
            {
              menuValue: 'Tooltip',
              route: routes.tooltip,
              base: 'ui-tooltips',
            },
            {
              menuValue: 'Typography',
              route: routes.typography,
              base: 'ui-typography',
            },
            { menuValue: 'Videos', route: routes.video, base: 'ui-video' },
          ],
        },
        {
          menuValue: 'Advanced Ui',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'advancedUi',
          icon: 'eject',
          materialicons: 'sync_alt',
          subMenus: [
            { menuValue: 'Ribbon', route: routes.ribbon, base: 'ui-ribbon' },
            {
              menuValue: 'Clipboard',
              route: routes.clipboards,
              base: 'ui-clipboard',
            },
            {
              menuValue: 'Drag & Drop',
              route: routes.dragDrop,
              base: 'ui-drag-drop',
            },
            {
              menuValue: 'Rating',
              route: routes.rating,
              base: 'ui-rating',
            },
            {
              menuValue: 'Text Editor',
              route: routes.textEditor,
              base: 'ui-text-editor',
            },
            {
              menuValue: 'Counter',
              route: routes.counter,
              base: 'ui-counter',
            },
            {
              menuValue: 'Scrollbar',
              route: routes.scrollbar,
              base: 'ui-scrollbar',
            },
            {
              menuValue: 'Timeline',
              route: routes.timeline,
              base: 'ui-timeline',
            },
          ],
        },
        {
          menuValue: 'Charts',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'charts',
          icon: 'chart-line',
          materialicons: 'library_add_check',
          subMenus: [
            {
              menuValue: 'Apex Charts',
              route: routes.apexChart,
              base: 'apex-charts',
            },
            {
              menuValue: 'Ng2 Charts',
              route: routes.ngTwoCharts,
              base: 'ng2-charts',
            },
            {
              menuValue: 'Prime NG Charts',
              route: routes.chartPrime,
              base: 'prime-ng',
            },
          ],
        },
        {
          menuValue: 'Icons',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'icons',
          base: 'icon',
          materialicons: 'people',
          subMenus: [
            {
              menuValue: 'Fontawesome Icons',
              route: routes.fontawesome,
              base: 'fontawesome',
            },
            {
              menuValue: 'Feather Icons',
              route: routes.feather,
              base: 'feather',
            },
            {
              menuValue: 'Ionic Icons',
              route: routes.ionic,
              base: 'ionic',
            },
            {
              menuValue: 'Material Icons',
              route: routes.material,
              base: 'material',
            },
            { menuValue: 'pe7 Icons', route: routes.pe7, base: 'pe7' },
            {
              menuValue: 'Simpleline Icons',
              route: routes.simpleLine,
              base: 'simple-line',
            },
            {
              menuValue: 'Themify Icons',
              route: routes.themify,
              base: 'themify',
            },
            {
              menuValue: 'Weather Icons',
              route: routes.weather,
              base: 'weather',
            },
            {
              menuValue: 'Typicon Icons',
              route: routes.typicon,
              base: 'typicon',
            },
            { menuValue: 'Flag Icons', route: routes.flag, base: 'flag' },
          ],
        },
        {
          menuValue: 'Forms',
          route: routes.forms,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'wpforms',
          base: 'forms',
          materialicons: 'view_day',

          subMenus: [
            {
              menuValue: 'Basic Inputs',
              route: routes.basicinput,
              base: 'form-basic-inputs',
            },
            {
              menuValue: 'Inputs Groups',
              route: routes.inputgroups,
              base: 'form-input-groups',
            },
            {
              menuValue: 'Horizontal Form',
              route: routes.horizontalform,
              base: 'form-horizontal',
            },
            {
              menuValue: 'Vertical Form',
              route: routes.verticalform,
              base: 'form-vertical',
            },
            {
              menuValue: 'Form Mask',
              route: routes.formmask,
              base: 'form-mask',
            },
            {
              menuValue: 'Form Validation',
              route: routes.formvalidation,
              base: 'form-validation',
            },
            {
              menuValue: 'Form Select2',
              route: routes.formSelect2,
              base: 'form-select-2',
            },
            {
              menuValue: 'File Upload',
              route: routes.fileUpload,
              base: 'form-fileupload',
            },
            {
              menuValue: 'Horizontal Timeline',
              route: routes.horizontalTimeline,
              base: 'horizontal-timeline',
            },
            {
              menuValue: 'Form Wizard',
              route: routes.formWizard,
              base: 'form-wizard',
            },

          ],
        },
        {
          menuValue: 'Tables',
          route: routes.tables,
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'table',
          base: 'tables',
          materialicons: 'table_rows',
          subMenus: [
            {
              menuValue: 'Basic Tables',
              route: routes.basictables,
              base: 'tables-basic',
            },
            {
              menuValue: 'Data Tables',
              route: routes.datatables,
              base: 'data-basic',
            },
          ],
        },
      ],
    },
    {
      tittle: 'Extras',
      icon: 'file',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Documentation',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'file-text',
          base: '1',
          materialicons: 'description',
          subMenus: [],
        },
        {
          menuValue: 'Change Log',
          changeLogVersion: true,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'info',
          base: '1',
          materialicons: 'sync_alt',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Crm',
      icon: 'ticket',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Crm',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'ticket',
          base: 'crm',
          materialicons: 'description',
          subMenus: [
            {
              menuValue: 'Companies',
              route: routes.companies,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'crm',


            },
            {
              menuValue: 'Deals',
              route: routes.dealsList,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'crm',
            },
            {
              menuValue: 'Leads',
              route: routes.leadsList,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'leads',
            },
            {
              menuValue: 'Pipeline',
              route: routes.pipeline,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'crm',
            },
            {
              menuValue: 'Analytics',
              route: routes.analytics,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'analytics',
            },
            {
              menuValue: 'Activities',
              route: routes.activities,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'activites',
            },
          ],
        },

      ],
    },

  ];

  public getMenuByUserType(userType: number): any[] {
    switch (userType) {
      case 1: //admin
        return this.sideBar;
      case 2: //user
        return this.userSideBar;
      case 3:
        return this.employeeSideBar;
      default:
        return [];
    }
  }

  public getSideBarData: BehaviorSubject<Array<SideBar>> = new BehaviorSubject<
    Array<SideBar>
  >(this.sideBar);
  public resetData(userType: number): void {
    if (userType === 3)
      this.sideBar = JSON.parse(JSON.stringify(this.employeeSideBar));
    else
      this.sideBar = JSON.parse(JSON.stringify(this.sideBar));

    this.sideBar.map((res: SideBar) => {
      res.showAsTab = false;
      res.menu.map((menus: SideBarMenu) => {
        menus.showSubRoute = false;
      });
    });
    this.getSideBarData.next(this.sideBar);
  }
  public getSideBarData2: BehaviorSubject<Array<HorizontalSideBar>> = new BehaviorSubject<
    Array<HorizontalSideBar>
  >(this.sideBar2);
  public resetData2(): void {
    this.sideBar.map((res: SideBar) => {
      res.showAsTab = false;
      res.menu.map((menus: SideBarMenu) => {
        menus.showSubRoute = false;
      });
    });
  }
  allCustomPolicy = [
    {
      id: 1,
      name: 'John deo',
      days: 5,
    },
  ];

  companiesList = [
    {
      id: 1,
      company: 'Delta Infotech',
    },
    {
      id: 1,
      company: 'Delta Infotech',
    },
    {
      id: 1,
      company: 'Delta Infotech',
    },
    {
      id: 1,
      company: 'Delta Infotech',
    },
    {
      id: 1,
      company: 'Delta Infotech',
    },
  ];

  clientsDatas = [
    {
      name: 'Barry Cuda',
      role: 'CEO',
      company: 'Global Technologies',
      image: 'avatar-19',
      clientId: 'CLT-0008',
      email: 'barrycuda@example.com',
      phone: '9876543210',
      status: 'Active',
      id: 1,
      img: 'assets/img/profiles/avatar-19.jpg',
    },
    {
      name: 'Tressa Wexler',
      role: 'Manager',
      company: 'Delta Infotech',
      image: 'avatar-29',
      clientId: 'CLT-0003',
      email: 'tressawexler@example.com',
      phone: '9876543211',
      status: 'Inactive',
      id: 2,
      img: 'assets/img/profiles/avatar-29.jpg',
    },
    {
      name: 'Ruby Bartlett ',
      role: 'CEO',
      company: 'Cream Inc',
      image: 'avatar-07',
      clientId: 'CLT-0002',
      email: 'rubybartlett@example.com',
      phone: '9876543212',
      status: 'Inactive',
      id: 3,
      img: 'assets/img/profiles/avatar-07.jpg',
    },
    {
      name: 'Misty Tison',
      role: 'CEO',
      company: 'Wellware Company',
      image: 'avatar-06',
      clientId: 'CLT-0001',
      email: 'tisonmisty@example.com',
      phone: '9876543213',
      status: 'Inactive',
      id: 4,
      img: 'assets/img/profiles/avatar-06.jpg',
    },
    {
      name: 'Daniel Deacon',
      role: 'CEO',
      company: 'Mustang Technologies',
      image: 'avatar-14',
      clientId: 'CLT-0006',
      email: 'danieldeacon@example.com',
      phone: '9876543214',
      status: 'Active',
      id: 5,
      img: 'assets/img/profiles/avatar-14.jpg',
    },
    {
      name: 'Walter  Weaver',
      role: 'CEO',
      company: 'International Software',
      image: 'avatar-18',
      clientId: 'CLT-0007',
      email: 'walterweaver@example.com',
      phone: '9876543215',
      status: 'Active',
      id: 6,
      img: 'assets/img/profiles/avatar-18.jpg',
    },
    {
      name: 'Amanda Warren',
      role: 'CEO',
      company: 'Mercury Software Inc',
      image: 'avatar-28',
      clientId: 'CLT-0005',
      email: 'amandawarren@example.com',
      phone: '9876543216',
      status: 'Active',
      id: 7,
      img: 'assets/img/profiles/avatar-28.jpg',
    },
    {
      name: 'Bretty Carlson',
      role: 'CEO',
      company: 'Carlson Technologies',
      image: 'avatar-13',
      clientId: 'CLT-0004',
      email: 'bettycarlson@example.com',
      phone: '9876543217',
      status: 'Inactive',
      id: 8,
      img: 'assets/img/profiles/avatar-13.jpg',
    },
  ];

  projects = [
    {
      name: 'Office Management',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...',
      endDate: '17-04-2023',
      startDate: '17-04-2023',
      priority: 'High',
      projectleader: 'Aravind',
      teamMember: 'Prakash',
      projectId: 'PRO-001',
      id: 1,
    },
    {
      name: 'Hospital Administration',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...',
      endDate: '17-04-2023',
      startDate: '17-04-2023',
      priority: 'High',
      projectleader: 'Ashok',
      teamMember: 'Aravind',
      projectId: 'PRO-001',
      id: 2,
    },
    {
      name: 'Project Management',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...',
      endDate: '17-08-2023',
      startDate: '17-07-2023',
      priority: 'High',
      projectleader: 'vijay',
      teamMember: 'prakash',
      projectId: 'PRO-001',
      id: 3,
    },
    {
      name: 'Video Calling App',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...',
      endDate: '17-04-2023',
      startDate: '17-03-2023',
      priority: 'High',
      projectleader: 'Ashok',
      teamMember: 'Aravind',
      projectId: 'PRO-001',
      id: 4,
    },
    {
      name: 'Project Management',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...',
      endDate: '17-08-2023',
      startDate: '17-07-2023',
      priority: 'High',
      projectleader: 'vijay',
      teamMember: 'prakash',
      projectId: 'PRO-001',
      id: 5,
    },
    {
      name: 'Office Management',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...',
      endDate: '17-04-2023',
      startDate: '17-04-2023',
      priority: 'High',
      projectleader: 'Aravind',
      teamMember: 'Prakash',
      projectId: 'PRO-001',
      id: 6,
    },
  ];

  allKnowledgeBase = [
    {
      title: 'Installation & Activation',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 1,
    },
    {
      title: 'Premium Members Features',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 2,
    },
    {
      title: 'API Usage & Guide lines',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 3,
    },
    {
      title: 'Getting Started',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 4,
    },
    {
      title: 'Lorem ipsum dolor',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 5,
    },
    {
      title: 'Lorem ipsum dolor',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 6,
    },
    {
      title: 'Lorem ipsum dolor',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 7,
    },
    {
      title: 'Lorem ipsum dolor',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 8,
    },
    {
      title: 'Lorem ipsum dolor',
      list1: 'Sed ut perspiciatis unde omnis?',
      list2: 'Sed ut perspiciatis unde omnis?',
      list3: 'Sed ut perspiciatis unde omnis?',
      list4: 'Sed ut perspiciatis unde omnis?',
      list5: 'Sed ut perspiciatis unde omnis?',
      id: 9,
    },
  ];

  allroles = [
    {
      roleName: 'Administrator',
      id: 1,
    },
    {
      roleName: 'CEO',
      id: 2,
    },
    {
      roleName: 'Manager',
      id: 3,
    },
    {
      roleName: 'Team Leader',
      id: 4,
    },
    {
      roleName: 'Accountant',
      id: 5,
    },
    {
      roleName: 'Web Developer',
      id: 6,
    },
    {
      roleName: 'Web Designer',
      id: 7,
    },
    {
      roleName: 'HR',
      id: 8,
    },
    {
      roleName: 'UI/UX Developer',
      id: 9,
    },
    {
      roleName: 'SEO Analyst',
      id: 10,
    },
  ];

  allLeaveType = [
    {
      leaveType: 'Casual Leave',
      leaveDays: '12 Days',
      id: 1,
      status: 'Active',
    },
    {
      leaveType: 'Medical Leave',
      leaveDays: '12 Days',
      id: 2,
      status: 'Inactive',
    },
    {
      leaveType: 'Loss of Pay',
      leaveDays: '10 Days',
      id: 3,
      status: 'Active',
    },
  ];
  lstEmployee = [
    {
      firstname: 'John Doe',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Web Designer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 1,
      img: 'assets/img/profiles/avatar-02.jpg',
    },
    {
      firstname: 'Richard Miles',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Web Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 2,
      img: 'assets/img/profiles/avatar-09.jpg',
    },
    {
      firstname: 'John Smith',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Android Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-05-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 3,
      img: 'assets/img/profiles/avatar-10.jpg',
    },
    {
      firstname: 'Mike Litorus',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'IOS Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 4,
      img: 'assets/img/profiles/avatar-05.jpg',
    },
    {
      firstname: 'Wilmer Deluna',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Team Leader',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 5,
      img: 'assets/img/profiles/avatar-01.jpg',
    },
    {
      firstname: 'Jeffrey Warden',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Web  Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 6,
      img: 'assets/img/profiles/avatar-12.jpg',
    },
    {
      firstname: 'Bernardo Galaviz',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Web  Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 7,
      img: 'assets/img/profiles/avatar-13.jpg',
    },
    {
      firstname: 'Lesley Grauer',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Team Leader',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 8,
      img: 'assets/img/profiles/avatar-16.jpg',
    },
    {
      firstname: 'Jeffery Lalor',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Team Leader',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 9,
      img: 'assets/img/profiles/avatar-16.jpg',
    },
    {
      firstname: 'Loren Gatlin',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Android Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 10,
      img: 'assets/img/profiles/avatar-04.jpg',
    },
    {
      firstname: 'Tarah Shropshire',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Android Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 11,
      img: 'assets/img/profiles/avatar-03.jpg',
    },
    {
      firstname: 'Catherine Manseau',
      lastname: 'Manseau',
      username: 'Manseau',
      password: '123445',
      confirmpassword: '123456',
      department: 'software',
      designation: 'Android Developer',
      phone: '9842354254',
      email: 'catherine@example.com',
      mobile: '9876543210',
      joindate: '18-04-2013',
      role: 'Web Developer',
      employeeId: 'FT-0001',
      company: 'FT-0001',
      id: 12,
      img: 'assets/img/profiles/avatar-08.jpg',
    },
  ];
}
