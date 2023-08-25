import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcSvgIconComponent } from './vc-svg-icon.component';

describe('VcSvgIconComponent', () => {
  let component: VcSvgIconComponent;
  let fixture: ComponentFixture<VcSvgIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VcSvgIconComponent]
    });
    fixture = TestBed.createComponent(VcSvgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
