import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FeatureModuleComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../feature-module/main/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./main/apps/apps.module').then((m) => m.AppsModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('../feature-module/employee/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
      {
        path: 'workerDocument',
        loadChildren: () =>
          import('../feature-module/workerDocument/workerDocument.module').then(
            (m) => m.WorkerDocumentModule
          ),
      },
      {
        path: 'payGroup',
        loadChildren: () =>
          import('../feature-module/payGroup/payGroup.module').then(
            (m) => m.PayGroupModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./employee/clients/clients.module').then(
            (m) => m.ClientsModule
          ),
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./employee/tickets/tickets.module').then(
            (m) => m.TicketsModule
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./hr/sales/sales.module').then((m) => m.SalesModule),
      },
      {
        path: 'accounting',
        loadChildren: () =>
          import('./hr/accounting/accounting.module').then(
            (m) => m.AccountingModule
          ),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('./hr/payroll/payroll.module').then((m) => m.PayrollModule),
      },
      {
        path: 'policies',
        loadChildren: () =>
          import('./hr/policies/policies.module').then((m) => m.PoliciesModule),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./hr/reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'performance',
        loadChildren: () =>
          import('./performances/performance/performance.module').then(
            (m) => m.PerformanceModule
          ),
      },

      {
        path: 'training',
        loadChildren: () =>
          import('./performances/training/training.module').then(
            (m) => m.TrainingModule
          ),
      },
      {
        path: 'promotion',
        loadChildren: () =>
          import('./performances/promotion/promotion.module').then(
            (m) => m.PromotionModule
          ),
      },
      {
        path: 'resignation',
        loadChildren: () =>
          import('./performances/resignation/resignation.module').then(
            (m) => m.ResignationModule
          ),
      },
      {
        path: 'termination',
        loadChildren: () =>
          import('./performances/termination/termination.module').then(
            (m) => m.TerminationModule
          ),
      },
      {
        path: 'assets',
        loadChildren: () =>
          import('./administration/assets/assets.module').then(
            (m) => m.AssetsModule
          ),
      },
      {
        path: 'knowledgebase',
        loadChildren: () =>
          import('./administration/knowledgebase/knowledgebase.module').then(
            (m) => m.KnowledgebaseModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./administration/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./administration/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./page/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'subscriptions',
        loadChildren: () =>
          import('./page/subscriptions/subscriptions.module').then(
            (m) => m.SubscriptionsModule
          ),
      },

      {
        path: 'pages',
        loadChildren: () =>
          import('./page/pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'elements',
        loadChildren: () =>
          import('./ui-interface/elements/elements.module').then(
            (m) => m.ElementsModule
          ),
      },
      {
        path: 'icon',
        loadChildren: () =>
          import('./ui-interface/icon/icon.module').then((m) => m.IconModule),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./ui-interface/charts/charts.module').then(
            (m) => m.ChartsModule
          ),
      },
      {
        path: 'base-ui',
        loadChildren: () =>
          import('./ui-interface/base-ui/base-ui.module').then(
            (m) => m.BaseUiModule
          ),
      },
      {
        path: 'table',
        loadChildren: () =>
          import('./ui-interface/table/table.module').then(
            (m) => m.TableModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./ui-interface/forms/forms.module').then(
            (m) => m.FormsModule
          ),
      },
      {
        path: 'advanced-ui',
        loadChildren: () =>
          import('./ui-interface/advanced-ui/advanced-ui.module').then(
            (m) => m.AdvancedUiModule
          ),
      },
      {
        path: 'crm',
        loadChildren: () => import('./crm/crm.module').then((m) => m.CrmModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('../feature-module/employee/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'goals',
        loadChildren: () =>
          import('./performances/goals/goals.module').then(
            (m) => m.GoalsModule
          ),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('../feature-module/administration/jobs/jobs.module').then(
            (m) => m.JobsModule
          ),
      },
      {
        path: 'payment-order',
        loadChildren: () =>
          import('./hr/payment-order/payment-order.module').then((m) => m.PaymentOrderModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./hr/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./auth/otp/otp.module').then((m) => m.OtpModule),
  },
  {
    path: 'lock-screen',
    loadChildren: () =>
      import('./auth/lock-screen/lock-screen.module').then(
        (m) => m.LockScreenModule
      ),
  },
  {
    path: 'error-403',
    loadChildren: () =>
      import('./page/error-pages/error403/error403.module').then(
        (m) => m.Error403Module
      ),
  },
  {
    path: 'error-404',
    loadChildren: () =>
      import('./page/error-pages/error404/error404.module').then(
        (m) => m.Error404Module
      ),
  },
  {
    path: 'error-500',
    loadChildren: () =>
      import('./page/error-pages/error500/error500.module').then(
        (m) => m.Error500Module
      ),
  },
  {
    path: 'leads',
    loadChildren: () =>
      import('./crm/leads/leads.module').then((m) => m.LeadsModule),
  },
  { path: '**', redirectTo: 'admin/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule {}
