import { BehaviorSubject } from 'rxjs';

export class routes {
  public static layoutDirection: BehaviorSubject<string> =
    new BehaviorSubject<string>(localStorage.getItem('rtl') || '');
  private static Url = '';
  static rtl = this.layoutDirection.subscribe((res: string) => {
    this.Url = res;
  });

  public static get baseUrl(): string {
    return this.Url;
  }
  public static get login(): string {
    return this.baseUrl + '/login';
  }
  public static get forgot_password(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  public static get lock_screen(): string {
    return this.baseUrl + '/lock-screen';
  }
  public static get dashboard(): string {
    return this.baseUrl + '/dashboard';
  }
  public static get baseUi(): string {
    return this.baseUrl + '/base-ui';
  }

  public static get admin(): string {
    return this.baseUrl + '/dashboard/admin';
  }
  public static get employee(): string {
    return this.baseUrl + '/dashboard/employee';
  }

  public static get apps(): string {
    return this.baseUrl + '/apps';
  }
  public static get chat(): string {
    return this.baseUrl + '/apps/chats';
  }
  public static get voicecall(): string {
    return this.baseUrl + '/apps/voice-call';
  }
  public static get videocall(): string {
    return this.baseUrl + '/apps/video-call';
  }
  public static get outgoingcall(): string {
    return this.baseUrl + '/apps/outgoing-call';
  }
  public static get incomingcall(): string {
    return this.baseUrl + '/apps/incoming-call';
  }
  public static get contacts(): string {
    return this.baseUrl + '/apps/contacts';
  }
  public static get calendar(): string {
    return this.baseUrl + '/apps/calendar';
  }
  public static get email(): string {
    return this.baseUrl + '/apps/email';
  }
  public static get filemanager(): string {
    return this.baseUrl + '/apps/file-manager';
  }
  public static get employees(): string {
    return this.baseUrl + '/employees';
  }
  public static get employee_page(): string {
    return this.baseUrl + '/employees/employee-page';
  }
  public static get employeeList(): string {
    return this.baseUrl + '/employees/employee-list';
  }
  public static get employeeBankAccountCreate(): string {
    return this.baseUrl + '/employees/employee-bank-account/create';
  }
  public static get employeeBankAccountEdit(): string {
    return this.baseUrl + '/employees/employee-bank-account/edit';
  }
  public static get employeeCreate(): string {
    return this.baseUrl + '/employees/employee-create';
  }
  public static get employeeEdit(): string {
    return this.baseUrl + '/employees/employee-edit';
  }
  public static get holidays(): string {
    return this.baseUrl + '/employees/holidays';
  }
  public static get leavelist(): string {
    return this.baseUrl + '/employees/leave-list';
  }

  public static get leaveemployee(): string {
    return this.baseUrl + '/employees/leave-employee';
  }
  public static get leavesettings(): string {
    return this.baseUrl + '/employees/leave-settings';
  }
  public static get leaveCreate(): string {
    return this.baseUrl + '/employees/leave-create';
  }
  public static get leaveEdit(): string {
    return this.baseUrl + '/employees/leave-edit';
  }
  public static get eoslist(): string {
    return this.baseUrl + '/employees/eos/eos-list';
  }
  public static get eosadd(): string {
    return this.baseUrl + '/employees/eos/eos-add';
  }
  public static get eosedit(): string {
    return this.baseUrl + '/employees/eos/eos-edit';
  }
  public static get businessTripList(): string {
    return this.baseUrl + '/employees/business-trip-list';
  }
  public static get attendanceadmin(): string {
    return this.baseUrl + '/employees/attendance-admin';
  }
  public static get attendanceemployee(): string {
    return this.baseUrl + '/employees/attendance-employee';
  }
  public static get departments(): string {
    return this.baseUrl + '/employees/departments';
  }
  public static get designations(): string {
    return this.baseUrl + '/employees/designations';
  }
  public static get timesheet(): string {
    return this.baseUrl + '/employees/timesheet';
  }
  public static get shiftschedule(): string {
    return this.baseUrl + '/employees/shift-schedule';
  }
  public static get overtime(): string {
    return this.baseUrl + '/employees/overtime';
  }
  public static get earningDeductionList(): string {
    return this.baseUrl + '/employees/earning-deduction/list';
  }
  public static get earningDeductionCreate(): string {
    return this.baseUrl + '/employees/earning-deduction/create';
  }
  public static get earningDeductionEdit(): string {
    return this.baseUrl + '/employees/earning-deduction/edit';
  }
  public static get clientPage(): string {
    return this.baseUrl + '/clients/client-page';
  }
  public static get projects(): string {
    return this.baseUrl + '/projects';
  }
  public static get projectpage(): string {
    return this.baseUrl + '/projects/project-page';
  }
  public static get tasks(): string {
    return this.baseUrl + '/projects/tasks';
  }
  public static get taskboard(): string {
    return this.baseUrl + '/projects/task-board';
  }
  public static get ticketpage(): string {
    return this.baseUrl + '/tickets/ticket-page';
  }
  public static get sales(): string {
    return this.baseUrl + '/sales';
  }
  public static get estimatepage(): string {
    return this.baseUrl + '/sales/estimate-page';
  }
  public static get invoicepage(): string {
    return this.baseUrl + '/sales/invoice-page';
  }
  public static get payments(): string {
    return this.baseUrl + '/sales/payments';
  }
  public static get expenses(): string {
    return this.baseUrl + '/sales/expenses';
  }
  public static get providentfund(): string {
    return this.baseUrl + '/sales/provident-fund';
  }
  public static get taxes(): string {
    return this.baseUrl + '/sales/taxes';
  }
  public static get accounting(): string {
    return this.baseUrl + '/accounting';
  }
  public static get category(): string {
    return this.baseUrl + '/accounting/category';
  }
  public static get subcategory(): string {
    return this.baseUrl + '/accounting/sub-category';
  }
  public static get budgets(): string {
    return this.baseUrl + '/accounting/budgets';
  }
  public static get budgetexpenses(): string {
    return this.baseUrl + '/accounting/budget-expenses';
  }
  public static get budgetrevenues(): string {
    return this.baseUrl + '/accounting/budget-revenues';
  }
  public static get payroll(): string {
    return this.baseUrl + '/payroll';
  }
  public static get employeesalary(): string {
    return this.baseUrl + '/payroll/employee-salary';
  }
  public static get payrollitems(): string {
    return this.baseUrl + '/payroll/payroll-items';
  }
  public static get salaryview(): string {
    return this.baseUrl + '/payroll/salary-view';
  }
  public static get policies(): string {
    return this.baseUrl + '/policies/main';
  }
  public static get reports(): string {
    return this.baseUrl + '/reports';
  }
  public static get expensereport(): string {
    return this.baseUrl + '/reports/expense-report';
  }
  public static get invoicereport(): string {
    return this.baseUrl + '/reports/invoice-report';
  }
  public static get paymentsreport(): string {
    return this.baseUrl + '/reports/payments-report';
  }
  public static get projectreport(): string {
    return this.baseUrl + '/reports/project-report';
  }
  public static get taskreport(): string {
    return this.baseUrl + '/reports/task-report';
  }
  public static get userreport(): string {
    return this.baseUrl + '/reports/user-report';
  }
  public static get employeereport(): string {
    return this.baseUrl + '/reports/employee-report';
  }
  public static get payslipreport(): string {
    return this.baseUrl + '/reports/payslip-report';
  }
  public static get attendancereport(): string {
    return this.baseUrl + '/reports/attendance-report';
  }
  public static get leavereport(): string {
    return this.baseUrl + '/reports/leave-report';
  }
  public static get dailyreport(): string {
    return this.baseUrl + '/reports/daily-report';
  }
  public static get performance(): string {
    return this.baseUrl + '/performance';
  }
  public static get appraisal(): string {
    return this.baseUrl + '/performance/appraisal';
  }
  public static get indicator(): string {
    return this.baseUrl + '/performance/indicator';
  }
  public static get review(): string {
    return this.baseUrl + '/performance/review';
  }
  public static get crosshairs(): string {
    return this.baseUrl + '/goals';
  }
  public static get goalTracking(): string {
    return this.baseUrl + '/goals/goal-tracking';
  }
  public static get goalType(): string {
    return this.baseUrl + '/goals/goal-type';
  }
  public static get training(): string {
    return this.baseUrl + '/training';
  }
  public static get lists(): string {
    return this.baseUrl + '/training/lists';
  }
  public static get types(): string {
    return this.baseUrl + '/training/types';
  }
  public static get trainer(): string {
    return this.baseUrl + '/training/trainer';
  }
  public static get promotion(): string {
    return this.baseUrl + '/promotion/views';
  }
  public static get resignation(): string {
    return this.baseUrl + '/resignation/res-main';
  }
  public static get termination(): string {
    return this.baseUrl + '/termination/term-main';
  }
  public static get assets(): string {
    return this.baseUrl + '/assets/assets-main';
  }
  public static get jobs(): string {
    return this.baseUrl + '/jobs';
  }
  public static get userDashboard(): string {
    return this.baseUrl + '/jobs/user-dashboard';
  }
  public static get jobsdashboard(): string {
    return this.baseUrl + '/jobs/jobs-dashboard';
  }
  public static get managejobs(): string {
    return this.baseUrl + '/jobs/manage-jobs';
  }
  public static get manageresumes(): string {
    return this.baseUrl + '/jobs/manage-resumes';
  }
  public static get shortlist(): string {
    return this.baseUrl + '/jobs/shortlist';
  }

  public static get jobview(): string {
    return this.baseUrl + '/jobs/job-view';
  }
  public static get interviewquestions(): string {
    return this.baseUrl + '/jobs/interview-questions';
  }
  public static get offerapproval(): string {
    return this.baseUrl + '/jobs/offer-approval';
  }
  public static get experiencelevel(): string {
    return this.baseUrl + '/jobs/experience-level';
  }
  public static get candidateslist(): string {
    return this.baseUrl + '/jobs/candidates-list';
  }
  public static get scheduletiming(): string {
    return this.baseUrl + '/jobs/schedule-timing';
  }
  public static get aptituderesult(): string {
    return this.baseUrl + '/jobs/aptitude-result';
  }
  public static get appliedcandidates(): string {
    return this.baseUrl + '/jobs/applied-candidates';
  }
  public static get knowledgebasemain(): string {
    return this.baseUrl + '/knowledgebase/main';
  }
  public static get activities(): string {
    return this.baseUrl + '/crm/activities';
  }
  public static get users(): string {
    return this.baseUrl + '/users/user-view';
  }
  public static get companysettings(): string {
    return this.baseUrl + '/settings/company-settings';
  }
  public static get profile(): string {
    return this.baseUrl + '/profile';
  }
  public static get employeeProfile(): string {
    return this.baseUrl + '/employees/employee-profile';
  }
  public static get clientProfile(): string {
    return this.baseUrl + '/clients/client-profile';
  }
  public static get loginpro(): string {
    return this.baseUrl + '/login';
  }
  public static get registers(): string {
    return this.baseUrl + '/register';
  }
  public static get forgotpassword(): string {
    return this.baseUrl + '/forgot-password';
  }
  public static get otp(): string {
    return this.baseUrl + '/otp';
  }
  public static get lockscreen(): string {
    return this.baseUrl + '/lock-screen';
  }
  public static get forbidenError(): string {
    return this.baseUrl + '/error-403';
  }
  public static get error(): string {
    return this.baseUrl + '/error-404';
  }
  public static get errors(): string {
    return this.baseUrl + '/error-500';
  }
  public static get subscriptions(): string {
    return this.baseUrl + '/subscriptions';
  }
  public static get subadmin(): string {
    return this.baseUrl + '/subscriptions/admins';
  }
  public static get subscribedcompanies(): string {
    return this.baseUrl + '/subscriptions/subscribed-companies';
  }
  public static get pages(): string {
    return this.baseUrl + '/pages';
  }
  public static get search(): string {
    return this.baseUrl + '/pages/search';
  }
  public static get faq(): string {
    return this.baseUrl + '/pages/faq';
  }
  public static get terms(): string {
    return this.baseUrl + '/pages/terms';
  }
  public static get privacy(): string {
    return this.baseUrl + '/pages/privacy-policy';
  }
  public static get blankpage(): string {
    return this.baseUrl + '/pages/blank-page';
  }
  public static get components(): string {
    return this.baseUrl + '/components';
  }
  public static get forms(): string {
    return this.baseUrl + '/forms';
  }
  public static get basicinput(): string {
    return this.forms + '/form-basic-inputs';
  }
  public static get inputgroups(): string {
    return this.forms + '/form-input-groups';
  }
  public static get horizontalform(): string {
    return this.forms + '/form-horizontal';
  }
  public static get verticalform(): string {
    return this.forms + '/form-vertical';
  }
  public static get formmask(): string {
    return this.forms + '/form-mask';
  }
  public static get formvalidation(): string {
    return this.forms + '/form-validation';
  }
  public static get fileUpload(): string {
    return this.forms + '/form-fileupload';
  }
  public static get formSelect2(): string {
    return this.forms + '/form-select-2';
  }
  public static get tables(): string {
    return this.baseUrl + '/tables';
  }
  public static get basictables(): string {
    return this.baseUrl + '/table/tables-basic';
  }
  public static get datatables(): string {
    return this.baseUrl + '/table/data-basic';
  }
  public static get userAssetsDetails(): string {
    return this.baseUrl + '/assets/user-assets-details';
  }
  public static get assetsDetails(): string {
    return this.baseUrl + '/assets/assets-details';
  }
  public static get adminDashboard(): string {
    return this.baseUrl + '/dashboard/admin';
  }
  public static get jobAptitude(): string {
    return this.baseUrl + '/jobs/job-aptitude';
  }
  public static get mailView(): string {
    return this.baseUrl + '/apps/mailview';
  }
  public static get compose(): string {
    return this.baseUrl + '/apps/compose';
  }
  public static get projectView(): string {
    return this.baseUrl + '/projects/project-view';
  }
  public static get jobDetails(): string {
    return this.baseUrl + '/jobs/jobs-details';
  }
  public static get userAllJobs(): string {
    return this.baseUrl + '/jobs/user-all-jobs';
  }
  public static get savedJobs(): string {
    return this.baseUrl + '/jobs/saved-jobs';
  }
  public static get appliedJobs(): string {
    return this.baseUrl + '/jobs/applied-jobs';
  }
  public static get interviewJobs(): string {
    return this.baseUrl + '/jobs/interview-jobs';
  }
  public static get offeredJobs(): string {
    return this.baseUrl + '/jobs/offered-jobs';
  }
  public static get visitedJobs(): string {
    return this.baseUrl + '/jobs/visited-jobs';
  }
  public static get archivedJobs(): string {
    return this.baseUrl + '/jobs/archived-jobs';
  }
  public static get projectList(): string {
    return this.baseUrl + '/projects/project-list';
  }
  public static get jobList(): string {
    return this.baseUrl + '/jobs/job-list';
  }
  public static get advancedUi(): string {
    return this.baseUrl + '/advanced-ui';
  }
  public static get ribbon(): string {
    return this.advancedUi + '/ui-ribbon';
  }
  public static get clipboards(): string {
    return this.advancedUi + '/ui-clipboard';
  }
  public static get dragDrop(): string {
    return this.advancedUi + '/ui-drag-drop';
  }
  public static get rating(): string {
    return this.advancedUi + '/ui-rating';
  }
  public static get textEditor(): string {
    return this.advancedUi + '/ui-text-editor';
  }
  public static get counter(): string {
    return this.advancedUi + '/ui-counter';
  }
  public static get scrollbar(): string {
    return this.advancedUi + '/ui-scrollbar';
  }
  public static get notification(): string {
    return this.advancedUi + '/notification';
  }
  public static get stickyNote(): string {
    return this.advancedUi + '/sticky-note';
  }
  public static get timeline(): string {
    return this.advancedUi + '/ui-timeline';
  }
  public static get horizontal(): string {
    return this.advancedUi + '/horizontal-timeline';
  }
  public static get formWizard(): string {
    return this.forms + '/form-wizard';
  }
  public static get charts(): string {
    return this.baseUrl + '/charts';
  }
  public static get apexChart(): string {
    return this.charts + '/apex-charts';
  }
  public static get ngTwoCharts(): string {
    return this.charts + '/ng2-charts';
  }
  public static get icon(): string {
    return this.baseUrl + '/icon';
  }
  public static get fontawesome(): string {
    return this.icon + '/fontawesome';
  }
  public static get feather(): string {
    return this.icon + '/feather';
  }
  public static get ionic(): string {
    return this.icon + '/ionic';
  }
  public static get material(): string {
    return this.icon + '/material';
  }
  public static get pe7(): string {
    return this.icon + '/pe7';
  }
  public static get themify(): string {
    return this.icon + '/themify';
  }
  public static get typicon(): string {
    return this.icon + '/typicon';
  }
  public static get weather(): string {
    return this.icon + '/weather';
  }
  public static get simpleLine(): string {
    return this.icon + '/simple-line';
  }
  public static get flag(): string {
    return this.icon + '/flag';
  }
  public static get alert(): string {
    return this.baseUi + '/ui-alerts';
  }
  public static get accordions(): string {
    return this.baseUi + '/ui-accordion';
  }
  public static get avatar(): string {
    return this.baseUi + '/ui-avatar';
  }
  public static get badges(): string {
    return this.baseUi + '/ui-badges';
  }
  public static get buttons(): string {
    return this.baseUi + '/ui-buttons';
  }
  public static get buttonGroup(): string {
    return this.baseUi + '/ui-buttons-group';
  }
  public static get breadcrumb(): string {
    return this.baseUi + '/ui-breadcrumb';
  }
  public static get cards(): string {
    return this.baseUi + '/ui-cards';
  }
  public static get carousel(): string {
    return this.baseUi + '/ui-carousel';
  }
  public static get dropDown(): string {
    return this.baseUi + '/ui-dropdowns';
  }
  public static get grid(): string {
    return this.baseUi + '/ui-grid';
  }
  public static get images(): string {
    return this.baseUi + '/ui-images';
  }
  public static get lightBox(): string {
    return this.baseUi + '/ui-lightbox';
  }
  public static get media(): string {
    return this.baseUi + '/ui-media';
  }
  public static get modal(): string {
    return this.baseUi + '/ui-modals';
  }
  public static get offcanvas(): string {
    return this.baseUi + '/ui-offcanvas';
  }
  public static get pagination(): string {
    return this.baseUi + '/ui-pagination';
  }
  public static get placeholder(): string {
    return this.baseUi + '/ui-placeholders';
  }
  public static get popover(): string {
    return this.baseUi + '/ui-popover';
  }
  public static get progressBars(): string {
    return this.baseUi + '/ui-progress';
  }
  public static get rangeSlider(): string {
    return this.baseUi + '/ui-rangeslider';
  }
  public static get spinner(): string {
    return this.baseUi + '/ui-spinner';
  }
  public static get tabs(): string {
    return this.baseUi + '/ui-tabs';
  }
  public static get sweetAlert(): string {
    return this.baseUi + '/ui-sweet-alerts';
  }
  public static get toasts(): string {
    return this.baseUi + '/ui-toasts';
  }
  public static get tooltip(): string {
    return this.baseUi + '/ui-tooltips';
  }
  public static get typography(): string {
    return this.baseUi + '/ui-typography';
  }
  public static get video(): string {
    return this.baseUi + '/ui-video';
  }
  public static get crm(): string {
    return this.baseUrl + '/crm';
  }
  public static get pipeline(): string {
    return this.crm + '/pipeline';
  }
  public static get deals(): string {
    return this.crm + '/deals';
  }
  public static get dealsDetails(): string {
    return this.crm + '/deals/deals-details';
  }
  public static get dealsDashboard(): string {
    return this.baseUrl + '/dashboard/deals';
  }
  public static get leadDashboard(): string {
    return this.baseUrl + '/dashboard/leads';
  }
  public static get ticketDetails(): string {
    return this.baseUrl + '/tickets/ticket-details';
  }
  public static get contact(): string {
    return this.baseUrl + '/contact';
  }
  public static get contactDetails(): string {
    return this.crm + '/contact/contact-details';
  }
  public static get contactList(): string {
    return this.crm + '/contact/contact-list';
  }
  public static get contactGrid(): string {
    return this.crm + '/contact/contact-grid';
  }
  public static get companies(): string {
    return this.crm + '/company/companies';
  }
  public static get companiesGrid(): string {
    return this.crm + '/company/companies-grid';
  }
  public static get companyDetails(): string {
    return this.crm + '/company/company-details';
  }
  public static get analytics(): string {
    return this.crm + '/analytics';
  }
  public static get dealsList(): string {
    return this.crm + '/deals/deals-list';
  }
  public static get leadsKanban(): string {
    return this.crm + '/leads/leads-kanban';
  }
  public static get dealsKanban(): string {
    return this.crm + '/deals/deals-kanban';
  }
  public static get leadsList(): string {
    return this.crm + '/leads/leads-list';
  }
  public static get leadsDetails(): string {
    return this.crm + '/leads/leads-details';
  }
  public static get leads(): string {
    return this.crm + '/leads';
  }
  public static get companySubscriptions(): string {
    return this.baseUrl + '/subscriptions/company';
  }
  public static get emailview(): string {
    return this.baseUrl + '/apps/mailview';
  }
  public static get color(): string {
    return this.baseUi + '/ui-colors';
  }

  public static get chartPrime(): string {
    return this.charts + '/prime-ng';
  }
  public static get horizontalTimeline(): string {
    return this.forms + '/horizontal-timeline';
  }
  public static get editInvoice(): string {
    return this.baseUrl + '/sales/edit-invoice';
  }
  public static get comingSoon(): string {
    return this.baseUrl + '/pages/coming-soon';
  }
  public static get underMaintanance(): string {
    return this.baseUrl + '/pages/under-maintenance';
  }
  public static get changePassword(): string {
    return this.baseUrl + '/change-password';
  }
  public static get timesheetLines(): string {
    return this.baseUrl + '/employees/timesheet-lines';
  }
  public static get salaryCalculationList(): string {
    return this.baseUrl + '/employees/salary-calculation-list';
  }
  public static get salaryCalculationLineList(): string {
    return this.baseUrl + '/employees/salary-calculation-lines';
  }
  public static get paymentOrder(): string {
    return this.baseUrl + '/payment-order';
  }
  public static get paymnetOrderList(): string {
    return this.baseUrl + '/payment-order/list';
  }
  public static get paymentOrderLines(): string {
    return this.baseUrl + '/payment-order/lines';
  }
  public static get businessTripCreate(): string {
    return this.baseUrl + '/employees/business-trip-create';
  }
  public static get businessTripEdit(): string {
    return this.baseUrl + '/employees/business-trip-edit';
  }
  public static get workerDocumentList(): string {
    return this.baseUrl + '/workerDocument/workerDoc-list';
  }

  public static get workerDocumentExpiredList(): string {
    return this.baseUrl + '/workerDocument/workerDoc-expired';
  }

  public static get workerDocumentCreate(): string {
    return this.baseUrl + '/workerDocument/workerDoc-create';
  }

  public static get workerDocumentEdit(): string {
    return this.baseUrl + '/workerDocument/workerDoc-edit';
  }

  public static get payGroupPeriodList(): string {
    return this.baseUrl + '/payGroup/payGroupPeriod-list';
  }

  public static get myattendance():string{
    return this.baseUrl + '/employees/myattendance';
  }

  public static get allattendance():string{
    return this.baseUrl + '/employees/allattendance';
  }
  public static get mysettings():string{
    return this.baseUrl+'/employees/mysettings';
  }
  public static get settings():string{
    return this.baseUrl+'/employees/settings';
  }
  public static get loanList(): string {
    return this.baseUrl + '/employees/loan-list';
  }

  public static get loancreate(): string {
    return this.baseUrl + '/employees/loan-create';
  }

  public static get loanedit(): string {
    return this.baseUrl + '/employees/loan-edit';
  }
  public static get userList(): string {
    return this.baseUrl + '/user/list';
  }
  public static get userCreate(): string {
    return this.baseUrl + '/user/create';
  }
  public static get employeeContractList(): string {
    return this.baseUrl + '/employees/employee-contract/list';
  }
  public static get employeeContractEdit(): string {
    return this.baseUrl + '/employees/employee-contract/edit';
  }

}
