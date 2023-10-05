import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONSTANTS, MessageType } from '@app/core/constants/app.constants';
import { STORAGE } from '@app/core/constants/storage.constant';
import { LoginResponse } from '@app/core/models/auth.model';
import { AlertToastrService } from '@app/core/services/alert-toastr.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { StorageService } from '@app/core/services/storage.service';
import { UtilityService } from '@app/core/services/utility.service';
import { VcButtonComponent } from '@app/shared/vc-libs/vc-button/vc-button.component';
import { VcInputComponent } from '@app/shared/vc-libs/vc-input/vc-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, VcButtonComponent, VcInputComponent, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isSubmitted = false;
  readonly supportEmail = APP_CONSTANTS.SUPPORT_EMAIL;
  private destroyRef = inject(DestroyRef);

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toasterService: AlertToastrService,
    private utilityService: UtilityService
  ) { }

  onSubmit(loginForm: NgForm): boolean | void {
    if (loginForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.authenticationService.register(loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe((res: LoginResponse) => {
        if (res) {
          this.storageService.set(STORAGE.LOGIN_TOKEN, res.token);
          this.storageService.set(STORAGE.USER_ROLE, res.role);
          this.storageService.set(STORAGE.USER_DATA, res);
          this.utilityService.changeLanguage(res.locale);

          this.router.navigate(['/admin']).then(() => {
            this.toasterService.displaySnackBarWithTranslation(
              'toasterMessage.loggedInSuccessfully', MessageType.success
            );
          });
        }
      });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}



