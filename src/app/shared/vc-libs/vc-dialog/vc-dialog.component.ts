import { CommonModule } from '@angular/common';
import { Component, ComponentRef, DestroyRef, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicDirective } from '@app/core/directives/dynamic.directive';
import { DialogService } from '@app/core/services/dialog.service';
import { DynamicComponentLoaderService } from '@app/core/services/dynamic-component-loader.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VcButtonComponent } from '@vc-libs/vc-button/vc-button.component';

@Component({
  selector: 'app-vc-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, DynamicDirective, VcButtonComponent],
  templateUrl: './vc-dialog.component.html',
  styleUrls: ['./vc-dialog.component.scss']
})
export class VcDialogComponent implements OnInit {

  title: string;
  customHeaderClass: string;
  loadComponent: () => Promise<unknown>;
  compData: any;

  @ViewChild(DynamicDirective, { static: true })
  private dynamicDirective: DynamicDirective;
  private destroyRef = inject(DestroyRef);

  constructor(
    public translate: TranslateService,
    public dialogService: DialogService,
    public dialogRef: MatDialogRef<VcDialogComponent>,
    private dynamicComponentLoaderService: DynamicComponentLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: {
      loadComponent: () => Promise<unknown>;
      data: any;
      dialogTitle: string;
      showHeader: boolean;
      customHeaderClass: string;
    }) {
    this.dialogService.subscribeToEvent((data) => {
      // Handle the emitted event here
      this.dialogRef.close(data);
    });
    this.title = data.dialogTitle;
    this.customHeaderClass = data.customHeaderClass;
    this.loadComponent = data.loadComponent;
    this.compData = data.data;
  }

  ngOnInit(): void {
    const viewContainerRef = this.dynamicDirective.viewContainerRef;
    this.dynamicComponentLoaderService
      .loadComponentDynamically(viewContainerRef, this.loadComponent)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ComponentRef<any>) => {
        result.instance.compData = this.compData;
      });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}