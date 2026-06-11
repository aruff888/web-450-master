/**
 * Week 2 Major Task M-064
 * Unit tests for the MonthlySalesComponent.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MonthlySalesComponent } from './monthly-sales.component';
import { environment } from '../../../../environments/environment';

describe('MonthlySalesComponent', () => {
  let component: MonthlySalesComponent;
  let fixture: ComponentFixture<MonthlySalesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MonthlySalesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlySalesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reports/monthly-sales/months`);
    req.flush([]);

    expect(component).toBeTruthy();
  });

  it('should display the title "Monthly Sales Report"', () => {
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reports/monthly-sales/months`);
    req.flush([]);

    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');

    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Monthly Sales Report');
  });

  it('should map monthly sales API data to chart labels and values', () => {
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reports/monthly-sales/months`);

    req.flush([
      { month: 'January', totalSales: 1500 },
      { month: 'February', totalSales: 2000 },
      { month: 'March', totalSales: 1750 }
    ]);

    expect(component.months).toEqual(['January', 'February', 'March']);
    expect(component.totalSales).toEqual([1500, 2000, 1750]);
  });
});