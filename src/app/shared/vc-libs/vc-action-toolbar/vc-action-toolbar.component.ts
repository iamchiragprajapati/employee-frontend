import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActionToolbar } from '@models/common.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-vc-action-toolbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, TranslateModule],
  templateUrl: './vc-action-toolbar.component.html',
  styleUrls: ['./vc-action-toolbar.component.scss']
})
export class VcActionToolbarComponent {

  @Input() actionData: ActionToolbar[];
  @Input() rowReference: any;
}
