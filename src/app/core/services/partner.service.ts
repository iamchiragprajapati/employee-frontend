import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/api.constants';
import { BreadCrumb } from '@models/breadcrumb.model';
import {
  CardCodeList,
  CreatePartner,
  GenerateCards,
  PartnerList,
  PartnerListQueryParams
} from '@models/partner.model';
import { HttpClientService } from '@services/http-client.service';
import { StorageService } from '@services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  breadcrumbs: BreadCrumb[];

  constructor(
    private httpClientService: HttpClientService,
    private storageService: StorageService
  ) { }

  getPartnerList(params: Partial<PartnerListQueryParams>): Observable<PartnerList> {
    params = { ...params, userId: this.storageService.getUserId() };
    return this.httpClientService.get(API_ROUTES.partnerListApi, { params });
  }

  addPartner(params: Partial<CreatePartner>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.addPartnerApi,
      { ...params, userId: this.storageService.getUserId() });
  }

  getPartnerDetail(uuid: string): Observable<CreatePartner> {
    return this.httpClientService.get(`${API_ROUTES.addPartnerApi}/${uuid}`) as Observable<CreatePartner>;
  }

  updatePartnerDetail(params: Partial<CreatePartner>, uuid: string): Observable<[] | null> {
    return this.httpClientService.put(`${API_ROUTES.addPartnerApi}/${uuid}`,
      { ...params, userId: this.storageService.getUserId() });
  }

  deletePartnerDetail(uuid: string): Observable<[] | null> {
    return this.httpClientService.delete(`${API_ROUTES.addPartnerApi}/${uuid}`);
  }

  getCardCodeList(uuid: string, params: Partial<PartnerListQueryParams>): Observable<CardCodeList> {
    return this.httpClientService.get(`${API_ROUTES.cardListApi}/${uuid}`, { params });
  }

  generateCardCodes(params: Partial<GenerateCards>): Observable<[] | null> {
    return this.httpClientService.post(API_ROUTES.cardListApi, params);
  }

  updateAccountStatus(uuid: string, params: { status: string }): Observable<[] | null> {
    return this.httpClientService.put(`${API_ROUTES.accountStatusChangeApi}/${uuid}`, params);
  }

}
