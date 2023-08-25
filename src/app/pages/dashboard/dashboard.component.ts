import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  AccountingStatus,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  MessageType,
  PAGE_SIZE,
  SORT_OPTIONS
} from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import {
  DashboardAccountingStats,
  InvoiceDetail,
  InvoiceList,
  PerformanceOverview,
  RedemptionDetail,
  RedemptionList,
  TopPartners
} from '@models/admin.model';
import { LoginResponse } from '@models/auth.model';
import { BreadCrumb } from '@models/breadcrumb.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminService } from '@services/admin.service';
import { AlertToastrService } from '@services/alert-toastr.service';
import { PartnerService } from '@services/partner.service';
import { StorageService } from '@services/storage.service';
import { UtilityService } from '@services/utility.service';
import { VcEventsService } from '@services/vc-events.service';
import { VcActionToolbarComponent } from '@vc-libs/vc-action-toolbar/vc-action-toolbar.component';
import { VcLoaderComponent } from '@vc-libs/vc-loader/vc-loader.component';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, NgSelectModule, FormsModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, VcLoaderComponent, NgChartsModule, VcActionToolbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  breadcrumbs: BreadCrumb[] = [];
  latestRedemptionList = new MatTableDataSource<RedemptionDetail>();
  openInvoiceList = new MatTableDataSource<InvoiceDetail>();
  columnLabel = [
    'affiliatePartner', 'cardType', 'cardCode', 'date', 'shopOrderNumber', 'shopStatus', 'billingPositions', 'action'
  ];
  invoiceColumnLabel = ['affiliatePartner', 'accountingDate', 'billable', 'status'];
  @ViewChild('redemptionPaginator') redemptionPaginator: MatPaginator;
  @ViewChild('invoicePaginator') invoicePaginator: MatPaginator;
  pageSizeOptions = PAGE_SIZE;
  redemptionSortValue = new FormControl('newest');
  invoiceSortValue = new FormControl('newest');
  sortOptions = SORT_OPTIONS;

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      },
    }
  };

  dayWiseData = [];
  accountingStatsLoading = false;
  redemptionListLoading = false;
  performanceOverviewLoading = false;
  topPartnersDetailLoading = false;
  invoiceListLoading = false;
  accountingStats: DashboardAccountingStats;
  userData: LoginResponse;
  topPartnerDetail: TopPartners[] = [];
  chartLabels: string[];
  translatedChartLabels: string[];
  dateFilter = new FormControl('lastSixDays');

  readonly accountingStatus = AccountingStatus;
  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private vcEventsService: VcEventsService,
    private adminService: AdminService,
    private storageService: StorageService,
    private utilityService: UtilityService,
    private translateService: TranslateService,
    private partnerService: PartnerService,
    private toasterService: AlertToastrService
  ) {
    this.userData = this.storageService.get(STORAGE.USER_DATA);
    this.breadcrumbs = this.route.snapshot.data.breadcrumbs;
  }

  ngOnInit(): void {
    this.vcEventsService.emitBreadcrumbsDetail(this.breadcrumbs);
    this.getAccountingStats();
    this.getPerformanceOverview();
    this.getTopPartners();
    this.getOpenInvoicesList();
    this.getLatestRedemptionList();
    this.translateService.onLangChange.subscribe(() => {
      this.translateChartLabels();
    });
  }

  getAccountingStats(): void {
    this.accountingStatsLoading = true;
    this.adminService.getDashboardAccountingStats()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.accountingStatsLoading = false))
      .subscribe((res: DashboardAccountingStats) => {
        this.accountingStats = res;
      });
  }

  getPerformanceOverview(): void {
    const params = {
      dateFilter: this.dateFilter.value,
    };
    this.performanceOverviewLoading = true;
    this.adminService.getDashboardPerformanceStats(params)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.performanceOverviewLoading = false))
      .subscribe((res: PerformanceOverview[]) => {
        const performanceOverview = res;
        this.chartLabels =
          performanceOverview?.map((el: PerformanceOverview) => this.utilityService.numberToDayConverter(el.day));
        this.translateChartLabels();
        this.dayWiseData = [
          {
            data: performanceOverview?.map((el: PerformanceOverview) => el.count),
            borderColor: '#ff6b00',
            pointBackgroundColor: '#ff6b00',
            tension: 0.5
          }
        ];
      });
  }

  getTopPartners(): void {
    this.topPartnersDetailLoading = true;
    this.adminService.getTopPartners()
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.topPartnersDetailLoading = false))
      .subscribe((res: TopPartners[]) => {
        this.topPartnersDetailLoading = false;
        this.topPartnerDetail = res;
      });
  }

  translateChartLabels(): void {
    this.translateService.get(this.chartLabels).subscribe(translations => {
      this.translatedChartLabels = Object.values(translations);
    });
  }

  getOpenInvoicesList(): void {
    const params = {
      sort: this.invoiceSortValue.value,
      pageSize: this.invoicePaginator?.pageSize || DEFAULT_PAGE_SIZE,
      page: (this.invoicePaginator?.pageIndex + 1) || DEFAULT_PAGE_INDEX,
    };
    this.invoiceListLoading = true;
    this.openInvoiceList = new MatTableDataSource([]);
    this.adminService.getOpenInvoiceList(params)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.invoiceListLoading = false))
      .subscribe((res: InvoiceList) => {
        this.invoiceListLoading = false;
        this.openInvoiceList = new MatTableDataSource(res?.records);
        this.invoicePaginator.length = res?.totalCount;
      });
  }

  updateStatus(status: string, uuid: string): void {
    this.partnerService.updateAccountStatus(uuid, { status })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (status === AccountingStatus.billed) {
            this.getOpenInvoicesList();
          }
          this.toasterService.displaySnackBarWithTranslation(
            'toasterMessage.billStatusUpdateSuccessful', MessageType.success
          );
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.status === HttpStatusCode.BadRequest && error.error.error === AccountingStatus.billed) {
            this.toasterService.displaySnackBarWithTranslation('toasterMessage.billStatusChanged', MessageType.error);
          }
          this.getOpenInvoicesList();
        }
      });
  }

  getLatestRedemptionList(): void {
    const params = {
      sort: this.redemptionSortValue.value,
      pageSize: this.redemptionPaginator?.pageSize || DEFAULT_PAGE_SIZE,
      page: (this.redemptionPaginator?.pageIndex + 1) || DEFAULT_PAGE_INDEX,
    };
    this.redemptionListLoading = true;
    this.latestRedemptionList = new MatTableDataSource([]);
    this.adminService.getLatestRedemptionList(params)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.redemptionListLoading = false))
      .subscribe((res: RedemptionList) => {
        res?.records?.map((el: RedemptionDetail) => {
          el.action = [
            {
              label: 'dashboard.trackOrder',
              callback: this.trackOrder.bind(this)
            },
          ];
        });
        this.latestRedemptionList = new MatTableDataSource(res?.records);
        this.redemptionPaginator.length = res?.totalCount;
      });
  }

  trackOrder(trackingUrl: string): void {
    window.open(trackingUrl);
  }

}
