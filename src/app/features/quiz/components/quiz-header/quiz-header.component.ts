import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-header',
  standalone: true,
  imports: [MatIcon, MatCardModule],
  templateUrl: './quiz-header.component.html',
  styleUrl: './quiz-header.component.scss',
})
export class QuizHeaderComponent {
  quiz = inject(QuizService);
  router = inject(Router);

  @Input() time = '03:09';

  restartQuiz() {
    this.quiz.restart();
    this.router.navigate(['/']);
  }
}
