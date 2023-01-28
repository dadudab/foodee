import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNewProductComponent } from './dashboard-new-product.component';

describe('DashboardNewProductComponent', () => {
  let component: DashboardNewProductComponent;
  let fixture: ComponentFixture<DashboardNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNewProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
