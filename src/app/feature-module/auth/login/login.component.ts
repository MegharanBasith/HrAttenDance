import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService, routes, UserRoleService } from 'src/app/core/core.index';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { TokenService } from 'src/app/core/services/token/token.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  loginForm !: FormGroup;
  showSpinner: boolean = false;
  clientUserType = 1;
  userType = 2;
  employeeUserType = 3;
 
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService,
    private messageService: MessageService, private userRoleService: UserRoleService, private emp: EmployeeService) { }
 
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      domain: ['', [Validators.required]],
    });
  }
 
  login() {
    debugger;
    this.showSpinner = true;
    if (this.loginForm.valid) {
      let login = this.constructLoginModel();
 
      this.authService.login(login).subscribe(
        (response: any) => {
          debugger;
          this.showSpinner = false;
          if (response && response.isSuccess) {
            this.tokenService.setToken(response?.data?.token);
            this.userRoleService.setUserRole(response?.data?.user?.role);
 
            localStorage.setItem("userType", JSON.stringify(response?.data?.user?.userType));
            localStorage.setItem("employeeId", response?.data?.user?.userInfo?.employeeId);
            if (response?.data?.user?.userType === this.clientUserType)
            {
              localStorage.setItem("projectId", response?.data?.user?.userInfo?.projId);
              localStorage.setItem("customerAccount",response?.data?.user?.userInfo?.customerAccount)
              localStorage.setItem("loginName", JSON.stringify(response?.data?.user?.userInfo?.customerName));
            }
            else if (response?.data?.user?.userType === this.employeeUserType)
            {
              localStorage.setItem("projectId", response?.data?.user?.userInfo?.projectID);
              localStorage.setItem("loginName", JSON.stringify(response?.data?.user?.userInfo?.name));
            }
            else{
              localStorage.setItem("projectId", response?.data?.user?.userInfo?.projectId);
              localStorage.setItem("loginName", JSON.stringify(response?.data?.user?.userInfo?.firstName + ' ' +  response?.data?.user?.userInfo?.lastName));
            }
            
            localStorage.setItem("clientId", response?.data?.user?.userInfo?.clientId);
            localStorage.setItem('isLoggedIn', 'true');
            window.dispatchEvent(new Event('storage'));
            this.router.navigate([routes.adminDashboard]);
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "Wrong Credntials" });
          }
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: "An error has ocurred while trying to login" });
        }
      );
    }
    else {
      this.showSpinner = false;
      this.loginForm.markAllAsTouched();
    }
  }
 
  private constructLoginModel() {
    const formValues = this.loginForm.value;
    return {
      DomainName: formValues.domain,
      Email: formValues.email,
      Password: formValues.password,
    };
  }
  public password: boolean[] = [false];
 
  public togglePassword(index: any) {
    this.password[index] = !this.password[index]
  }
}
 