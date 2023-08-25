import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import {
  COUNTRY_LIST,
  CURRENCY_LIST,
  LANGUAGE_LIST,
  MessageType,
  REGEX_CONSTANTS,
  RegexType
} from '@constants/app.constants';
import { AllowNumberOnlyDirective } from '@directives/allow-number-only.directive';
import { BreadCrumb } from '@models/breadcrumb.model';
import { AddPartnerForm, PartnerAddress } from '@models/partner.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { PartnerService } from '@services/partner.service';
import { VcEventsService } from '@services/vc-events.service';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';
import { VcInputComponent } from '@vc-libs/vc-input/vc-input.component';
import { VcTelInputComponent } from '@vc-libs/vc-tel-input/vc-tel-input.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-partner-add',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, NgSelectModule, FormsModule, VcButtonComponent, ReactiveFormsModule,
    TranslateModule, AllowNumberOnlyDirective, VcTelInputComponent, VcInputComponent],
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {

  breadcrumbs: BreadCrumb[] = [];
  addPartnerForm: FormGroup<AddPartnerForm>;
  uuid: string;
  isSubmitted = false;

  readonly countryList = COUNTRY_LIST;
  readonly currencyList = CURRENCY_LIST;
  readonly languageList = LANGUAGE_LIST;
  readonly emailRegex = REGEX_CONSTANTS.EMAIL_REGEX;
  readonly webUrlRegex = REGEX_CONSTANTS.WEB_URL_REGEX;
  readonly integerRegex = REGEX_CONSTANTS.INTEGER_REGEX;
  readonly regexType = RegexType;
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private vcEventsService: VcEventsService,
    private partnerService: PartnerService,
    private toasterService: AlertToastrService,
    private router: Router
  ) {
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
    this.uuid = this.route.snapshot.paramMap.get('uuid');
  }

  get formControls(): AddPartnerForm {
    return this.addPartnerForm.controls;
  }

  get addressControls(): PartnerAddress {
    return this.addPartnerForm.controls.address.controls;
  }

  ngOnInit(): void {
    this.vcEventsService.emitBreadcrumbsDetail(this.breadcrumbs);
    this.initializeForm();
  }

  ngAfterViewInit() {
    if (this.uuid) {
      const partnerDetail = this.route.snapshot.data.partnerDetail;
      this.addPartnerForm.patchValue(partnerDetail);
    }
  }

  initializeForm(): void {
    this.addPartnerForm = new FormGroup<AddPartnerForm>({
      isActive: new FormControl(false, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormGroup<PartnerAddress>({
        street: new FormControl('', Validators.required),
        zip: new FormControl('', [Validators.required, Validators.pattern(REGEX_CONSTANTS.ZIP_REGEX)]),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      }),
      companyName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      webAddress: new FormControl(''),
      currency: new FormControl('', Validators.required),
      locale: new FormControl('', Validators.required),
    });
  }

  onSubmit(): boolean | void {
    this.addPartnerForm.markAllAsTouched();
    if (this.addPartnerForm.invalid) {
      return true;
    }
    this.isSubmitted = true;
    if (!this.uuid) {
      this.addPartner();
    } else {
      this.updatePartner();
    }
  }

  addPartner(): void {
    this.partnerService.addPartner(this.addPartnerForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe(() => {
        this.toasterService.displaySnackBarWithTranslation(
          'toasterMessage.addPartnerSuccessful', MessageType.success
        );
        this.navigateToList();
      });
  }

  updatePartner(): void {
    this.partnerService.updatePartnerDetail(this.addPartnerForm.value, this.uuid)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe(() => {
        this.toasterService.displaySnackBarWithTranslation(
          'toasterMessage.deletePartnerSuccessful', MessageType.success
        );
        this.navigateToList();
      });
  }

  navigateToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
