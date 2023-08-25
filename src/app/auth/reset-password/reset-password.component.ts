import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageType, REGEX_CONSTANTS } from '@constants/app.constants';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { AuthenticationService } from '@services/authentication.service';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, VcButtonComponent, RouterModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  isSubmitted = false;
  readonly passwordRegex = REGEX_CONSTANTS.PASSWORD_REGEX;
  private destroyRef = inject(DestroyRef);

  @Input() token!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toasterService: AlertToastrService
  ) { }

  resetPassword(form: NgForm): boolean | void {
    if (form.invalid || (form.value.password !== form.value.confirmPassword)) {
      return true;
    }
    this.isSubmitted = true;
    const payload = {
      id: this.token,
      password: form.value.password
    };
    this.authenticationService.setPassword(payload)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe(() => {
        this.toasterService.displaySnackBarWithTranslation(
          'toasterMessage.setPasswordSuccessful', MessageType.success
        );
        this.router.navigate(['/auth/logout']);
      });
  }
}
