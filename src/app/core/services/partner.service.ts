import { Injectable } from '@angular/core';
import { API_ROUTES } from '@constants/api.constants';
import { BreadCrumb } from '@models/breadcrumb.model';
import {
  CardCodeList,
  CreateEmployee,
  CreatePartner,
  GenerateCards,
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

  getPartnerList(params: Partial<PartnerListQueryParams>): Observable<any> {
    return this.httpClientService.get(API_ROUTES.partnerListApi, { params });
  }

  addPartner(param: Partial<CreateEmployee>): Observable<any> {
    return this.httpClientService.post(API_ROUTES.addPartnerApi, param);
  }

  getPartnerDetail(uuid: string): Observable<CreatePartner> {
    return this.httpClientService.get(`${API_ROUTES.addPartnerApi}/${uuid}`) as Observable<CreatePartner>;
  }

  updatePartnerDetail(params: Partial<CreatePartner>, uuid: string): Observable<any> {
    return this.httpClientService.put(`${API_ROUTES.addPartnerApi}/${uuid}`,
      { ...params });
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

  uploadProfilePic(param: any): Observable<any> {
    return this.httpClientService.post(API_ROUTES.uploadProfilePicApi, param);
  }

  getProfile(uuid: string): Observable<any> {
    return this.httpClientService.get(`${API_ROUTES.getProfilePicApi}/${uuid}`);
  }

}
