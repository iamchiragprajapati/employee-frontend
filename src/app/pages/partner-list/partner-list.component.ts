import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/core/services/dialog.service';
import {
  COUNTRY_LIST,
  DEBOUNCE_TIME,
  DEFAULT_MAT_DIALOG_CONFIG,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  MessageType,
  PAGE_SIZE,
  PositionEnum,
  SORT_OPTIONS
} from '@constants/app.constants';
import { BreadCrumb } from '@models/breadcrumb.model';
import { PartnerDetail, PartnerList } from '@models/partner.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertToastrService } from '@services/alert-toastr.service';
import { PartnerService } from '@services/partner.service';
import { VcEventsService } from '@services/vc-events.service';
import { VcActionToolbarComponent } from '@vc-libs/vc-action-toolbar/vc-action-toolbar.component';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';
import { VcInputComponent } from '@vc-libs/vc-input/vc-input.component';
import { VcLoaderComponent } from '@vc-libs/vc-loader/vc-loader.component';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslateModule, MatPaginatorModule, MatCheckboxModule,
    VcButtonComponent, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule,
    NgSelectModule, VcLoaderComponent, VcActionToolbarComponent, VcInputComponent],
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  breadcrumbs: BreadCrumb[] = [];
  partnerList = new MatTableDataSource<PartnerDetail>();
  columnLabel = [
    'partnerId', 'companyName', 'street', 'zip', 'city', 'country', 'email', 'phoneNo', 'isActive', 'action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchControl = new FormControl('');
  sortValue = new FormControl('newest');
  searchValue: string;
  isLoading = false;

  readonly pageSizeOptions = PAGE_SIZE;
  readonly sortOptions = SORT_OPTIONS;
  readonly position = PositionEnum;

  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private vcEventsService: VcEventsService,
    private partnerService: PartnerService,
    private router: Router,
    private toasterService: AlertToastrService,
    public translateService: TranslateService,
    private dialogService: DialogService
  ) {
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    this.vcEventsService.emitBreadcrumbsDetail(this.breadcrumbs);
    this.searchData();
    this.getPartnerList();
  }

  searchData(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (value: string) => {
          this.onSearch(value);
        }
      });
  }

  getPartnerList(): void {
    const params = {
      sort: this.sortValue.value,
      pageSize: this.paginator?.pageSize || DEFAULT_PAGE_SIZE,
      page: (this.paginator?.pageIndex + 1) || DEFAULT_PAGE_INDEX,
      ...this.searchValue && { search: this.searchValue }
    };
    this.isLoading = true;
    this.partnerList = new MatTableDataSource([]);
    this.partnerService.getPartnerList(params)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.isLoading = false))
      .subscribe((res: PartnerList) => {
        if (res) {
          res.records.forEach((el: PartnerDetail | any) => {
            COUNTRY_LIST.forEach((country) => {
              if (el.address.country === country.value) {
                el.address.country = `${country.label.charAt(0).toUpperCase()}${country.label.slice(1)}`;
              }
            });
            el.partnerAction = [
              {
                label: 'partner.edit',
                callback: this.editPartner.bind(this)
              },
              {
                label: 'partner.delete',
                callback: this.deletePartner.bind(this)
              },
              {
                label: el.isActive ? 'partner.markAsInactive' : 'partner.markAsActive',
                callback: this.updateStatus.bind(this)
              }
            ];
          });
          this.partnerList = new MatTableDataSource(res.records);
          this.paginator.length = res.totalCount;
        }
      });
  }

  editPartner(row: PartnerDetail): void {
    this.router.navigate([`../${row._id}`], { relativeTo: this.route });
  }

  deletePartner(row: PartnerDetail): void {
    const config = {
      ...DEFAULT_MAT_DIALOG_CONFIG,
      minHeight: '200px'
    };
    this.dialogService.openGenerateCodeDialog(row, config).afterClosed().subscribe((res) => {
      if (res) {
        this.partnerService.deletePartnerDetail(row._id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.toasterService.displaySnackBarWithTranslation(
              'toasterMessage.updateStatusSuccessful', MessageType.success
            );
            const index = this.partnerList.data.findIndex((user) => user._id === row._id);
            this.partnerList.data.splice(index, 1);
            this.partnerList = new MatTableDataSource(this.partnerList.data);
            this.paginator.length = this.partnerList.data.length;
          });
      }
    });
  }

  navigateToDeletePartner(): void {
    this.router.navigate(['../open-dialog'], { relativeTo: this.route });
  }

  updateStatus(row: PartnerDetail): void {
    this.partnerService.updatePartnerDetail({ isActive: !row.isActive }, row._id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toasterService.displaySnackBarWithTranslation(
          'toasterMessage.updateStatusSuccessful', MessageType.success
        );
        this.getPartnerList();
      });
  }

  onSearch(searchValue: string): void {
    this.paginator.firstPage();
    if (
      searchValue &&
      searchValue.trim() !== '' &&
      searchValue.trim().length >= 4
    ) {
      this.searchValue = searchValue;
    } else {
      this.searchValue = '';
    }
    this.getPartnerList();
  }

  navigateToAddPartner(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }
}
