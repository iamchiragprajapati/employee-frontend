import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { STORAGE } from '@constants/storage.constant';
import { CryptoService } from '@services/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<object>,
    @Inject('LOCALSTORAGE') private localStorage: Storage,
    private cryptoService: CryptoService
  ) {
  }

  get(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const encryptedValue = this.localStorage.getItem(key);
        return encryptedValue && JSON.parse(this.cryptoService.decryptValue(encryptedValue));
      } catch {
        return null;
      }
    }
  }

  set(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      const encryptedValue = this.cryptoService.encryptValue(JSON.stringify(value));
      this.localStorage.setItem(key, encryptedValue);
    }
  }

  getUserId() {
    return this.get(STORAGE.USER_DATA)._id;
  }

  remove(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.removeItem(key);
    }
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) {
      const currentLang: string = this.get(STORAGE.CURRENT_LANGUAGE_STATE_KEY);
      this.localStorage.clear();
      if (currentLang) {
        this.set(STORAGE.CURRENT_LANGUAGE_STATE_KEY, currentLang);
      }
    }
  }
}
