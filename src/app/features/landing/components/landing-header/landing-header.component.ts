import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';
import { QuizService } from '../../../quiz/services/quiz.service';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [MatIconModule, MinutesToHoursPipe],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss',
})
export class LandingHeaderComponent {
  public quizService: QuizService = inject(QuizService);
  public quizTime = computed(() => this.quizService.selectedTopics().length * 30);
}
