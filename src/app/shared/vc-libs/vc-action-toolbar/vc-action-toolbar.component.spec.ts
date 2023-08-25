import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcActionToolbarComponent } from './vc-action-toolbar.component';

describe('VcActionToolbarComponent', () => {
  let component: VcActionToolbarComponent;
  let fixture: ComponentFixture<VcActionToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcActionToolbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VcActionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
