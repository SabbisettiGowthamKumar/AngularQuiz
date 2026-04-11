import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-topic-selection',
  standalone: true,
  imports: [MatChipsModule, CommonModule, MatCardModule],
  templateUrl: './topic-selection.component.html',
  styleUrl: './topic-selection.component.scss',
})
export class TopicSelectionComponent {
  topics = [
    'Angular Basics',
    'Forms & Validation',
    'RxJS',
    'NgRx : State Management',
    'Performance Optimization',
    'HTML',
    'CSS',
    'TypeScript',
    'JavaScript',
  ];

  selectedTopics: string[] = [];

  addTopic(topic: string) {
    this.selectedTopics.push(topic);
    this.topics = this.topics.filter((t) => t !== topic);
  }

  removeTopic(topic: string) {
    this.topics.push(topic);
    this.selectedTopics = this.selectedTopics.filter((t) => t !== topic);
  }
}
