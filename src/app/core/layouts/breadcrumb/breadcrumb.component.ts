import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadCrumb } from '@models/breadcrumb.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  @Input() breadcrumbs: BreadCrumb[];
  @Input() showLastItemCustomLabel = false;
  @Input() lastItemCustomLabel?: string;
}
