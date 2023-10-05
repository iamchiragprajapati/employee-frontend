import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONSTANTS, MessageType } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { AuthenticationService } from '@services/authentication.service';
import { StorageService } from '@services/storage.service';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';
import { VcInputComponent } from '@vc-libs/vc-input/vc-input.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, VcButtonComponent, VcInputComponent, TranslateModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  isSubmitted = false;
  readonly supportEmail = APP_CONSTANTS.SUPPORT_EMAIL;
  private destroyRef = inject(DestroyRef);

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toasterService: AlertToastrService,
  ) { }

  onSubmit(loginForm: NgForm): boolean | void {
    if (loginForm.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.authenticationService.login(loginForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe((res: any) => {

        if (res) {
          this.storageService.set(STORAGE.LOGIN_TOKEN, res.token);
          this.storageService.set(STORAGE.USER_DATA, res.data);
          this.router.navigate(['/admin']).then(() => {
            this.toasterService.displaySnackBarWithTranslation(
              res.message, MessageType.success
            );
          });
        }
      });
  }

  navigateTo(path: string) {
    this.router.navigate([`/auth/${path}`]);
  }
}
