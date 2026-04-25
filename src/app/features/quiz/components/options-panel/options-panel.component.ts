import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { QuizService } from '../../services/quiz.service';
@Component({
  selector: 'app-options-panel',
  standalone: true,
  imports: [MatButtonModule, MatRadioModule, FormsModule, CommonModule],
  templateUrl: './options-panel.component.html',
  styleUrl: './options-panel.component.scss',
})
export class OptionsPanelComponent {
  @Input() options: string[] = [];
  @Input() selectedAnswer = '';
  @Input() isFirstQuestion = false;
  @Input() isLastQuestion = false;

  @Output() answerChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  quiz = inject(QuizService);

  onSelectionChange(value: string): void {
    this.answerChange.emit(value);
  }

  onClear(): void {
    this.clear.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }

  onNext(): void {
    this.next.emit();
  }

  isCorrect(option: string): boolean {
    return option === this.quiz.currentQuestion()?.correctAnswer;
  }

  isWrongSelected(option: string): boolean {
    return option === this.selectedAnswer && option !== this.quiz.currentQuestion()?.correctAnswer;
  }

  getOptionClass(option: string): string {
    if (!this.quiz.isSubmitted()) {
      return '';
    }
    if (this.isCorrect(option)) {
      return 'correct';
    }
    if (this.isWrongSelected(option)) {
      return 'wrong';
    }

    return '';
  }
}
