import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DEFAULT_MAT_DIALOG_CONFIG } from '@constants/app.constants';
import { PartnerDetail } from '@models/partner.model';
import { ImportDynamicComponentService } from '@services/import-dynamic-component.service';
import { VcDialogComponent } from '@vc-libs/vc-dialog/vc-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _closeDialogEvent = new EventEmitter<boolean>();

  constructor(
    private matDialog: MatDialog,
    private importDynamicComponentService: ImportDynamicComponentService,
  ) { }

  openGenerateCodeDialog(data?: PartnerDetail, config = DEFAULT_MAT_DIALOG_CONFIG):
    MatDialogRef<VcDialogComponent, any> {
    const dialogRef: MatDialogRef<VcDialogComponent, any> = this.matDialog.open(VcDialogComponent, {
      data: {
        loadComponent: this.importDynamicComponentService.importGenerateCodeComponent(),
        data,
        dialogTitle: 'partner.confirmDialog.Title',
      },
      ...config
    });
    return dialogRef;
  }

  // Method to subscribe to the private event emitter
  subscribeToEvent(callback: (data: boolean) => void): void {
    this._closeDialogEvent.subscribe(callback);
  }

  // Method to emit events from the service
  emitEvent(data: boolean): void {
    this._closeDialogEvent.emit(data);
  }
}
