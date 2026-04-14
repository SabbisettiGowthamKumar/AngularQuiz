import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() answered = 0;
  @Input() total = 10;

  get percentage(): number {
    if (!this.total) return 0;
    return Math.round((this.answered / this.total) * 100);
  }
}
