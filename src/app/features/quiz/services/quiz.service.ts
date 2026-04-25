import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Question } from '../models/question.model';

/* JSON Question Banks */
import { QuestionStatus } from '../../../shared/enums/question-status.enum';
import { Topic } from '../../../shared/enums/topic.enum';
import angularData from '../data/angular-fundamentals.json';
import gitData from '../data/git.json';
import htmlData from '../data/html.json';
import javascriptData from '../data/javascript.json';
import ngrxData from '../data/ngrx.json';
import rxjsData from '../data/rxjs.json';
import scssData from '../data/scss.json';
import typescriptData from '../data/typescript.json';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
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

  private _topics: WritableSignal<string[]> = signal<string[]>([...this.ALL_TOPICS]);

  private _selectedTopics: WritableSignal<string[]> = signal<string[]>([]);

  topics = this._topics.asReadonly();
  selectedTopics = this._selectedTopics.asReadonly();

  private questionBank: Question[] = [
    ...angularData,
    ...htmlData,
    ...scssData,
    ...javascriptData,
    ...typescriptData,
    ...rxjsData,
    ...ngrxData,
    ...gitData,
  ] as Question[];

  questions = signal<Question[]>([]);
  currentIndex = signal(0);

  answers = signal<Record<string, string>>({});
  reviewIds = signal<string[]>([]);
  isSubmitted = signal(false);

  addTopic(topic: string) {
    this._selectedTopics.update((topics) => [...topics, topic]);
    this._topics.update((topics) => topics.filter((t) => t !== topic));
  }

  removeTopic(topic: string) {
    this._topics.update((topics) => [...topics, topic]);
    this._selectedTopics.update((topics) => topics.filter((t) => t !== topic));
  }

  startQuiz() {
    const orderedQuestions = this.selectedTopics().flatMap((topic) =>
      this.questionBank.filter((q) => q.topic === topic)
    );

    const session_questions = orderedQuestions.map((question, index) => ({
      ...question,
      sequence: index + 1,
    }));

    this.questions.set(session_questions);
    this.currentIndex.set(0);
    this.answers.set({});
    this.reviewIds.set([]);
  }

  restart() {
    this.isSubmitted.set(false);
    this.questions.set([]);
    this.currentIndex.set(0);
    this.answers.set({});
    this.reviewIds.set([]);
    this._topics.set([...this.ALL_TOPICS]);
    this._selectedTopics.set([]);
  }
  currentQuestion = computed(() => this.questions()[this.currentIndex()] ?? null);

  totalQuestions = computed(() => this.questions().length);

  isFirstQuestion = computed(() => this.currentIndex() === 0);

  isLastQuestion = computed(() => this.currentIndex() === this.questions().length - 1);

  isMarked = computed(() => {
    const id = this.currentQuestion().id;
    return this.reviewIds().includes(id);
  });

  selectedAnswer = computed(() => {
    const question = this.currentQuestion();
    return this.answers()[question.id] ?? '';
  });
  answeredCount = computed(() => Object.keys(this.answers()).length);

  selectAnswer(answer: string) {
    const current_question_id = this.currentQuestion().id;

    this.answers.update((answers) => ({ ...answers, [current_question_id]: answer }));
  }

  clearAnswer() {
    const id = this.currentQuestion().id;

    this.answers.update((answers) => {
      const updated = { ...answers };
      delete updated[id];
      return updated;
    });
  }

  nextQuestion() {
    if (!this.isLastQuestion()) {
      this.currentIndex.update((index) => index + 1);
    }
  }

  previousQuestion() {
    if (!this.isFirstQuestion()) {
      this.currentIndex.update((index) => index - 1);
    }
  }

  toggleReview() {
    const toggle_id = this.currentQuestion().id;

    this.reviewIds.update((ids) =>
      ids.includes(toggle_id) ? ids.filter((id) => id !== toggle_id) : [...ids, toggle_id]
    );
  }

  goToQuestion(index: number) {
    if (index >= 0 && index < this.questions().length) {
      this.currentIndex.set(index);
    }
  }

  getQuestionStatus(question: Question): QuestionStatus {
    if (this.currentQuestion()?.id === question.id) {
      return QuestionStatus.ACTIVE;
    }

    if (this.reviewIds().includes(question.id)) {
      return QuestionStatus.REVIEW;
    }

    if (this.answers()[question.id]) {
      return QuestionStatus.ANSWERED;
    }

    return QuestionStatus.UNANSWERED;
  }

  score = computed(() => {
    const questions = this.questions();
    const answers = this.answers();

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });

    return questions.length ? Math.round((correct / questions.length) * 100) : 0;
  });
}
