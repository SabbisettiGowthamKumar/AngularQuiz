import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { Question } from '../../../../shared/models/question.model';
import { QuizService } from '../../services/quiz.service';
@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
})
export class SidePanelComponent {
  quiz = inject(QuizService);
  collapsed = input(false);
  collapsedChange = output<void>();

  toggleSidebar() {
    this.collapsedChange.emit();
  }
  notAnswered = computed(() => this.quiz.totalQuestions() - this.quiz.answeredCount());
  groupedQuestions = computed(() => {
    const groups = new Map<string, Question[]>();

    this.quiz.questions().forEach((question) => {
      const topic = question.topic;

      if (!groups.has(topic)) groups.set(topic, []);

      groups.get(topic)?.push(question);
    });

    return Array.from(groups.entries()).map(([topic, questions]) => ({ topic, questions }));
  });

  goTo(index: number) {
    this.quiz.goToQuestion(index);
  }
}
