import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/core.index";
import { routes } from "src/app/core/helpers/routes/routes";
import { Signup } from "src/app/core/models/signup"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public routes = routes;
  registerForm !: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      customerNumber: ['', [Validators.required]],
      //mobile: ['', [Validators.required]],
      //companyName: ['', [Validators.required]],
      domainName: ['', [Validators.required]],
      //numberOfEmployees: [''],
    }, { validator: this.passwordMatchValidator });
  }

  signup() {
    if (this.registerForm.valid) {
      let signup = this.constructSignupModel();

      this.authService.signup(signup).subscribe(
        response => {
          console.log(response);
          this.navigate();
        },
        error => {
         console.log(error);
        }
      );
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  navigate() {
    if (this.registerForm.valid) {
      // Handle form submission
      this.router.navigate([routes.login]);
    } else {
      this.registerForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    debugger;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  private constructSignupModel(): Signup {
    const formValues = this.registerForm.value;
    return {
      //CompanyName: formValues.companyName,
      CustomerNumber : formValues.customerNumber,
      DomainName: formValues.domainName,
      Email: formValues.email,
      //MobileNumber: formValues.mobile,
      Name: formValues.name,
      Password: formValues.password,
      //NumberOfEmployees: formValues.numberOfEmployees
    };
  }
}

