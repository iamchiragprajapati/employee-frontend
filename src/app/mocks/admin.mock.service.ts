import { Injectable } from '@angular/core';
import {
  MockAccountingStats, MockOpenInvoiceList, MockPerformanceOverview,
  MockRedemptionList, MockTopPartnerDetail
} from '@constants/mock-data.constants';
import {
  DashboardAccountingStats,
  InvoiceList,
  PerformanceOverview,
  PerformanceStatsParams,
  RedemptionList,
  TopPartners
} from '@models/admin.model';
import { PartnerListQueryParams } from '@models/partner.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminMockService {

  getDashboardAccountingStats(): Observable<DashboardAccountingStats> {
    return of(MockAccountingStats.data);
  }

  getDashboardPerformanceStats(params: PerformanceStatsParams): Observable<PerformanceOverview[]> {
    return of(MockPerformanceOverview.data);
  }

  getTopPartners(): Observable<TopPartners[]> {
    return of(MockTopPartnerDetail.data);
  }

  getLatestRedemptionList(params: Partial<PartnerListQueryParams>): Observable<RedemptionList> {
    return of(MockRedemptionList);
  }

  getOpenInvoiceList(params: Partial<PartnerListQueryParams>): Observable<InvoiceList> {
    return of(MockOpenInvoiceList);
  }
}