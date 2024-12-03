import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.scss']
})
export class PerformanceReviewComponent {
  public routes = routes;
  rows: any = {
    'achievements': [],
    'alterations': [],
    'Professional':[],
  }; 

  constructor() {
    
    this.addRow('achievements');
    this.addRow('alterations');
    this.addRow('Professional');
  }

  addRow(section: string) {
    if (!this.rows[section]) {
      this.rows[section] = [];
    }
    this.rows[section].push({ bySelf: '', roComment: '', hodComment: '' });
  }
  removeRow(rowIndex: number) {
    this.rows['achievements'].splice(rowIndex, 1);
    this.rows['alterations'].splice(rowIndex, 1);
  }
 
}
