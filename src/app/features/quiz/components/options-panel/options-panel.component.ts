import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-options-panel',
  standalone: true,
  imports: [MatButtonModule, MatRadioModule, FormsModule],
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
}
