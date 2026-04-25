import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CommonDisplayDialogComponent } from '../../core/models/common-display-dialog/common-display-dialog.component';
import { UnloadWarningService } from '../../core/services/unload-warning.service';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OptionsPanelComponent } from './components/options-panel/options-panel.component';
import { QuestionPanelComponent } from './components/question-panel/question-panel.component';
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    QuizHeaderComponent,
    ProgressBarComponent,
    QuestionPanelComponent,
    OptionsPanelComponent,
    SidePanelComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  quiz = inject(QuizService);
  dialog = inject(MatDialog);
  router = inject(Router);
  unload = inject(UnloadWarningService);

  ngOnInit(): void {
    this.unload.enable();
  }

  isSidebarCollapsed = signal(false);

  togglesidebar() {
    this.isSidebarCollapsed.update((v) => !v);
  }

  sidebarWidth = computed(() => (this.isSidebarCollapsed() ? '56px ' : '280px'));

  private isQuizInProgress(): boolean {
    return this.quiz.totalQuestions() > 0 && this.quiz.answeredCount() > 0;
  }

  private showLeaveDialog(): Observable<boolean> {
    const ref = this.dialog.open(CommonDisplayDialogComponent, {
      data: {
        title: 'Leave Quiz?',
        message: 'Your current progress may be lost. Are you sure you want to leave?',
        confirmText: 'Leave',
        cancelText: 'Stay',
      },
    });

    // Restore the history state so the leave dialog can be reopened repeatedly without breaking back navigation.
    return ref.afterClosed().pipe(
      tap((result) => {
        if (!result) history.pushState(null, '', this.router.url);
      })
    );
  }

  StopLeaveQuiz(): boolean | Observable<boolean> {
    if (!this.isQuizInProgress()) {
      return true;
    }

    return this.showLeaveDialog();
  }
}
