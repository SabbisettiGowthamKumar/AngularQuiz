import { Component, inject } from '@angular/core';
import { LandingHeaderComponent } from './components/landing-header/landing-header.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TopicSelectionComponent } from './components/topic-selection/topic-selection.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from '../../core/services/quiz.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonDisplayDialogComponent } from '../../core/models/common-display-dialog/common-display-dialog.component';
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
      this.router.navigate(['/quiz']);
    }
  }
}
