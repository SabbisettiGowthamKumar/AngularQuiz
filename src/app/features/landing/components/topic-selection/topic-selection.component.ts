import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { QuizService } from '../../../quiz/services/quiz.service';
@Component({
  selector: 'app-topic-selection',
  standalone: true,
  imports: [MatChipsModule, CommonModule, MatCardModule],
  templateUrl: './topic-selection.component.html',
  styleUrl: './topic-selection.component.scss',
})
export class TopicSelectionComponent {
  public quizService: QuizService = inject(QuizService);

  addTopic(topic: string) {
    this.quizService.addTopic(topic);
  }

  removeTopic(topic: string) {
    this.quizService.removeTopic(topic);
  }
}
