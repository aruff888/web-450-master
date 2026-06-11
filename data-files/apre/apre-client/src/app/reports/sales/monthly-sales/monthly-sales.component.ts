/**
 * Week 2 Major Task M-064
 * Displays monthly sales report data using the shared ChartComponent.
 */

import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ChartComponent } from '../../../shared/chart/chart.component';

@Component({
  selector: 'app-monthly-sales',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <h1>Monthly Sales Report</h1>

    @if (totalSales.length && months.length) {
      <div class="card chart-card">
        <app-chart
          [type]="'bar'"
          [label]="'Monthly Sales'"
          [data]="totalSales"
          [labels]="months">
        </app-chart>
      </div>
    }
  `,
  styles: [`
    .chart-card {
      width: 60%;
      margin: 20px auto;
    }
  `]
})
export class MonthlySalesComponent {
  months: string[] = [];
  totalSales: number[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    // Week 2 Major Task M-064:
    // Fetch monthly sales totals from the new server API and prepare the data for ChartComponent.
    this.http.get(`${environment.apiBaseUrl}/reports/monthly-sales/months`).subscribe({
      next: (data: any) => {
        this.months = data.map((sale: any) => sale.month);
        this.totalSales = data.map((sale: any) => sale.totalSales);

        this.cdr.markForCheck();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching monthly sales:', err);
      }
    });
  }
}