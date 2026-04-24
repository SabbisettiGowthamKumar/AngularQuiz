import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonDisplayDialogComponent } from '../../core/models/common-display-dialog/common-display-dialog.component';
import { QuizService } from '../quiz/services/quiz.service';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { TopicSelectionComponent } from './components/topic-selection/topic-selection.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    LandingHeaderComponent,
    HowItWorksComponent,
    TopicSelectionComponent,
    MatButtonModule,
    CommonDisplayDialogComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  public quizService = inject(QuizService);

  startQuiz() {
    if (this.quizService.selectedTopics().length === 0) {
      this.dialog.open(CommonDisplayDialogComponent, {
        width: '420px',
        data: {
          title: 'No Topics Selected',
          message: 'Please select at least one topic to start the quiz.',
          confirmText: 'Got it',
          hideCancel: true,
        },
      });
      return;
    } else {
      this.quizService.startQuiz();
      this.router.navigate(['/quiz']);
    }
  }
}
