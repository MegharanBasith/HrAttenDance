import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { MessageService } from 'primeng/api';
import { routes } from 'src/app/core/core.index';
import { PasswordService } from 'src/app/core/services/password/password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public changePassword!: FormGroup;
  userId: string = '';
  public routes = routes;
  showSpinner = false;
  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private passwordService: PasswordService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Ensure the account-page class is applied
    this.renderer.addClass(document.body, 'account-page');

    this.changePassword = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
      { validators: this.passwordMatchValidator() });

    // Capture query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || '';
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newPassword = control.get('newPassword')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      return newPassword && confirmPassword && newPassword !== confirmPassword
        ? { passwordMismatch: true }
        : null;
    };
  }

  resetPassword() {
    debugger;
    if(this.changePassword.valid){
    this.showSpinner = true;
    this.passwordService.resetPassword({ "UserId": this.userId, "NewPassword": this.changePassword.get('newPassword')?.value }).subscribe(
      (response: any) => {
        debugger;
        this.showSpinner = false;
        if (response && response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response?.message ?? "password updated successfully" });
          setTimeout(() => {
            this.router.navigate([routes.login])
          }, 2000);
        }
        else if (response && !response.success)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response?.message ?? "An error has occured while updating the password" });
      },
      (error) => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error?.message ?? "An error has occured while updating the password" });
      }
    )
  }
  else
  this.changePassword.markAllAsTouched();
}

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'account-page');
  }
}
