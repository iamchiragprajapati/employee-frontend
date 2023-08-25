import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcLoaderComponent } from './vc-loader.component';

describe('VcLoaderComponent', () => {
  let component: VcLoaderComponent;
  let fixture: ComponentFixture<VcLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcLoaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VcLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
