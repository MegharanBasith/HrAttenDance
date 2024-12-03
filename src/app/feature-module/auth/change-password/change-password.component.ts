import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CommonService } from 'src/app/shared/common/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  public changePassword!: FormGroup;
  public routes = routes;

  ngOnInit() {
    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  base = '';
  page = '';
  last = '';
  constructor(
    private router: Router,
    private common: CommonService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    if (this.base == 'change-password') {
      this.renderer.addClass(document.body, 'account-page');
    }
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'account-page');
  }
}
