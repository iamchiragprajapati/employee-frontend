import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcButtonComponent } from './vc-button.component';

describe('VcButtonComponent', () => {
  let component: VcButtonComponent;
  let fixture: ComponentFixture<VcButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VcButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
