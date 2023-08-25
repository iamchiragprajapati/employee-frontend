import { EventEmitter, Injectable } from '@angular/core';
import { BreadCrumb, BreadcrumbEventModel } from '@models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class VcEventsService {

  public vcHeaderDataChanged = new EventEmitter<BreadcrumbEventModel>();
  public toggleSidebar = new EventEmitter<boolean>();

  emitBreadcrumbsDetail(
    breadcrumbs: BreadCrumb[], showLastItemCustomLabel = false, lastItemCustomLabel?: string
  ): void {
    this.vcHeaderDataChanged.emit({
      breadcrumbs,
      ...showLastItemCustomLabel && { showLastItemCustomLabel },
      ...lastItemCustomLabel && { lastItemCustomLabel }
    });
  }
}
