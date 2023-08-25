import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcInputComponent } from './vc-input.component';

describe('VcInputComponent', () => {
  let component: VcInputComponent;
  let fixture: ComponentFixture<VcInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VcInputComponent]
    });
    fixture = TestBed.createComponent(VcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
