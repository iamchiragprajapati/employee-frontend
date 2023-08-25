import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SvgIcon } from '@app/core/models/common.model';
import { LANGUAGE_CONSTANTS_LIST, ROUTE_PATH, SVG_ICON_LIST } from '@constants/app.constants';
import { STORAGE } from '@constants/storage.constant';
import { LoginResponse } from '@models/auth.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '@services/storage.service';
import { UtilityService } from '@services/utility.service';
import { VcEventsService } from '@services/vc-events.service';
import { VcSvgIconComponent } from '@vc-libs/vc-svg-icon/vc-svg-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgSelectModule, TranslateModule,
    RouterModule, FormsModule, VcSvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userData: LoginResponse;
  currentLanguage: string;
  menuOpen = false;
  assetSvgIcon = SVG_ICON_LIST;
  private destroyRef = inject(DestroyRef);
  listSvg: SvgIcon;
  logoutSvg: SvgIcon;
  readonly routePath = ROUTE_PATH;
  readonly languageList = LANGUAGE_CONSTANTS_LIST;

  constructor(
    private storageService: StorageService,
    private utilityService: UtilityService,
    private vcEventsService: VcEventsService
  ) {
    this.listSvg = this.assetSvgIcon.find((x) => x.name === 'list');
    this.logoutSvg = this.assetSvgIcon.find((x) => x.name === 'logout');
    this.userData = this.storageService.get(STORAGE.USER_DATA);
    this.currentLanguage = this.storageService.get(STORAGE.CURRENT_LANGUAGE_STATE_KEY);
  }

  ngOnInit(): void {
    this.vcEventsService.toggleSidebar
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: boolean) => {
        this.menuOpen = res;
      });
  }

  changeLanguage(): void {
    this.utilityService.changeLanguage(this.currentLanguage, this.userData?.uuid);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
