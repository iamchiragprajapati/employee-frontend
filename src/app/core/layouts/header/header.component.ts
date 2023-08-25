import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { VcEventsService } from '@services/vc-events.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private vcEventsService: VcEventsService
  ) { }

  openSidebar(): void {
    this.vcEventsService.toggleSidebar.emit(true);
  }
}
