import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AllowNumberOnlyDirective } from '@app/core/directives/allow-number-only.directive';
import { PartnerDetail } from '@app/core/models/partner.model';
import { DialogService } from '@app/core/services/dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';


@Component({
  selector: 'app-generate-code',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, VcButtonComponent, TranslateModule,
    FormsModule, ReactiveFormsModule, AllowNumberOnlyDirective],
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent {

  isSubmitted = false;
  @Input() data: PartnerDetail;

  constructor(
    private dialogService: DialogService
  ) { }

  closeDialog(value: boolean): void {
    this.dialogService.emitEvent(value);
  }

  tapOkButton(): void {
    this.closeDialog(true);
  }
}
