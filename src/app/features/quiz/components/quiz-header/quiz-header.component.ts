import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-quiz-header',
  standalone: true,
  imports: [MatIcon, MatCardModule],
  templateUrl: './quiz-header.component.html',
  styleUrl: './quiz-header.component.scss',
})
export class QuizHeaderComponent {
  @Input() time = '03:09';
}
