import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '@constants/app.constants';
import { AllowNumberOnlyDirective } from '@directives/allow-number-only.directive';
import { BreadCrumb } from '@models/breadcrumb.model';
import { AddEmployeeForm } from '@models/partner.model';
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
export class PartnerAddComponent implements OnInit, AfterViewInit {

  breadcrumbs: BreadCrumb[] = [];
  addPartnerForm: FormGroup<AddEmployeeForm>;
  uuid: string;
  isSubmitted = false;

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

  get formControls(): AddEmployeeForm {
    return this.addPartnerForm.controls;
  }


  ngOnInit(): void {
    this.vcEventsService.emitBreadcrumbsDetail(this.breadcrumbs);
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.uuid) {
      const partnerDetail = this.route.snapshot.data.partnerDetail.data;
      this.addPartnerForm.patchValue(partnerDetail);
    }
  }

  initializeForm(): void {
    this.addPartnerForm = new FormGroup<AddEmployeeForm>({
      name: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      yearsOfExperience: new FormControl('', Validators.required)
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
      .subscribe((res) => {
        this.toasterService.displaySnackBarWithTranslation(res.message, MessageType.success);
        this.navigateToList();
      });
  }

  updatePartner(): void {
    this.partnerService.updatePartnerDetail(this.addPartnerForm.value, this.uuid)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isSubmitted = false))
      .subscribe((res) => {
        this.toasterService.displaySnackBarWithTranslation(res.message, MessageType.success);
        this.navigateToList();
      });
  }

  navigateToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
