import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import quizMetaData from '../../shared/data/quiz-meta.json';
import { Topic } from '../../shared/enums/topic.enum';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  ALL_TOPICS = [
    Topic.ANGULAR_FUNDAMENTALS,
    Topic.HTML,
    Topic.SCSS,
    Topic.JAVASCRIPT,
    Topic.TYPESCRIPT,
    Topic.RXJS,
    Topic.NGRX,
    Topic.GIT,
  ];

  public _topics: WritableSignal<string[]> = signal<string[]>([...this.ALL_TOPICS]);
  public _selectedTopics: WritableSignal<string[]> = signal<string[]>([]);

  readonly remainingSeconds = signal(0);
  readonly isRunning = signal(false);

  readonly warning = computed(() => this.remainingSeconds() <= 300);
  readonly danger = computed(() => this.remainingSeconds() <= 60);

  quizTime = computed(() => {
    if (!this._selectedTopics().length) return 0;

    const ceilTo5 = (value: number) => Math.ceil(value / 5) * 5;

    const totalSelectedQuestions = quizMetaData.topics
      .filter((topic) => this._selectedTopics().includes(topic.name))
      .reduce((sum, selectedTopics) => sum + selectedTopics.count, 0);

    const totalSeconds = Math.max(600, totalSelectedQuestions * 40);
    const totalMins = Math.ceil(totalSeconds / 60);
    return ceilTo5(totalMins);
  });

  addTopic(topic: string) {
    this._selectedTopics.update((topics) => [...topics, topic]);
    this._topics.update((topics) => topics.filter((t) => t !== topic));
  }

  removeTopic(topic: string) {
    this._topics.update((topics) => [...topics, topic]);
    this._selectedTopics.update((topics) => topics.filter((t) => t !== topic));
  }

  getTopicCount(topic: string): number {
    return quizMetaData.topics.find((t) => t.name === topic)?.count ?? 0;
  }
}
