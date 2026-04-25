import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonDisplayDialogComponent } from '../../../../core/models/common-display-dialog/common-display-dialog.component';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule, CommonDisplayDialogComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  router = inject(Router);
  quiz = inject(QuizService);
  dialog = inject(MatDialog);

  email = 'sabbisetti.gowthamkumar@gmail.com';
  linkedIn = 'https://www.linkedin.com/in/sabbisettigowthamkumar/';

  openLinkedIn() {
    window.open(this.linkedIn, '_blank');
  }
  submitQuiz() {
    const unanswered = this.quiz.totalQuestions() - this.quiz.answeredCount();
    const ref = this.dialog.open(CommonDisplayDialogComponent, {
      data: {
        title: 'Submit Quiz?',
        message:
          unanswered > 0
            ? `You still have ${unanswered} unanswered question(s). You won’t be able to change your answers after submission.`
            : 'You won’t be able to change your answers after submission.',
        confirmText: unanswered > 0 ? 'Submit Anyway' : 'Submit Quiz',
        cancelText: 'Review Answers',
      },
    });

    ref
      .afterClosed()
      .pipe(filter((result) => result === true))
      .subscribe(() => {
        this.quiz.isSubmitted.set(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
