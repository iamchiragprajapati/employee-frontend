import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vc-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vc-loader.component.html'
})
export class VcLoaderComponent {

  @Input() class: { [key: string]: boolean };
}
