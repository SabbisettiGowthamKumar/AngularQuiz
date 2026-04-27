import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TimerService } from '../../../../core/services/timer.service';

@Component({
  selector: 'app-topic-selection',
  standalone: true,
  imports: [MatChipsModule, CommonModule, MatCardModule, MatBadgeModule],
  templateUrl: './topic-selection.component.html',
  styleUrl: './topic-selection.component.scss',
})
export class TopicSelectionComponent {
  public timer: TimerService = inject(TimerService);

  addTopic(topic: string) {
    this.timer.addTopic(topic);
  }

  removeTopic(topic: string) {
    this.timer.removeTopic(topic);
  }
}
