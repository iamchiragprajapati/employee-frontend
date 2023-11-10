import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType, allowedImageFileType } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { UserDataModel } from '@models/auth.model';
import { BreadCrumb } from '@models/breadcrumb.model';
import { TranslateModule } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { PartnerService } from '@services/partner.service';
import { StorageService } from '@services/storage.service';
import { VcEventsService } from '@services/vc-events.service';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';
import { VcInputComponent } from '@vc-libs/vc-input/vc-input.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, TranslateModule, VcInputComponent, VcButtonComponent, ReactiveFormsModule,
    NgTemplateOutlet],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  breadcrumbs: BreadCrumb[] = [];
  addPartnerForm: FormGroup<any>;
  isSubmitted = false;
  imgUrl: string | ArrayBuffer;
  userData: UserDataModel;
  uuid: string;

  get formControls(): any {
    return this.addPartnerForm.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vcEventsService: VcEventsService,
    private toasterService: AlertToastrService,
    private partnerService: PartnerService,
    private storageService: StorageService
  ) {
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
    this.userData = this.storageService.get(STORAGE.USER_DATA);
    this.uuid = this.route.snapshot.paramMap.get('uuid');
  }

  ngOnInit(): void {
    this.vcEventsService.emitBreadcrumbsDetail(this.breadcrumbs);
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    const profileDetails = this.route.snapshot.data.profileDetails.data;
    this.imgUrl = 'data:image/png;base64,' + profileDetails.img;
    this.addPartnerForm.patchValue(profileDetails);
  }

  initializeForm(): void {
    this.addPartnerForm = new FormGroup({
      img: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  navigateToList(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  onFileChange(event: Event, controlArray: FormControl) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const reader = new FileReader();
    const img = new Image();

    if (files[0].size > 5_242_880) {
      this.toasterService.displaySnackBarWithTranslation('greeting.imageSizeValidation', MessageType.error);
      return;
    } else if (!allowedImageFileType.includes(files[0].type)) {
      this.toasterService.displaySnackBarWithTranslation('greeting.assetTypeValidation', MessageType.error);
      return;
    } else {
      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {

          this.imgUrl = reader.result;
          this.setInputFileVal(files, controlArray);
        };
      };
    }
    reader.readAsDataURL(files[0]);
  }

  setInputFileVal(files, controlArray: FormControl): void {
    files.length ? controlArray.patchValue(files) : controlArray.markAsTouched();
  }

  onSubmit(): boolean | void {
    this.addPartnerForm.markAllAsTouched();
    if (this.addPartnerForm.invalid) return;
    const formData = new FormData();
    for (const field in this.formControls) {
      const control = this.addPartnerForm.get(field);
      const value = control?.value;
      if (value) {
        if (value instanceof FileList) {
          formData.append(field, value[0]);
        } else {
          formData.append(field, value);
        }
      }
    }
    this.partnerService.uploadProfilePic(formData).subscribe(
      (res) => {
        console.log(res);
        this.toasterService.displaySnackBarWithoutTranslation(res.message, MessageType.success);
      }
    );

  }

}
