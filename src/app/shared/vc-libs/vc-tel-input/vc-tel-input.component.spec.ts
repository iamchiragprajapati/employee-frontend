import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcTelInputComponent } from './vc-tel-input.component';

describe('VcTelInputComponent', () => {
  let component: VcTelInputComponent;
  let fixture: ComponentFixture<VcTelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcTelInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VcTelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
