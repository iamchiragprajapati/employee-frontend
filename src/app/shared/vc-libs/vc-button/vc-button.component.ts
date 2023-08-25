import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Params } from '@angular/router';
import { VcLoaderComponent } from '@vc-libs/vc-loader/vc-loader.component';

@Component({
  selector: 'app-vc-button',
  standalone: true,
  imports: [NgClass, NgIf, VcLoaderComponent],
  templateUrl: './vc-button.component.html',
  styleUrls: ['./vc-button.component.scss']
})
export class VcButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() class: Params;
  @Input() isDisabled = false;
  @Input() tooltip = '';
  @Input() spin = false;

  @Output() buttonTap = new EventEmitter<void>();

  click(): void {
    this.buttonTap.emit();
  }
}
