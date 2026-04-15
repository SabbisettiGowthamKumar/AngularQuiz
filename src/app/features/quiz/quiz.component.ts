import { Component } from '@angular/core';
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { QuestionPanelComponent } from './components/question-panel/question-panel.component';
import { OptionsPanelComponent } from './components/options-panel/options-panel.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    QuizHeaderComponent,
    ProgressBarComponent,
    QuestionPanelComponent,
    OptionsPanelComponent,
  ],
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

  options = [
    'A service used for API calls only',
    'A reusable UI building block with logic and template',
    'A routing configuration file',
    'A CSS framework for Angular',
  ];

  selectedAnswer = '';
  onMarkReview(event: Event): void {
    console.log('Mark for review event received in QuizComponent', event);
  }

  /**
   *      (answerChange)="onAnswerChange($event)"
        (clear)="onClearAnswer()"
        (previous)="onPreviousQuestion()"
        (next)="onNextQuestion()"
   */

  onAnswerChange(answer: string): void {
    this.selectedAnswer = answer;
    console.log('Answer changed:', answer);
  }

  onClearAnswer(): void {
    console.log('answer clear clicked-');
  }

  onPreviousQuestion() {
    console.log('onPreviousQuestion clicked- ');
  }

  onNextQuestion() {
    console.log('on next question clicked- ');
  }
}
