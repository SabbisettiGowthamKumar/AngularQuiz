import { Component } from '@angular/core';
import { QuizHeaderComponent } from './components/quiz-header/quiz-header.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuizHeaderComponent, ProgressBarComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {}
