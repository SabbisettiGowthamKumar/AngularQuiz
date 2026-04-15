import { Component } from '@angular/core';
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { QuestionPanelComponent } from './components/question-panel/question-panel.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuizHeaderComponent, ProgressBarComponent, QuestionPanelComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  questionText = `
###### What is the purpose of Angular Components?

Angular applications are built using multiple **components** that work together to create the user interface.

A component usually contains:

- A **TypeScript class** for logic
- An **HTML template** for UI
- A **CSS/SCSS file** for styling

###### Which statement best describes an Angular Component?

`;
  onMarkReview(event: Event): void {
    console.log('Mark for review event received in QuizComponent', event);
  }
}
