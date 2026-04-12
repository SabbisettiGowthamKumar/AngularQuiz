import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {
    /* empty */
  }
  private _topics: WritableSignal<string[]> = signal<string[]>([
    'Angular Basics',
    'Forms & Validation',
    'RxJS',
    'NgRx : State Management',
    'Performance Optimization',
    'HTML',
    'CSS',
    'TypeScript',
    'JavaScript',
  ]);

  private _selectedTopics: WritableSignal<string[]> = signal<string[]>([]);

  topics = this._topics.asReadonly();
  selectedTopics = this._selectedTopics.asReadonly();

  addTopic(topic: string) {
    this._selectedTopics.update((topics) => [...topics, topic]);
    this._topics.update((topics) => topics.filter((t) => t !== topic));
  }

  removeTopic(topic: string) {
    this._topics.update((topics) => [...topics, topic]);
    this._selectedTopics.update((topics) => topics.filter((t) => t !== topic));
  }
}
