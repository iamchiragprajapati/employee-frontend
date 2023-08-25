import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '@layouts/breadcrumb/breadcrumb.component';
import { HeaderComponent } from '@layouts/header/header.component';
import { SidebarComponent } from '@layouts/sidebar/sidebar.component';
import { BreadCrumb, BreadcrumbEventModel } from '@models/breadcrumb.model';
import { VcEventsService } from '@services/vc-events.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, BreadcrumbComponent, HeaderComponent],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  breadcrumbs!: BreadCrumb[];
  showLastItemCustomLabel!: boolean;
  lastItemCustomLabel!: string;
  menuOpen = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private vcEventsService: VcEventsService
  ) { }

  ngOnInit(): void {
    this.setBreadcrumbs();
  }

  setBreadcrumbs(): void {
    this.vcEventsService.vcHeaderDataChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: BreadcrumbEventModel) => {
        setTimeout(() => {
          this.breadcrumbs = result.breadcrumbs;
          this.showLastItemCustomLabel = result.showLastItemCustomLabel;
          this.lastItemCustomLabel = result.lastItemCustomLabel;
        }, 100);
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
