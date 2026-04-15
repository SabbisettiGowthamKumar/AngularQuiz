import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
@Component({
  selector: 'app-question-panel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MarkdownModule],
  templateUrl: './question-panel.component.html',
  styleUrl: './question-panel.component.scss',
})
export class QuestionPanelComponent {
  @Input() currentIndex = 0;
  @Input() totalQuestions = 8;
  @Input() questionText = '';
  @Input() markedForReview = false;

  markDown = inject(MarkdownModule);

  @Output() markForReview = new EventEmitter<boolean>();

  onMarkForReview(): void {
    this.markedForReview = !this.markedForReview;
    this.markForReview.emit(this.markedForReview);
  }
}
