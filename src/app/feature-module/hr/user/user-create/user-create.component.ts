import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService, routes, StaticService } from 'src/app/core/core.index';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {
  public routes = routes;
  public form!: FormGroup;
  clientId !: string;
  showSpinner = false;
  roles = [
    {id: 2, name: 'Hr User'},
    {id: 3, name: 'Hr Admin'}

  ]
  employeeControl !: FormControl;
  
  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router, private messageService : MessageService,
    private userSerivce : UserService
  ){}
  ngOnInit(): void {
    let unParsedClientId = localStorage.getItem('clientId');
    if (unParsedClientId)
      this.clientId = unParsedClientId;

    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(('^[\u0621-\u064A\a-zA-Z ]+$'))]],
      lastName: ['', [Validators.required, Validators.pattern(('^[\u0621-\u064A\a-zA-Z ]+$'))]],
      email: ['', [Validators.required, Validators.email]],
      //MobileNumber: ["", [Validators.required]],
      linkUserToEmployee: [false],
      role: ['', Validators.required],
      employee: [''],
    });

    this.employeeControl = this.form.get('employee') as FormControl || new FormControl();
  }

  onToggleChange(event: any): void {
    const isChecked = event.checked;
    const mandatoryFieldControl = this.form.get('employee');

    if (isChecked) {
      // Add the required validator if toggle is checked
      mandatoryFieldControl?.setValidators([Validators.required]);
    } else {
      // Remove the required validator if toggle is not checked
      mandatoryFieldControl?.clearValidators();
    }

    // Update the validity of the form control
    mandatoryFieldControl?.updateValueAndValidity();
  }

  checkEmailExists() {
    debugger;
    let email = this.form.get('email')?.value;
    if (email && email !== '') {
      this.showSpinner = true;
      this.authService.doesEmailExist(this.form.get('email')?.value).subscribe(
        (response: any) => {
          this.showSpinner = false;
          if (response && response.isSuccess) {
            if (response.data === true)
              this.form.controls['email'].setErrors({ emailExists: true });
          }
        },
        (error) => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while checking email existance" });
        }
      )
    }
  }

  createUser() {
    debugger;
    this.showSpinner = true;
    let userModel = this.constructUserModel();
    this.userSerivce.createUser(userModel).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "User Created Successfully" });
          setTimeout(() => {
            this.router.navigate([this.routes.userList])
          }, 2000);
        }
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while creating new user" });
      }
    )
  }

  constructUserModel(){
    let employeeId = this.form.get("employee")?.value; 
    return {
      "ClientId": this.clientId,
      "EmployeeErbId": !employeeId || employeeId === '' ? null : employeeId,
      "RoleId": this.form.get("role")?.value,
      "FirstName": this.form.get("firstName")?.value,
      "LastName": this.form.get("lastName")?.value,
      "Email": this.form.get("email")?.value,
    }
  }

}
