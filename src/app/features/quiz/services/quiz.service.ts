import { computed, inject, Injectable, signal } from '@angular/core';
import { Question } from '../../../shared/models/question.model';

/* JSON Question Banks */
import { TimerService } from '../../../core/services/timer.service';
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
  timer = inject(TimerService);

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

  topics = this.timer._topics.asReadonly();
  selectedTopics = this.timer._selectedTopics.asReadonly();

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
    this.startTimer();
  }

  restart() {
    this.isSubmitted.set(false);
    this.questions.set([]);
    this.currentIndex.set(0);
    this.answers.set({});
    this.reviewIds.set([]);
    this.timer._topics.set([...this.ALL_TOPICS]);
    this.timer._selectedTopics.set([]);
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

  readonly remainingSeconds = signal(0);
  readonly isTimerRunning = signal(false);
  private timerId: ReturnType<typeof setInterval> | null = null;

  readonly warningTime = computed(() => this.remainingSeconds() <= 120);
  readonly dangerTime = computed(() => this.remainingSeconds() <= 30);

  startTimer() {
    this.stopTimer();

    const totalMinutes = this.timer.quizTime();

    this.remainingSeconds.set(totalMinutes * 60);
    this.isTimerRunning.set(true);

    this.timerId = setInterval(() => {
      const current = this.remainingSeconds();

      if (current <= 1) {
        this.stopTimer();
        this.isSubmitted.set(true);
        return;
      }
      this.remainingSeconds.set(current - 1);
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.isTimerRunning.set(false);
  }
}
