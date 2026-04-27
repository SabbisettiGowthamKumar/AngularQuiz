import { Component, computed, inject } from '@angular/core';
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

  readonly formattedTime = computed(() => {
    const total = this.quiz.remainingSeconds();

    const hrs = Math.floor(total / 3600)
      .toString()
      .padStart(2, '0');

    const mins = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, '0');

    const secs = (total % 60).toString().padStart(2, '0');

    return total >= 3600 ? `${hrs}:${mins}:${secs}` : `${mins}:${secs}`;
  });

  restartQuiz() {
    this.quiz.restart();
    this.router.navigate(['/']);
  }
}
