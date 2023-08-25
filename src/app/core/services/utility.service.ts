import { Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE, Months } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { LoginResponse } from '@models/auth.model';
import { TranslateService } from '@ngx-translate/core';
import { PartnerService } from '@services/partner.service';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  readonly days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
    private partnerService: PartnerService
  ) { }

  setLanguage(): void {
    const localStorageLanguage =
      this.storageService.get(STORAGE.CURRENT_LANGUAGE_STATE_KEY) as string;
    const language = localStorageLanguage || DEFAULT_LANGUAGE;
    this.translateService.setDefaultLang(language);
    this.storageService.set(STORAGE.CURRENT_LANGUAGE_STATE_KEY, language);
  }

  getUserFromLocalStorage(): LoginResponse {
    return this.storageService.get(STORAGE.USER_DATA);
  }

  changeLanguage(locale: string, uuid?: string): void {
    uuid && this.partnerService.updatePartnerDetail({ locale }, uuid).subscribe();
    this.storageService.set(STORAGE.CURRENT_LANGUAGE_STATE_KEY, locale);
    this.translateService.use(locale);
  }

  getPreviousMonthNameFromDate(dateISO: string): string {
    const date = new Date(dateISO);
    const previousMonth = date.getMonth() === 0 ? Months.December : date.getMonth() - 1;
    const year = previousMonth === Months.December ? date.getFullYear() - 1 : date.getFullYear();
    const previousMonthName = new Date(year, previousMonth, 1);
    return `${previousMonthName.toLocaleString('default', { month: 'short' })} ${year}`;
  }

  numberToDayConverter(index: number): string {
    return `days.${this.days[index - 1]}`;
  }

}
