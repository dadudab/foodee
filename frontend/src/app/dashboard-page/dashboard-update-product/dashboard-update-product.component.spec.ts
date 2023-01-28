import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpdateProductComponent } from './dashboard-update-product.component';

describe('DashboardUpdateProductComponent', () => {
  let component: DashboardUpdateProductComponent;
  let fixture: ComponentFixture<DashboardUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardUpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
