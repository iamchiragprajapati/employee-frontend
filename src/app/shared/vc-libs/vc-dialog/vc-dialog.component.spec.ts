import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VcDialogComponent } from './vc-dialog.component';

describe('VcDialogComponent', () => {
  let component: VcDialogComponent;
  let fixture: ComponentFixture<VcDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VcDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
